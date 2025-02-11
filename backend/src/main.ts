import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { StoreMiddleware } from './middleware/store-middleware';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // تمكين Middleware لتوجيه الطلبات إلى المتاجر الصحيحة
  app.use(StoreMiddleware);

  await app.listen(3000);
}
bootstrap();
