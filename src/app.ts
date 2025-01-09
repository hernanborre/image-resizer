import cors from 'cors';
import * as dotenv from 'dotenv';
import express from "express";
import mongoose from 'mongoose';
import morgan from 'morgan';
import path from 'path';
import swaggerUi from 'swagger-ui-express';
import YAML from 'yamljs';
import taskRoutes from "./routes/taskRouters";

dotenv.config();

const app = express();
const MONGODB_URI = process.env.MONGODB_URI;

// MongoDB connection setup
mongoose.connect(MONGODB_URI || "")
  .then(() => {
    console.log('Connected to MongoDB successfully!');
  })
  .catch((error) => {
    console.error('MongoDB connection error:', error);
    process.exit(1); // Exit if unable to connect to database
  });

// Error handling for after initial connection
mongoose.connection.on('error', (error) => {
  console.error('MongoDB connection error:', error);
});

mongoose.connection.on('disconnected', () => {
  console.log('MongoDB disconnected');
});

// Graceful shutdown
process.on('SIGINT', async () => {
  await mongoose.connection.close();
  process.exit(0);
});

app.use(morgan('dev'))
app.use(cors());
app.use(express.json());
app.use("/", taskRoutes);

// Load the OpenAPI specification
const swaggerDocument = YAML.load(path.join(__dirname, '../docs/openapi.yaml'));

// Serve Swagger UI
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

export default app;
