import { NestFactory } from '@nestjs/core';
import { AppModule } from 'src/app.module';

const PORT = (process.env.APP_PORT ?? 3000) as number;

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await app.listen(PORT);
  
  console.log(`Application is running on: ${await app.getUrl()} on port ${PORT}`);
}
bootstrap();
