import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { BadRequestException, ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';


async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(
    new ValidationPipe({
      // whitelist: true,
      // transform: true,
      exceptionFactory: (err) => {
        const errors = err.map((error) => {
          return { property: error.property, constraints: error.constraints };
        });

        return new BadRequestException({
          alert: 'ERRORS!, please read carefully',
          error: errors,
        });
      },
    }),
  );

   //* Configuración de Swagger
  const swaggerConfig = new DocumentBuilder()
    .setTitle('Challenge - Work Space')
    .setDescription('Aplicación creada por Gaston Gonzalez para realizar el challenge de ingreso')
    .setVersion('1.0.0')
    .addBearerAuth()
    .build();

  const document = SwaggerModule.createDocument(app, swaggerConfig);
  SwaggerModule.setup('api', app, document);
  app.enableCors({ 
    origin: 'http://localhost:5173',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
  });
  
  await app.listen(3001);
}
bootstrap();
