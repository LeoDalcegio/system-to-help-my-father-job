import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ProductsModule } from './products/products.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { ClientModule } from './clients/clients.module';

@Module({
  imports: [
      ProductsModule,
      TypeOrmModule.forRoot({
          type: 'sqlite',
          database: 'db',
          entities: [__dirname + '/**/*.entity{.ts,.js}'],
          synchronize: true
      }),
      UsersModule,
      AuthModule,
      ClientModule
    ],
    controllers: [AppController],
    providers: [AppService],
})
export class AppModule {}
