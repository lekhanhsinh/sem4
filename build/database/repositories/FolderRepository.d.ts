import BasicRepository from "./BasicRepository";
import { FolderDocument } from "../models/Folder/types";
import { IFolder } from "./types";
export declare class FolderRepository extends BasicRepository<FolderDocument> {
    constructor();
    create: (userId: string, folder: IFolder) => Promise<FolderDocument>;
    update: (id: string, folder: IFolder) => void;
    delete: (id: string) => Promise<FolderDocument>;
}
export declare const folderRepository: FolderRepository;
