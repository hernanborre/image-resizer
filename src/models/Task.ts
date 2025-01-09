import mongoose, { Document, Schema } from "mongoose";

interface IImage {
  _id?: Schema.Types.ObjectId;
  resolution: string;
  path: string;
}

export interface ITask extends Document {
  _id: Schema.Types.ObjectId;
  taskId: string;
  status: 'pending' | 'completed' | 'failed';
  price: number;
  images: IImage[];
  createdAt: Date;
  updatedAt: Date;
}

const ImageSchema: Schema = new Schema({
  resolution: { type: String, required: true },
  path: { type: String, required: true },
});

const TaskSchema: Schema = new Schema({
  taskId: { type: String, required: true, unique: true },
  status: { 
    type: String, 
    required: true,
    enum: ['pending', 'completed', 'failed'],
    default: 'pending'
  },
  price: { type: Number, required: true },
  images: { type: [ImageSchema], default: [] },
});

export const TaskModel = mongoose.model<ITask>('Task', TaskSchema);
