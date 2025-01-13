import crypto from 'crypto';
import { NextFunction, Request, Response } from 'express';
import fs from 'fs/promises';
import path from "path";
import sharp from 'sharp';
import { ITask } from '../models/Task';
import { TaskService } from '../services/TaskService';
import { NotFoundError, ProcessingError, ValidationError } from '../utils/errors';

const taskService = new TaskService();

export const getTask = async (
  req: Request, 
  res: Response, 
  next: NextFunction
): Promise<void> => {
    try {
        const taskId = req.params.taskId;
        const task = await taskService.getTaskDetails(taskId);
        
        if (!task) {
            throw new NotFoundError(`Task with ID ${taskId} not found`);
        }
        
        res.json(task);
    } catch (error) {
        next(error);
    }
};

export const getAllTasks = async (req: Request, res: Response) => {
    try {
      const tasks = await taskService.getAllTasks();

      res.status(200).json(tasks);
    } catch (error: any) {
        res.status(500).json({ message: 'Error fetching tasks', error });
    }
  };

export const createTask = async (
  req: Request & { file?: Express.Multer.File }, 
  res: Response, 
  next: NextFunction
): Promise<void> => {
    let newTask: ITask | null = null;
    try {
        if (!req.file) {
            throw new ValidationError('No image file uploaded');
        }

        const inputLocalOriginalImage = path.join('/', 'input', req.file.originalname);
        newTask = await taskService.createTask(inputLocalOriginalImage);

        const originalName = path.parse(req.file.originalname).name;
        const extension = path.parse(req.file.originalname).ext;
        const inputPath = req.file.path;
        
        // Create output directories
        const baseOutputDir = path.join(__dirname, '..', '..', 'output', originalName);
        await fs.mkdir(path.join(baseOutputDir, '1024'), { recursive: true });
        await fs.mkdir(path.join(baseOutputDir, '800'), { recursive: true });

        // Process images and get their buffers
        const [image1024Buffer, image800Buffer] = await Promise.all([
            sharp(inputPath)
                .resize(1024, null, { withoutEnlargement: true })
                .toBuffer(),
            sharp(inputPath)
                .resize(800, null, { withoutEnlargement: true })
                .toBuffer()
        ]);

        // Calculate MD5 for each variant
        const md5Hash1024 = crypto.createHash('md5').update(image1024Buffer).digest('hex');
        const md5Hash800 = crypto.createHash('md5').update(image800Buffer).digest('hex');

        // Save files with their respective hashes
        await Promise.all([
            fs.writeFile(path.join(baseOutputDir, '1024', `${md5Hash1024}${extension}`), image1024Buffer),
            fs.writeFile(path.join(baseOutputDir, '800', `${md5Hash800}${extension}`), image800Buffer)
        ]);

        const output1024 = path.join('/', 'output', '1024', `${md5Hash1024}${extension}`);
        const output800 = path.join('/', 'output', '800', `${md5Hash800}${extension}`);

        // Update task with completed status and images
        newTask.status = 'completed';
        newTask.images = [
            { resolution: "1024", path: output1024 },
            { resolution: "800", path: output800 }
        ];
        await taskService.updateTask(newTask.taskId, newTask);

        res.status(201).json({
            message: 'Image processed successfully',
            taskId: newTask.taskId,
            price: newTask.price,
            status: newTask.status,
            inputLocalOriginalImage,
            images: [
                { resolution: '1024', path: output1024 },
                { resolution: '800', path: output800 }
            ]
        });
    } catch (error) {
        if (newTask) {
            await taskService.updateTask(newTask.taskId, { status: "failed" });
        }
        next(error instanceof Error ? new ProcessingError(error.message, error) : error);
    }
};