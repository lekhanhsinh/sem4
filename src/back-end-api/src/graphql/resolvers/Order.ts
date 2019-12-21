import { IResolvers } from "graphql-tools";

import { Repositories } from "@back-end-database";
import { OrderDocument } from "@back-end-database/models/Order/types";

const orderResolvers: IResolvers = {
    Query: {
        getSelfOrders: (obj, args, context, info): Promise<OrderDocument[]> => {
            const { req } = context;
            const { user } = req.session;
            if (!user || !user.logged) {
                throw new Error("Access Denied.");
            }
            return Repositories.orderRepository.getManybyUserId(user.id);
        },
        getOrder: (obj, args, context, info): Promise<OrderDocument | null> => {
            const { id } = args;
            return Repositories.orderRepository.getOnebyId(id);
        },
        getOrders: (obj, args, context, info): Promise<OrderDocument[]> => {
            const { sort, searchs } = args;
            const { req } = context;
            const { employee } = req.session;
            if (!employee || !employee.logged) {
                throw new Error("Access Denied.");
            }
            return Repositories.orderRepository.getMany(searchs, sort);
        }
    },
    Mutation: {
        createOrder: (obj, args, context, info): Promise<OrderDocument> => {
            const { creditCardNumber, detail } = args;
            const { req } = context;
            const { user, cart } = req.session;
            if (!user || !user.logged) {
                throw new Error("Access Denied.");
            }
            return Repositories.orderRepository.create({ creditCardNumber, user: user.id, email: user.email, ...cart, ...detail });
        },
        updateOrder: (obj, args, context, info): Promise<OrderDocument> => {
            const { id, detail } = args;
            const { req } = context;
            const { order } = req.session;
            if (!order) {
                throw new Error("Access Denied.");
            }
            return Repositories.orderRepository.update(id, detail);
        },
        deleteOrder: (obj, args, context, info): Promise<string> => {
            const { id } = args;
            const { req } = context;
            const { order } = req.session;
            if (!order) {
                throw new Error("Access Denied.");
            }
            return Repositories.orderRepository.delete(id).then(order => {
                if (!order) { throw new Error("Order don\'t exist."); }
                return "DELETED";
            });
        },
    }
};

export default orderResolvers;