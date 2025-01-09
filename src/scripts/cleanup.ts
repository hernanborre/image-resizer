import * as dotenv from 'dotenv';
import mongoose from "mongoose";
import { TaskModel } from "../models/Task";

// Load environment variables from .env file
dotenv.config();

const MONGODB_URI = process.env.MONGODB_URI;

async function cleanup() {
  try {
    // Connect to MongoDB using the environment variable
    await mongoose.connect(MONGODB_URI || "");

    // Delete all tasks
    await TaskModel.deleteMany({});

    console.log("Database cleaned successfully!");
  } catch (error) {
    console.error("Error cleaning database:", error);
  } finally {
    await mongoose.connection.close();
  }
}

cleanup();
