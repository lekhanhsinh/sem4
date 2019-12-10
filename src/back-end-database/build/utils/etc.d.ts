/// <reference types="node" />
import { ReadStream } from "fs-extra";
interface UFile {
    createReadStream: () => ReadStream;
    filename: string;
    mimetype: string;
    encoding: string;
}
export declare const saveImage: (file: Promise<UFile>, oldName?: string) => Promise<string>;
export {};
