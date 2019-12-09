import mongoose from "mongoose";
import bcrypt from "bcryptjs";

import { EmployeeDocument } from "./types";

import schema from "./schema";
import hookMiddlewares from "./middlewares";

class EmployeeClass {
    comparePassword(this: EmployeeDocument, candidatePassword: string): Promise<boolean> {
        return bcrypt.compare(candidatePassword, this.password);
    }
}

schema.loadClass(EmployeeClass);
hookMiddlewares(schema);

export default mongoose.model<EmployeeDocument>("Employee", schema);