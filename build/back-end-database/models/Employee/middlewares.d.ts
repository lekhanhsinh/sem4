import mongoose from "mongoose";
declare const hookMiddlewares: (schema: mongoose.Schema<any>) => mongoose.Schema<any>;
export default hookMiddlewares;
