import { NestFactory } from '@nestjs/core';
import * as dotenv from 'dotenv';
import { JobSeekerModule } from 'src/job-seeker/job-seeker.module';

dotenv.config();
const PORT = process.env.PORT || 3000;

async function bootstrap() {
  const app = await NestFactory.create(JobSeekerModule);
  await app.listen(PORT);
}
bootstrap();
