import mongoose from "mongoose";
declare class BasicRepository<T extends mongoose.Document> {
    protected _collection: mongoose.Model<T>;
    constructor(collection: mongoose.Model<T>);
    getOnebyId: (id: string, populate?: string[]) => Promise<T | null>;
    getOne: (conditions: unknown, populate?: string[]) => Promise<T | null>;
    getMany: (searchs?: {
        path: string;
        str: string;
        options: string;
    }[], sort?: {
        sortBy: string;
        asc: boolean;
    }, populate?: string[]) => Promise<T[]>;
    check: (ids: string[]) => Promise<T[]>;
    create: (docs: unknown) => Promise<T | T[]>;
    update: (id: string, docs: unknown, populate?: string[]) => Promise<T | null>;
    delete: (id: string, populate?: string[]) => Promise<T | null>;
}
export default BasicRepository;
