import { ITask, TaskModel } from "../models/Task";

export class TaskRepository {
  
  async update(taskId: string, updateData: Partial<ITask>): Promise<ITask | null> {
    return await TaskModel.findOneAndUpdate(
      { taskId },
      updateData,
      { new: true }
    );
  }
 
  async create(taskData: Partial<ITask>): Promise<ITask> {
    const task = new TaskModel(taskData);
    return await task.save();
  }

  async findByTaskId(taskId: string): Promise<ITask | null> {
    return  await TaskModel.findOne({ taskId });
  }

  async findAll(): Promise<ITask[]> {
   return await TaskModel.find();
  }
}
