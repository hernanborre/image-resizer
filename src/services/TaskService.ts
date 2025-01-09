import { TaskRepository } from "../repositories/TaskRepository";

export class TaskService {
  private taskRepository = new TaskRepository();

  async getTaskDetails(taskId: string) {
    const task = await this.taskRepository.findById(taskId);

    if (!task) {
      throw new Error("Task not found");
    }

    return {
      taskId: task.taskId,
      status: task.status,
      price: task.price,
      images: task.images,
    };
  }

  async getAllTasks() {
    return await this.taskRepository.findAll();
  }
}
