import BasicRepository from "./BasicRepository";
import { ImageDocument } from "../models/Image/types";
import { IImage } from "./types";
export declare class ImageRepository extends BasicRepository<ImageDocument> {
    constructor();
    create: (userId: string, folderId: string, image: IImage) => Promise<ImageDocument>;
    update: (id: string, image: IImage) => Promise<ImageDocument>;
    renameTemp: (images: ImageDocument[]) => Promise<ImageDocument[]>;
    delete: (id: string) => Promise<ImageDocument>;
}
export declare const imageRepository: ImageRepository;
