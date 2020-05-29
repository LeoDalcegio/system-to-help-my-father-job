import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { setupSwagger } from './swagger';
import helmet from 'helmet';

async function bootstrap() {
    const PORT = 3000 || process.env.PORT;

    const app = await NestFactory.create(AppModule);

    app.useGlobalPipes(new ValidationPipe());

    app.use(helmet());

    app.enableCors();

    setupSwagger(app);

    await app.listen(PORT);
}

bootstrap();
