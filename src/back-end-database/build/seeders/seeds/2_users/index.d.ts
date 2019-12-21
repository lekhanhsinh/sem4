import { User } from "../../../models/User/types";
declare const users: (User & {
    _id: any;
    createdAt: Date;
    updatedAt: Date;
})[];
export = users;
