import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { HeaderMiddleware } from './header';



async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe()); 
  app.enableCors();
  app.use(HeaderMiddleware);
  // app.use((cors<cors.CorsRequest>({
  //   origin: 'https://auth-api-wn9m.onrender.com/',
  //   credentials: true,
  // })));
  await app.listen(3000);
}
bootstrap();
