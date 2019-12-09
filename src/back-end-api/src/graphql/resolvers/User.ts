import { IResolvers } from "graphql-tools";

import { Repositories } from "@back-end-database";
import { UserDocument } from "@back-end-database/models/User/types";

const userResolvers: IResolvers = {
    Query: {
        getSelf: (obj, args, context, info): Promise<UserDocument | null> => {
            const { req } = context;
            const { user } = req.session;
            if (!user) {
                throw new Error("Access Denied.");
            }
            return Repositories.userRepository.getOnebyId(user.id);
        },
        getUser: (obj, args, context, info): Promise<UserDocument | null> => {
            const { id } = args;
            return Repositories.userRepository.getOnebyId(id);
        },
        getUsers: (obj, args, context, info): Promise<UserDocument[]> => {
            const { sort, searchs } = args;
            return Repositories.userRepository.getMany(searchs, sort);
        }
    },
    Mutation: {
        updateSelfDetail: (obj, args, context, info): Promise<UserDocument> => {
            const { detail } = args;
            const { req } = context;
            const { user } = req.session;
            if (!user) {
                throw new Error("Access Denied.");
            }
            return Repositories.userRepository.updateDetail(user.id, detail);
        },
        updateSelfPassword: (obj, args, context, info): Promise<UserDocument> => {
            const { password, newPassword, repeatPassword } = args;
            const { req } = context;
            const { user } = req.session;
            if (!user) {
                throw new Error("Access Denied.");
            }
            return Repositories.userRepository.updatePassword(user.id, password, newPassword, repeatPassword);
        },
        register: (obj, args, context, info): Promise<UserDocument> => {
            const { email, password, repeatPassword, detail } = args;
            return Repositories.userRepository.register(email, password, repeatPassword, detail);
        },
        updateUser: (obj, args, context, info): Promise<UserDocument> => {
            const { id, detail } = args;
            const { req } = context;
            const { employee } = req.session;
            if (!employee) {
                throw new Error("Access Denied.");
            }
            return Repositories.userRepository.update(id, detail).then(user => {
                if (!user) { throw new Error("User don\'t exist."); }
                return user.save();
            });
        },
        deleteUser: (obj, args, context, info): Promise<string> => {
            const { id } = args;
            const { req } = context;
            const { employee } = req.session;
            if (!employee) {
                throw new Error("Access Denied.");
            }
            return Repositories.userRepository.delete(id).then(user => {
                if (!user) { throw new Error("User don\'t exist."); }
                return "DELETED";
            });
        },
    }
};

export default userResolvers;