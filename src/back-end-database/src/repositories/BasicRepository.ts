import mongoose from "mongoose";

class BasicRepository<T extends mongoose.Document> {
    protected _collection: mongoose.Model<T>;
    constructor(collection: mongoose.Model<T>) {
        this._collection = collection;
    }

    /**
     * Gets a single document by its id
     * @param {string} id - Value of id
     * @param {string[]} populate - Populate paths
     * 
     * @memberof BasicRepository
     */
    getOnebyId = (
        id: string,
        populate: string[] = []
    ): Promise<T | null> => {
        return this._collection.findById(id)
            .populate(populate)
            .exec();
    }

    /**
     * Gets a single document by its id
     * @param {string} id - Value of id
     * @param {string[]} populate - Populate paths
     * 
     * @memberof BasicRepository
     */
    getOne = (
        id: string,
        conditions: unknown,
        populate: string[] = []
    ): Promise<T | null> => {
        return this._collection.findOne(conditions)
            .populate(populate)
            .exec();
    }

    /**
     * Searchs document in collection
     * @param {any} searchs - Search by
     * @param {any} sort - Sort by { path: asc/desc }
     * @param {string[]} populate - Populate paths
     *
     * @memberof BasicRepository
     */
    getMany = (
        searchs: { path: string; str: string; options: string }[] = [],
        sort: { sortBy: string; asc: boolean } = { sortBy: "updatedAt", asc: false },
        populate: string[] = []
    ): Promise<T[]> => {
        const query: { $or: { [key: string]: unknown }[] } = { $or: [] };
        if (searchs.length === 0) {
            return this._collection.find()
                .populate(populate)
                .sort({ [sort.sortBy]: sort.asc ? 1 : -1 })
                .exec();
        }
        for (const search of searchs) {
            const { path, str, options } = search;
            query.$or.push({ [path]: { "$regex": str, "$options": options } });
        }
        return this._collection.find(query)
            .populate(populate)
            .sort({ [sort.sortBy]: sort.asc ? 1 : -1 })
            .exec();
    }

    check = (
        ids: string[]
    ): Promise<T[]> => {
        return this._collection.find(
            {
                "_id": { $in: ids }
            }
        ).then(founds => {
            if (founds && ids.length === founds.length) {
                return founds;
            }
            return [];
        });
    }

    create = (
        docs: unknown | unknown[]
    ): Promise<T | T[]> => {
        return this._collection.create(docs);
    }

    update = (
        id: string,
        docs: unknown,
        populate: string[] = []
    ): Promise<T | null> => {
        return this._collection.findByIdAndUpdate(id, docs, { new: true })
            .populate(populate)
            .exec();
    }

    delete = (
        id: string,
        populate: string[] = []
    ): Promise<T | null> => {
        return this._collection.findByIdAndDelete(id)
            .populate(populate)
            .exec();
    }
}

export default BasicRepository;