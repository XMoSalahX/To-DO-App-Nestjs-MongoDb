import { Test, TestingModule } from '@nestjs/testing';
import { TodosstatusController } from './todosstatus.controller';
import { TodosstatusService } from './todosstatus.service';

describe('TodosstatusController', () => {
  let controller: TodosstatusController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TodosstatusController],
      providers: [TodosstatusService],
    }).compile();

    controller = module.get<TodosstatusController>(TodosstatusController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
