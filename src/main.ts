import { NestFactory } from '@nestjs/core';
import { AppModule } from 'src/app.module';

const PORT = (process.env.APP_PORT ?? 3000) as number;

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await app.listen(PORT);
}
bootstrap().then(() => console.info(`Server started on port ${PORT}...`));
