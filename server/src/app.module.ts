import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ProductsModule } from './product/product.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
      ProductsModule,
      TypeOrmModule.forRoot({
          type: 'sqlite',
          database: 'db',
          entities: [__dirname + '/**/*.entity{.ts,.js}'],
          synchronize: true
      }),
      UserModule,
      AuthModule
    ],
    controllers: [AppController],
    providers: [AppService],
})
export class AppModule {}
