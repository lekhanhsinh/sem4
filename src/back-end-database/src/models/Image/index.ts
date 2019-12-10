import mongoose from "mongoose";
import bcrypt from "bcryptjs";

import { ImageDocument } from "./types";

import schema from "./schema";
import hookMiddlewares from "./middlewares";

class ImageClass {
}

schema.loadClass(ImageClass);
hookMiddlewares(schema);

export default mongoose.model<ImageDocument>("Image", schema);