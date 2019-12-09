import mongoose from "mongoose";
declare const hookMiddlewares: (schema: mongoose.Schema<any>) => void;
export default hookMiddlewares;
