import mongoose from 'mongoose';
import { TaskModel } from '../../models/Task';

describe('Task Model', () => {
  beforeEach(async () => {
    await TaskModel.deleteMany({});
  });

  it('should create a task with default values', async () => {
    const task = new TaskModel({
      originalPath: '/input/test-image.jpg'
    });

    const savedTask = await task.save();
    
    expect(savedTask.taskId).toBeDefined();
    expect(savedTask.status).toBe('pending');
    expect(savedTask.price).toBeGreaterThanOrEqual(5);
    expect(savedTask.price).toBeLessThanOrEqual(50);
    expect(savedTask.images).toEqual([]);
  }, 10000);

  it('should validate required fields', async () => {
    const invalidTask = new TaskModel({});
    (invalidTask as any).price = undefined;
    (invalidTask as any).originalPath = null;


    await expect(invalidTask.save()).rejects.toThrow();
  }, 10000);
});

afterAll(async () => {
  if (mongoose.connection.readyState !== 0) {
    await mongoose.disconnect();
  }
}); 