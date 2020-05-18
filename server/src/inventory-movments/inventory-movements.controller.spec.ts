import { Test, TestingModule } from '@nestjs/testing';
import { InventoryMovmentsController } from './inventory-movements.controller';

describe('InventoryMovments Controller', () => {
  let controller: InventoryMovmentsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [InventoryMovmentsController],
    }).compile();

    controller = module.get<InventoryMovmentsController>(InventoryMovmentsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
