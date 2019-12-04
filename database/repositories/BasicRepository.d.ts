import mongoose from "mongoose";
declare class BasicRepository<T extends mongoose.Document> {
    collection: mongoose.Model<T>;
    constructor(collection: mongoose.Model<T>);
    getOne: (id: string) => mongoose.DocumentQuery<T | null, T, {}>;
    getAll: (sort?: {
        sortBy: string;
        asc: boolean;
    }) => mongoose.DocumentQuery<T[], T, {}>;
    search: (searchs: {
        path: string;
        str: string;
        options: string;
    }[], sort?: {
        sortBy: string;
        asc: boolean;
    }) => mongoose.DocumentQuery<T[], T, {}>;
    check: (ids: string[]) => Promise<T[]>;
}
export default BasicRepository;
