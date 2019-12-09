import mongoose from "mongoose";
import bcrypt from "bcryptjs";

import { UserDocument } from "./types";

import schema from "./schema";
import hookMiddlewares from "./middlewares";

class UserClass {
    comparePassword(this: UserDocument, candidatePassword: string): Promise<boolean> {
        return bcrypt.compare(candidatePassword, this.password);
    }
}

schema.loadClass(UserClass);
hookMiddlewares(schema);

export default mongoose.model<UserDocument>("User", schema);