import mongoose, { Document, Schema, Types } from 'mongoose';

export interface IActivity extends Document {
  user: Types.ObjectId;
  team?: Types.ObjectId;
  type: string;
  distance: number;
  duration: number;
  calories: number;
  timestamp: Date;
  createdAt: Date;
  updatedAt: Date;
}

const activitySchema = new Schema<IActivity>(
  {
    user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    team: { type: Schema.Types.ObjectId, ref: 'Team' },
    type: { type: String, required: true },
    distance: { type: Number, default: 0 },
    duration: { type: Number, default: 0 },
    calories: { type: Number, default: 0 },
    timestamp: { type: Date, default: () => new Date() },
  },
  { timestamps: true }
);

export default mongoose.model<IActivity>('Activity', activitySchema);
