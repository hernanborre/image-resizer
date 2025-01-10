import * as dotenv from 'dotenv';
import mongoose from 'mongoose';
import { TaskModel } from '../models/Task';

// Load environment variables from .env file
dotenv.config();

const MONGODB_URI = process.env.MONGODB_URI

const sampleTasks = [
  {
    taskId: 'd8e59cfb-0b83-4305-a1c9-8bd135a3c3ca',
    status: 'pending',
    price: 10.99,
    originalPath: '/input/originalImageName1.jpg',
    images: [],
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    taskId: '7f99e3ef-1d3a-49e4-ae20-962e3bc71e38',
    status: 'completed',
    price: 15.99,
    originalPath: '/input/originalImageName2.jpg',
    images: [
      {
        resolution: "1024",
        path: "/output/image2/1024/f322b730b287.jpg"
      },
      {
        resolution: "800",
        path: "/output/image2/800/202fd8b3174.jpg"
      }
    ],
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    taskId: 'bb3a7f3b-3491-4baa-a6ca-c1e6331274e6',
    status: 'failed',
    price: 12.50,
    originalPath: '',
    images: [],
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    taskId: '854845d4-deec-4178-a418-4f67362680d8',
    status: 'pending',
    price: 9.99,
    originalPath: '/input/originalImageName4.jpg',
    images: [],
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    taskId: '1c66d0a0-681f-4335-a8f5-728905c105c4',
    status: 'completed',
    price: 11.99,
    originalPath: '/input/originalImageName5.jpg',
    images: [
      {
        resolution: "1024",
        path: "/output/image5/1024/a123b456c789.jpg"
      },
      {
        resolution: "800",
        path: "/output/image5/800/d987e654f321.jpg"
      }
    ],
    createdAt: new Date(),
    updatedAt: new Date()
  }
];

async function seed() {
  try {
    // Connect to MongoDB using the environment variable
    await mongoose.connect(MONGODB_URI || "");
    
    // Clear existing tasks
    await TaskModel.deleteMany({});
    
    // Insert sample tasks
    await TaskModel.insertMany(sampleTasks);
    
    console.log('Database seeded successfully!');
  } catch (error) {
    console.error('Error seeding database:', error);
  } finally {
    await mongoose.connection.close();
  }
}

seed(); 