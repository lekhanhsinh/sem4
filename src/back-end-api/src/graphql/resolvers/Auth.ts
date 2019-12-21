import { IResolvers } from "graphql-tools";

import { Repositories } from "@back-end-database";
import { UserDocument } from "@back-end-database/models/User/types";

const authResolvers: IResolvers = {
    Mutation: {
        login: (obj, args, context, info): Promise<UserDocument> => {
            const { req } = context;
            const { email, password } = args;
            return Repositories.userRepository.getOnebyEmail(email)
                .then(function (user) {
                    if (!user) {
                        throw new Error("Access Denied.");
                    }
                    return user.comparePassword(password).then((isMatch) => {
                        if (!isMatch) {
                            throw new Error("Access Denied.");
                        }
                        if (req.session.user) {
                            req.session.user.logged = true;
                        } else {
                            req.session.user = {
                                id: user.id,
                                email: user.email,
                                cart: { items: [], totalPrice: 0 },
                                logged: true
                            };
                        }
                        return user;
                    });
                });
        },
        logout: (obj, args, context, info): Promise<string> => {
            const { req } = context;
            const { user } = req.session;
            if (!user || !user.logged) {
                throw new Error("Access Denied.");
            }
            user.logged = false;
            return Promise.resolve("LOGGED OUT");
        },
    },
};
export default authResolvers;