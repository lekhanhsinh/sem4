import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import { Employee } from "../../../models/Employee/types";
const employees: (Employee & { _id: any })[] = [];

const salt = bcrypt.genSaltSync(10);
const hash = bcrypt.hashSync("St@r1234", salt);

const _id = mongoose.Types.ObjectId();
const admin: Employee & {
  _id: any;
  createdAt: Date;
  updatedAt: Date;
} = {
  _id,
  id: (undefined as any),
  email: "admin@gmail.com",
  password: hash,
  name: "Admin",
  role: "Admin",
  createdAt: new Date(Date.now()),
  updatedAt: new Date(Date.now()),
};

employees.push(admin);
export = employees;