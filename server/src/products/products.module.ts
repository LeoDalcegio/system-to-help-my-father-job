import { DatabaseModule } from './../database/database.module';
import { Module } from '@nestjs/common';
import { ProductsController } from './products.controller';
import { ProductsService } from './products.service';
import { productsProviders } from './products.providers';

@Module({
    imports: [DatabaseModule],
    controllers: [ProductsController],
    providers: [ProductsService, ...productsProviders],
    exports: [],
})
export class ProductsModule {}
