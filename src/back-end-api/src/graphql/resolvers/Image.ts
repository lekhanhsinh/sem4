import { IResolvers } from "graphql-tools";

import { Repositories } from "@back-end-database";
import { ImageDocument } from "@back-end-database/models/Image/types";

const imageResolvers: IResolvers = {
    Query: {
        getImage: (obj, args, context, info): Promise<ImageDocument | null> => {
            const { id } = args;
            return Repositories.imageRepository.getOnebyId(id);
        },
        getImages: (obj, args, context, info): Promise<ImageDocument[]> => {
            const { sort, searchs } = args;
            return Repositories.imageRepository.getMany(searchs, sort);
        }
    },
    Mutation: {
        createImage: (obj, args, context, info): Promise<ImageDocument> => {
            const { detail } = args;
            const { req } = context;
            const { user } = req.session;
            if (!user) {
                throw new Error("Access Denied.");
            }
            return Repositories.imageRepository.createWithValidate(user.id, detail);
        },
        updateImage: (obj, args, context, info): Promise<ImageDocument> => {
            const { id, detail } = args;
            const { req } = context;
            const { user, employee } = req.session;
            if (!user && !employee) {
                throw new Error("Access Denied.");
            }
            return Repositories.imageRepository.updateWithValidate(id, detail);
        },
        deleteImage: (obj, args, context, info): Promise<string> => {
            const { id } = args;
            const { req } = context;
            const { user, employee } = req.session;
            if (!user && !employee) {
                throw new Error("Access Denied.");
            }
            return Repositories.imageRepository.delete(id).then(image => {
                if (!image) { throw new Error("Image don\'t exist."); }
                return "DELETED";
            });
        },
    }
};

export default imageResolvers;