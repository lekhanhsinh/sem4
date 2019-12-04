import { IFile } from "../repositories/types";
export declare const saveImage: (newName: string | undefined, file: Promise<IFile>, name?: string, folder?: string) => Promise<string>;
export declare const deleteImage: (name?: string, folder?: string) => Promise<void>;
export declare const saveFolder: (newName?: string, name?: string) => Promise<string>;
export declare const deleteFolder: (name?: string) => Promise<void>;
