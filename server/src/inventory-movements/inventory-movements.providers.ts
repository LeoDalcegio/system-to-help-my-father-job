import { InventoryMovement } from './inventory-movement.entity';

export const inventoryMovementsProviders = [{ provide: 'InventoryMovementsRepository', useValue: InventoryMovement }];
