import mongoose from "mongoose";

import { OrderDocument } from "./types";

import schema from "./schema";
import hookMiddlewares from "./middlewares";

class OrderClass {
}

schema.loadClass(OrderClass);
hookMiddlewares(schema);

export default mongoose.model<OrderDocument>("Order", schema);