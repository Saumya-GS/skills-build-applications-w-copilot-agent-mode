import mongoose, { Document, Schema, Types } from 'mongoose';

export interface IUser extends Document {
  name: string;
  email: string;
  team?: Types.ObjectId;
  totalDistance: number;
  totalActivities: number;
  points: number;
  createdAt: Date;
  updatedAt: Date;
}

const userSchema = new Schema<IUser>(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    team: { type: Schema.Types.ObjectId, ref: 'Team' },
    totalDistance: { type: Number, default: 0 },
    totalActivities: { type: Number, default: 0 },
    points: { type: Number, default: 0 },
  },
  { timestamps: true }
);

export default mongoose.model<IUser>('User', userSchema);
