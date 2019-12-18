import faker from "faker";
import bcrypt from "bcryptjs";
import mongoose from "mongoose";

import { User } from "../../../models/User/types";
import { ENVIRONMENT } from "../../../utils/secrets";

const salt = bcrypt.genSaltSync(10);
const hash = bcrypt.hashSync("St@r1234", salt);

const users: (User & { _id: any })[] = [];

if (ENVIRONMENT === "development") {
  for (let i = 0; i < 100; i++) {
    const userId = mongoose.Types.ObjectId();
    users.push(
      {
        _id: userId,
        id: userId + "",
        email: faker.internet.email(),
        password: hash,
        name: faker.name.firstName(),
        gender: faker.random.arrayElement(["MALE", "FEMALE"]),
        address: faker.address.streetAddress(true),
        dateOfBirth: faker.date.past(),
        phoneNumber: faker.phone.phoneNumber()
      }
    );
  }
}

export = users;