import BasicRepository from "./BasicRepository";
import { EmployeeDocument } from "../models/Employee/types";
export declare class EmployeeRepository extends BasicRepository<EmployeeDocument> {
    constructor();
    getOnebyEmail: (email: string, populate?: string[]) => Promise<EmployeeDocument | null>;
    register: (email: string, password: string, repeatPassword: string, detail: unknown) => Promise<EmployeeDocument>;
    update: (id: string, detail: unknown) => Promise<EmployeeDocument>;
    updateDetail: (id: string, detail: unknown) => Promise<EmployeeDocument>;
    updatePassword: (id: string, password: string, newPassword: string, repeatPassword: string) => Promise<EmployeeDocument>;
}
export declare const employeeRepository: EmployeeRepository;
