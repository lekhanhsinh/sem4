import Joi from "@hapi/joi";

import BasicRepository from "./BasicRepository";
import * as Models from "../models";
import { ImageDocument } from "../models/Image/types";
import { userRepository } from "./UserRepository";
import { saveImage } from "../utils/etc";

const ImageModel = Joi.object({
    name: Joi.string(),
    description: Joi.string(),
});

export class ImageRepository extends BasicRepository<ImageDocument>{
    constructor() {
        super(Models.Image);
    }

    getOnebyId = (id: string): Promise<ImageDocument | null> => {
        return this._collection.findById(id).populate(["user"]).exec();
    }

    getMany = (): Promise<ImageDocument[]> => {
        return this._collection.find().populate(["user"]).exec();
    }

    getManybyUserId = (userId: string): Promise<ImageDocument[]> => {
        return this._collection.find({ user: userId }).populate(["user"]).exec();
    }

    createWithValidate = (userId: string, detail: unknown): Promise<ImageDocument> => {
        return ImageModel.validateAsync(detail, { allowUnknown: true }).then(() => {
            return userRepository.getOnebyId(userId).then(user => {
                if (!user) { throw new Error("User don\'t exist."); }
                const newImage = new this._collection({ user, ...(detail as any) });
                if (!(detail as any).file) { return newImage.save(); }
                return saveImage((detail as any).file).then(path => {
                    newImage.path = path;
                    return newImage.save();
                });
            });
        });
    }

    updateWithValidate = (id: string, detail: unknown): Promise<ImageDocument> => {
        return ImageModel.validateAsync(detail, { allowUnknown: true }).then(() => {
            return this.getOnebyId(id).then(found => {
                if (!found) { throw new Error("Image don\'t exist."); }
                found.name = (detail as ImageDocument).name || found.name;
                found.description = (detail as ImageDocument).description || found.description;
                if (!(detail as any).file) { return found.save(); }
                return saveImage((detail as any).file, found.path).then(path => {
                    found.path = path;
                    return found.populate("user").execPopulate().then(image => {
                        return image.save();
                    });
                });
            });
        });
    }
}

export const imageRepository = new ImageRepository();