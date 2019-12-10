import mime from "mime-types";
import path from "path";
import fs, { ReadStream } from "fs-extra";

interface UFile {
    createReadStream: () => ReadStream;
    filename: string;
    mimetype: string;
    encoding: string;
}

const readStreamtoBuffer = (readStream: ReadStream): Promise<unknown> => {
    return new Promise((resolve) => {
        const buffers = [] as Uint8Array[];
        readStream.on("data", function (data) {
            buffers.push(data);
        });
        readStream.on("end", function () {
            const actualContents = Buffer.concat(buffers);
            resolve(actualContents);
        });
    });
};

export const saveImage = (
    file: Promise<UFile>,
    oldName = ""
): Promise<string> => {
    if (!file) {
        throw new Error("File is not a image.");
    }
    return file.then((file: UFile) => {
        return readStreamtoBuffer(file.createReadStream()).then((buffer) => {
            if (!file.mimetype.startsWith("image/")) {
                throw new Error("File is not a image.");
            }
            if (oldName) {
                return fs.remove(path.resolve(`public/images/${oldName}`)).then(() => {
                    const newName = `${file.filename}-${Date.now()}.${mime.extension(file.mimetype)}`;
                    return fs.writeFile(path.resolve(`public/images/${newName}`), buffer).then(() => {
                        return newName;
                    });
                });
            }
            else {
                const newName = `${file.filename}-${Date.now()}.${mime.extension(file.mimetype)}`;
                return fs.writeFile(path.resolve(`public/images/${newName}`), buffer).then(() => {
                    return newName;
                });
            }
        });
    });
};