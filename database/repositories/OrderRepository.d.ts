import BasicRepository from "./BasicRepository";
import { OrderDocument } from "../models/Order/types";
import { IOrder } from "./types";
import { ImageDocument } from "../models/Image/types";
export declare class OrderRepository extends BasicRepository<OrderDocument> {
    constructor();
    create: (userId: string, order: IOrder) => Promise<OrderDocument>;
    update: (id: string, order: IOrder) => Promise<OrderDocument>;
    delete: (id: string) => Promise<OrderDocument>;
    caculatePrice: (images: {
        image: ImageDocument;
        printSize: string;
        count: number;
        price: number;
    }[], couponName?: string | undefined) => Promise<number>;
}
export declare const orderRepository: OrderRepository;
