import faker from "faker";
import mongoose from "mongoose";
import fs from "fs-extra";
import path from "path";

import { ENVIRONMENT } from "../../../utils/secrets";
import users from "../2_users";
import { Image } from "../../../models/Image/types";

const fileNames = fs.readdirSync(path.resolve("public/images"));

const images: (Image & {
  _id: any;
  createdAt: number;
  updatedAt: number;
})[] = [];


if (ENVIRONMENT === "development") {
  for (let i = 0; i < 100; i++) {
    const imageId = mongoose.Types.ObjectId();
    const fileName = faker.random.arrayElement(fileNames);
    images.push(
      {
        _id: imageId,
        id: imageId + "",
        user: faker.random.arrayElement(users)._id,
        name: fileName,
        path: fileName,
        description: faker.lorem.lines(2),
        createdAt: Date.now(),
        updatedAt: Date.now(),
      }
    );
  }
}
export = images;