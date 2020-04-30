import mongoose, { Document, Schema } from 'mongoose';

export interface User extends Document {
  name: string;
  gender: string;
  points: number;
  dangerousAge: boolean;
  chronicDiseases: boolean;
  contact: boolean;
}

const UserSchema = new Schema({
  name: { type: String, required: true },
  gender: { type: String, required: true },
  points: { type: Number, required: true },
  dangerousAge: { type: Boolean, required: true },
  chronicDiseases: { type: Boolean, required: true },
  contact: { type: Boolean, required: true },
});

export default mongoose.model<User>('User', UserSchema);
