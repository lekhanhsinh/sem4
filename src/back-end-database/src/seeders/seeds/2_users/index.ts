import faker from "faker";
import bcrypt from "bcryptjs";
import mongoose from "mongoose";

import { User } from "../../../models/User/types";
import { ENVIRONMENT } from "../../../utils/secrets";

const salt = bcrypt.genSaltSync(10);
const hash = bcrypt.hashSync("St@r1234", salt);

const users: (User & {
  _id: any;
  createdAt: Date;
  updatedAt: Date;
})[] = [];

if (ENVIRONMENT === "development") {
  for (let i = 0; i < 100; i++) {
    const userId = mongoose.Types.ObjectId();
    users.push(
      {
        _id: userId,
        id: (undefined as any),
        email: faker.internet.email().toLowerCase(),
        password: hash,
        name: faker.name.firstName(),
        gender: faker.random.arrayElement(["MALE", "FEMALE"]),
        address: faker.address.streetAddress(true),
        dateOfBirth: faker.date.past(),
        phoneNumber: Math.floor(Math.random() * 1000000000).toString(),
        createdAt: new Date(Date.now()),
        updatedAt: new Date(Date.now()),
      }
    );
  }
}

export = users;