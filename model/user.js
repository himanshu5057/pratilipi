import mongoose from "mongoose";

const UserSchema = mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    phone: { type: Number, required: true, unique: true },
  },
  { timestamps: true }
);

const user = mongoose.model("user", UserSchema);
export default user;
