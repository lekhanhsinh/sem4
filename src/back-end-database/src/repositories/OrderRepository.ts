import BasicRepository from "./BasicRepository";
import * as Models from "../models";
import { OrderDocument } from "../models/Order/types";

export class OrderRepository extends BasicRepository<OrderDocument>{
    constructor() {
        super(Models.Order);
    }

    getManybyUserId = (
        userId: string,
        sort: { sortBy: string; asc: boolean } = { sortBy: "updatedAt", asc: false },
        populate: string[] = []
    ): Promise<OrderDocument[]> => {
        return this._collection.find({ user: userId })
            .populate(populate)
            .sort({ [sort.sortBy]: sort.asc ? 1 : -1 })
            .exec();
    }

    create = (
        docs: unknown
    ): Promise<OrderDocument> => {
        return this._collection.create(docs);
    }
}

export const orderRepository = new OrderRepository();