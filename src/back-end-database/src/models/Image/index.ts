import mongoose from "mongoose";

import { ImageDocument } from "./types";

import schema from "./schema";
import hookMiddlewares from "./middlewares";

class ImageClass {
}

schema.loadClass(ImageClass);
hookMiddlewares(schema);

export default mongoose.model<ImageDocument>("Image", schema);