import mongoose, { Document, Schema, Types } from 'mongoose';

export interface IWorkout extends Document {
  user: Types.ObjectId;
  name: string;
  type: string;
  intensity: string;
  scheduledAt: Date;
  notes?: string;
  createdAt: Date;
  updatedAt: Date;
}

const workoutSchema = new Schema<IWorkout>(
  {
    user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    name: { type: String, required: true },
    type: { type: String, required: true },
    intensity: { type: String, default: 'Moderate' },
    scheduledAt: { type: Date, required: true },
    notes: { type: String, default: '' },
  },
  { timestamps: true }
);

export default mongoose.model<IWorkout>('Workout', workoutSchema);
