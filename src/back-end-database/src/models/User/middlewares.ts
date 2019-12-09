import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import { UserDocument } from "./types";

const hookMiddlewares = (schema: mongoose.Schema): mongoose.Schema => {

    /**
     * Password hash middleware.
     */
    schema.pre("save", function save(next) {
        const user = this as UserDocument;
        if (!user.isNew && !user.isModified("password")) { return next(); }
        bcrypt.genSalt(10, (err, salt) => {
            if (err) { return next(err); }
            bcrypt.hash(user.password, salt, (err: mongoose.Error, hash: string) => {
                if (err) { return next(err); }
                user.password = hash;
                return next();
            });
        });
    });

    return schema;
};

export default hookMiddlewares;
