import mongoose from "mongoose";
export declare type Employee = {
    id: string;
    email: string;
    password: string;
    name: string;
    role: string;
};
export declare type EmployeeDocument = mongoose.Document & Employee & {
    comparePassword: (candidatePassword: string) => Promise<boolean>;
};
