import Stripe from "stripe";
import BasicRepository from "./BasicRepository";
import * as Models from "../models";
import { OrderDocument } from "../models/Order/types";
import { STRIPE_KEY } from "../utils/secrets";

const stripe = new Stripe(STRIPE_KEY);

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
        return stripe.charges.create({
            source: (docs as any).creditCardNumber,
            amount: (docs as any).total,
            currency: "usd",
            description: (docs as any).description
        }).then(charge => {
            (docs as any).charge = charge.id;
            return this._collection.create(docs);
        });
    }

    update = (
        id: string,
        docs: unknown,
        populate: string[] = []
    ): Promise<OrderDocument> => {
        return this._collection.findByIdAndUpdate(id, docs, { new: true })
            .populate(populate)
            .exec().then(found => {
                if (!found) { throw new Error("Order don\'t exist."); }
                stripe.charges.update(found.charge,
                    {
                        description: (docs as any).description ? (docs as any).description : found.description
                    });
                return found;
            });
    }
}

export const orderRepository = new OrderRepository();