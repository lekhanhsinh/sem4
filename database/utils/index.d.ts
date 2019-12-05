import { IFile } from "../repositories/types";
export declare const genTempName: (name?: string) => Promise<string>;
export declare const saveImage: (name?: string, tempName?: string, folder?: string, newName?: string, file?: Promise<IFile> | undefined) => Promise<{
    newTempName: string;
    newName: string;
}>;
export declare const deleteImage: (fullName?: string, folder?: string) => Promise<void>;
export declare const saveFolder: (newName?: string, name?: string) => Promise<string>;
export declare const deleteFolder: (name?: string) => Promise<void>;
