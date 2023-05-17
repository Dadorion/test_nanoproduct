import { ObjectId } from "mongodb";
import { Schema, model } from "mongoose";

const User = new Schema({
   _id: { type: ObjectId },
   name: { type: String, required: true },
   phone: { type: String, unique: true, required: true }
})

export default model('User', User)
