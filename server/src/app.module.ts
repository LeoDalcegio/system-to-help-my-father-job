import { Module } from '@nestjs/common';
import { UsersModule } from './users/users.module';
import { SharedModule } from './shared/shared.module';
import { InventoryMovementsModule } from './inventory-movements/inventory-movements.module';
import { ClientsModule } from './clients/clients.module';
import { ProductsModule } from './products/products.module';

@Module({
    imports: [UsersModule, SharedModule, InventoryMovementsModule, ClientsModule, ProductsModule],
    controllers: [],
    providers: [],
})
export class AppModule {}
