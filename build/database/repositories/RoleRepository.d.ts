import BasicRepository from "./BasicRepository";
import { RoleDocument } from "../models/Role/types";
import { IRole } from "./types";
export declare class RoleRepository extends BasicRepository<RoleDocument> {
    constructor();
    create: (role: IRole) => Promise<RoleDocument>;
    update: (id: string, role: IRole) => Promise<RoleDocument>;
    delete: (id: string) => Promise<RoleDocument>;
}
export declare const roleRepository: RoleRepository;
