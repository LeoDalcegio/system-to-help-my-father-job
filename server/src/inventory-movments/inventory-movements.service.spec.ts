import { Test, TestingModule } from '@nestjs/testing';
import { InventoryMovmentsService } from './inventory-movements.service';

describe('InventoryMovmentsService', () => {
  let service: InventoryMovmentsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [InventoryMovmentsService],
    }).compile();

    service = module.get<InventoryMovmentsService>(InventoryMovmentsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
