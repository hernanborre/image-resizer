import { ITask } from "../models/Task";
import { TaskRepository } from "../repositories/TaskRepository";

export class TaskService {
  private taskRepository = new TaskRepository();

  async getTaskDetails(taskId: string) {
    const task = await this.taskRepository.findByTaskId(taskId);

    // if (!task) {
    //   throw new Error("Task not found");
    // }

    return task;
  }

  async getAllTasks() {
    return await this.taskRepository.findAll();
  }

  async createTask(originalPath: string) {
    const newTask: Partial<ITask> = {
      status: 'pending',
      originalPath,
      images: [] // Empty array for now
    };

    return await this.taskRepository.create(newTask);
  }

  async updateTask(taskId: string, updateData: Partial<ITask>) {
    return await this.taskRepository.update(taskId, updateData);
  }
}
