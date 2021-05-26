import * as dotenv from 'dotenv';
import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { JobSeekerModule } from 'src/job-seeker/job-seeker.module';

dotenv.config();

describe('Pole Emploi connector', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [JobSeekerModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('returns 404 error when situation is not found', () => {
    return request(app.getHttpServer())
      .get('/v2/situations-pole-emploi')
      .query({ identifiant: 'existepas' })
      .expect(404)
      .expect({
        statusCode: 404,
        message:
          "Impossible de trouver la situation pôle emploi correspondant à l'identifiant existepas",
      });
  });
});
