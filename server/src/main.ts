import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { setupSwagger } from './swagger';

async function bootstrap() {
    const app = await NestFactory.create(AppModule);

    const PORT = 3000;// || process.env.PORT;

    app.useGlobalPipes(new ValidationPipe());

    app.enableCors();

    setupSwagger(app);

    await app.listen(PORT);
}

bootstrap();
