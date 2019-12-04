import BasicRepository from "./BasicRepository";
import { ImageDocument } from "../models/Image/types";
import { IImage } from "./types";
export declare class ImageRepository extends BasicRepository<ImageDocument> {
    constructor();
    create: (folderId: string, image: IImage) => Promise<void>;
    update: (id: string, image: IImage) => Promise<ImageDocument>;
    delete: (id: string) => Promise<ImageDocument>;
}
export declare const imageRepository: ImageRepository;
