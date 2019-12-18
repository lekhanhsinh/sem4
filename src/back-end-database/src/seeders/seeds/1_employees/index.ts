import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import { Employee } from "../../../models/Employee/types";
const employees: (Employee & { _id: any })[] = [];

const salt = bcrypt.genSaltSync(10);
const hash = bcrypt.hashSync("St@r1234", salt);

const _id = mongoose.Types.ObjectId();
const admin: Employee & {
  _id: any;
  createdAt: number;
  updatedAt: number;
} = {
  _id,
  id: _id + "",
  email: "admin@gmail.com",
  password: hash,
  name: "Admin",
  role: "Admin",
  createdAt: Date.now(),
  updatedAt: Date.now(),
};

employees.push(admin);
export = employees;