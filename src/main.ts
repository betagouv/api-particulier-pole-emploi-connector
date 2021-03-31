import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import * as dotenv from 'dotenv';
import { JobSeekerModule } from 'src/job-seeker/job-seeker.module';

dotenv.config();
const PORT = process.env.PORT || 3000;

async function bootstrap() {
  const app = await NestFactory.create(JobSeekerModule, {
    cors: { origin: /api\.gouv\.fr$/ },
  });

  const config = new DocumentBuilder()
    .setTitle('Connecteur Pôle Emploi')
    .setDescription(
      'Connecteur API Particulier servant les données de Pôle Emploi',
    )
    .setVersion('0.1')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('swagger', app, document);

  await app.listen(PORT);
}
bootstrap();
