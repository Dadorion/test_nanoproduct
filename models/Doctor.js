import { ObjectId } from "mongodb";
import { Schema, model } from "mongoose";

const Doctor = new Schema({
   _id: { type: ObjectId },
   name: { type: String, required: true },
   spec: { type: String, required: true },
   slots: [
      {
         // dt -> datetime with type string and milliseconds
         dt: { type: Date, default: null },
         // user -> userId with type string. Default is null. If userId is not null we have some user on the slot.
         user: { type: String, default: null },
         isNotified_24: { type: Boolean, default: false },
         isNotified_2: { type: Boolean, default: false },
      }
   ]
})

export default model('Doctor', Doctor)
