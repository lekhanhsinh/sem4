import BasicRepository from "./BasicRepository";
import { OrderDocument } from "../models/Order/types";
export declare class OrderRepository extends BasicRepository<OrderDocument> {
    constructor();
    getManybyUserId: (userId: string, sort?: {
        sortBy: string;
        asc: boolean;
    }, populate?: string[]) => Promise<OrderDocument[]>;
    create: (docs: unknown) => Promise<OrderDocument>;
    update: (id: string, docs: unknown, populate?: string[]) => Promise<OrderDocument>;
}
export declare const orderRepository: OrderRepository;
