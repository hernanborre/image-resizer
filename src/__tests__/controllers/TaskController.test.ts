import { Request, Response } from 'express';
import { getTask } from '../../controllers/TaskController';
import { ITask } from '../../models/Task';
import { TaskService } from '../../services/TaskService';
import { NotFoundError } from '../../utils/errors';

// Mock TaskService
jest.mock('../../services/TaskService');

describe('TaskController', () => {
  let mockRequest: Partial<Request>;
  let mockResponse: Partial<Response>;
  let mockNext: jest.Mock;

  beforeEach(() => {
    jest.clearAllMocks();
    mockRequest = {};
    mockResponse = {
      json: jest.fn(),
      status: jest.fn().mockReturnThis(),
    };
    mockNext = jest.fn();
  });

  describe('getTask', () => {
    it('should return task when found', async () => {
      const mockTask = {
        taskId: '123',
        status: 'completed',
        price: 10,
        images: [],
        originalPath: '/path',
        createdAt: new Date(),
        updatedAt: new Date(),
        _id: '123',
      } as unknown as ITask;

      mockRequest.params = { taskId: '123' };
      jest.spyOn(TaskService.prototype, 'getTaskDetails').mockResolvedValueOnce(mockTask);

      await getTask(
        mockRequest as Request,
        mockResponse as Response,
        mockNext
      );

      expect(mockResponse.json).toHaveBeenCalledWith(mockTask);
    }, 10000);

    it('should call next with NotFoundError when task not found', async () => {
      mockRequest.params = { taskId: 'nonexistent' };
      jest.spyOn(TaskService.prototype, 'getTaskDetails')
        .mockRejectedValueOnce(new NotFoundError('Task not found'));

      await getTask(
        mockRequest as Request,
        mockResponse as Response,
        mockNext
      );

      expect(mockNext).toHaveBeenCalledWith(
        expect.any(NotFoundError)
      );
    }, 10000);
  });
}); 