import BasicRepository from "./BasicRepository";
import { CouponDocument } from "../models/Coupon/types";
import { ICoupon } from "./types";
export declare class CouponRepository extends BasicRepository<CouponDocument> {
    constructor();
    create: (coupon: ICoupon) => Promise<CouponDocument>;
    update: (id: string, coupon: ICoupon) => void;
    delete: (id: string) => Promise<CouponDocument>;
}
export declare const couponRepository: CouponRepository;
