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
            .populate("user", "items.image")
            .sort({ [sort.sortBy]: sort.asc ? 1 : -1 })
            .exec();
    }

    create = (
        docs: unknown
    ): Promise<OrderDocument> => {
        return this._collection.create(docs);
    }

    update = (
        id: string,
        docs: unknown,
        populate: string[] = []
    ): Promise<OrderDocument> => {
        return this._collection.findByIdAndUpdate(id, docs, { new: true })
            .populate("user", "items.image")
            .exec().then(found => {
                if (!found) { throw new Error("Order don\'t exist."); }
                found.status = (docs as any).status ? (docs as any).status : found.status;
                found.description = (docs as any).description ? (docs as any).description : found.description;
                return found;
            });
    }
}

export const orderRepository = new OrderRepository();