import { Request, Response } from 'express';
import { TaskService } from '../services/TaskService';

const taskService = new TaskService();

export const getTask = async (req: Request, res: Response) => {
  try {
    const taskId = req.params.taskId;
    const taskDetails = await taskService.getTaskDetails(taskId);

    res.status(200).json(taskDetails);
  } catch (error: any) {
    res.status(404).json({ message: error.message });
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