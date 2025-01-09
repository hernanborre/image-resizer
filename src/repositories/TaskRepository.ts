import { ITask, TaskModel } from "../models/Task";

export class TaskRepository {
  async findById(taskId: string): Promise<ITask | null> {
    const result =  TaskModel.findOne({ taskId });
    console.log('Query explanation:', JSON.stringify(result, null, 2));
    return result;
  }

  async findAll(): Promise<ITask[]> {
   return await TaskModel.find();
  }
}
