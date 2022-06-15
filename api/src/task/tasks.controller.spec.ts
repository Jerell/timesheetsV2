import { Test } from '@nestjs/testing';
import { TasksService } from './tasks.service';

import { ModuleMocker, MockFunctionMetadata } from 'jest-mock';
import { TasksController } from './tasks.controller';
import { TASKS } from '../mocks/tasks.mock';

const moduleMocker = new ModuleMocker(global);

describe('TasksController', () => {
  let controller: TasksController;

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      controllers: [TasksController],
    })
      .useMocker((token) => {
        if (token === TasksService) {
          return {
            getTasks: jest.fn().mockResolvedValue(TASKS),
          };
        }
        if (typeof token === 'function') {
          const mockMetadata = moduleMocker.getMetadata(
            token
          ) as MockFunctionMetadata<any, any>;
          const Mock = moduleMocker.generateFromMetadata(mockMetadata);
          return new Mock();
        }
      })
      .compile();

    controller = moduleRef.get(TasksController);
  });

  describe('getTasks', () => {
    it('should get a list of tasks', async () => {
      const tasks = await controller.getTasks();

      expect(tasks[0].id).toBe('mockTask0');
      expect(tasks.length).toBe(3);
    });
  });
});
