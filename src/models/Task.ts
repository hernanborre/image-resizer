import mongoose, { Document, Schema } from "mongoose";
import { v4 as uuidv4 } from 'uuid';

interface IImage {
  resolution: string;
  path: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface ITask extends Document {
  taskId: string;
  status: "pending" | "completed" | "failed";
  price: number;
  originalPath: string;
  images: IImage[];
  createdAt: Date;
  updatedAt: Date;
}

const ImageSchema: Schema = new Schema({

  resolution: { type: String, required: true },
  path: { type: String, required: true },
}, { timestamps: true });

const TaskSchema: Schema = new Schema({
  taskId: { 
    type: String, 
    required: true, 
    unique: true,
    index: true,
    default: () => uuidv4()
  },
  status: {
    type: String,
    required: true,
    enum: ["pending", "completed", "failed"],
    default: "pending",
  },
  price: {
    type: Number,
    required: true,
    default: Math.floor(Math.random() * (50 - 5 + 1)) + 5
  },
  originalPath: { type: String },
  images: { type: [ImageSchema], default: [] },
}, { timestamps: true });

export const TaskModel = mongoose.model<ITask>("Task", TaskSchema);
