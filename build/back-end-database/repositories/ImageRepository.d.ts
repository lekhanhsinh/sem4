import BasicRepository from "./BasicRepository";
import { ImageDocument } from "../models/Image/types";
export declare class ImageRepository extends BasicRepository<ImageDocument> {
    constructor();
    getOnebyId: (id: string) => Promise<ImageDocument | null>;
    getMany: () => Promise<ImageDocument[]>;
    getManybyUserId: (userId: string) => Promise<ImageDocument[]>;
    createWithValidate: (userId: string, detail: unknown) => Promise<ImageDocument>;
    updateWithValidate: (id: string, detail: unknown) => Promise<ImageDocument>;
}
export declare const imageRepository: ImageRepository;
