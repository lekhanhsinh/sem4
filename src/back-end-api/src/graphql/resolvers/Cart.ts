import { IResolvers } from "graphql-tools";

import { Repositories } from "@back-end-database";

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
            return cart;
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

            const imageIds = items.map(i => i.image);

            return Repositories.imageRepository.check(imageIds).then(images => {
                const tempItems = [];
                let totalPrice = 0;
                if (!images) { return cart; }
                for (const image of images) {
                    const item = items.find(i => i.image === image.id);
                    if (item) {
                        const size = item.size.split("x");
                        const price = (parseInt(size[0]) * parseInt(size[1])) * item.quantity * 0.5;
                        tempItems.push({
                            image,
                            size: item.size,
                            material: item.material,
                            quantity: item.quantity,
                            totalPrice: price
                        });
                        totalPrice += price;
                    }
                }
                user.cart = {
                    items: tempItems,
                    totalPrice
                };
                return user.cart;
            });
        },
    },
};
export default cartResolvers;