import { IResolvers } from "graphql-tools";

import { Repositories } from "@back-end-database";
import { ImageDocument } from "../../../../back-end-database/src/models/Image/types";

import { myCache } from "../../index";

const cartResolvers: IResolvers = {
    Query: {
        getCart: (obj, args, context, info): Promise<any> => {
            const { req } = context;
            const { user } = req.session;
            if (!user || !user.logged) {
                throw new Error("Access Denied.");
            }

            let { cart } = user;
            if (!cart) { cart = { items: [], totalPrice: 0 }; }
            const promises = [];
            const temp = {
                items: [] as ImageDocument[],
                totalPrice: cart.totalPrice
            };
            for (const item of cart.items) {
                const promise = Repositories.imageRepository.getOnebyId(item.image).then(image => {
                    if (!image) {
                        cart.items.splice(cart.items.indexOf(item), 1);
                    } else {
                        temp.items.push(
                            {
                                ...item,
                                image,
                            }
                        );
                    }
                });
                promises.push(promise);
            }
            return Promise.all(promises).then(() => {
                return temp;
            });
        }
    },
    Mutation: {
        updateCart: (obj, args, context, info) => {
            const { items }: { items: any[] } = args;
            const { req } = context;
            const { user } = req.session;
            if (!user || !user.logged) {
                throw new Error("Access Denied.");
            }
            const { cart }: { cart: { items: any[]; totalPrice: number } } = user;

            const promises: Promise<any>[] = [];
            const tempItems: any[] = [];
            let totalPrice = 0;
            for (const i of items) {
                const promise = Repositories.imageRepository.getOnebyId(i.image).then(image => {
                    if (!image) {
                        items.splice(cart.items.indexOf(i), 1);
                    } else {
                        const size = i.size.split("x");
                        let price = 0;
                        if (myCache.get("method") === "PERCM") {
                            price = (parseInt(size[0]) * parseInt(size[1])) * i.quantity * parseFloat(myCache.get("pricePerCm") + "");
                        } else {
                            price = i.quantity * parseFloat(myCache.get("pricePerPic") + "");
                        }
                        tempItems.push({
                            image: i.image,
                            size: i.size,
                            material: i.material,
                            quantity: i.quantity,
                            totalPrice: price
                        });
                        totalPrice += price;
                    }
                });
                promises.push(promise);
            }
            return Promise.all(promises).then(() => {
                user.cart = {
                    items: tempItems,
                    totalPrice
                };
                const promises = [];
                const temp = {
                    items: [] as ImageDocument[],
                    totalPrice: user.cart.totalPrice
                };
                for (const item of user.cart.items) {
                    const promise = Repositories.imageRepository.getOnebyId(item.image).then(image => {
                        if (!image) {
                            cart.items.splice(user.cart.items.indexOf(item), 1);
                        } else {
                            temp.items.push(
                                {
                                    ...item,
                                    image,
                                }
                            );
                        }
                    });
                    promises.push(promise);
                }
                return Promise.all(promises).then(() => {
                    return temp;
                });
            });
        }
    },
};
export default cartResolvers;