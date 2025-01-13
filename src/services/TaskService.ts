import { ITask } from "../models/Task";
import { TaskRepository } from "../repositories/TaskRepository";
import { NotFoundError, ProcessingError } from '../utils/errors';

export class TaskService {
  private taskRepository = new TaskRepository();

  async getTaskDetails(taskId: string) {
    const task = await this.taskRepository.findByTaskId(taskId);
    
    if (!task) {
      throw new NotFoundError(`Task with ID ${taskId} not found`);
    }

    return task;
  }

  async getAllTasks() {
    return await this.taskRepository.findAll();
  }

  async createTask(originalPath: string) {
    try {
      const newTask: Partial<ITask> = {
        status: 'pending',
        originalPath,
        images: []
      };

      return await this.taskRepository.create(newTask);
    } catch (error) {
      throw new ProcessingError(
        'Failed to create task',
        error instanceof Error ? error.message : error
      );
    }
  }

  async updateTask(taskId: string, updateData: Partial<ITask>) {
    return await this.taskRepository.update(taskId, updateData);
  }
}
