import mongoose from "mongoose";

export type Employee = {
    id: string;
    email: string;
    password: string;
    name: string;
    role: string;
}

export type EmployeeDocument = mongoose.Document & Employee & {
    comparePassword: (candidatePassword: string) => Promise<boolean>;
}
