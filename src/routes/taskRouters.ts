import { Router } from "express";
import { createTask, getTask } from '../controllers/TaskController';
import { upload } from '../middleware/uploadMiddleware';

const router = Router();

// Get a task by ID
router.get("/tasks/:taskId", getTask);

// upload and resize an image and save it to db
router.post("/tasks", upload.single('image'), createTask);


export default router;