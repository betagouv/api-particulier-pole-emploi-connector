import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { JobSeekerModule } from 'src/job-seeker/job-seeker.module';
import {
  Address,
  JobSeekerSituation,
  JobSeekerSituationId,
} from 'src/job-seeker/entities/job-seeker-situation.entity';
import { jobSeekerSituationRepositoryProviderToken } from 'src/job-seeker/repositories/job-seeker-situation.repository';
import { MockJobSeekerSituationRepository } from 'test/mocks/job-seeker-situation.repository';

describe('AppController (e2e)', () => {
  let app: INestApplication;
  const georgesId = 'moustaki' as JobSeekerSituationId;
  const georgesAddress = new Address(
    '59130',
    '59328',
    '59130 LAMBERSART',
    '66 AVENUE DES AUBEPINES',
    null,
    null,
    null,
    'BELLO',
  );
  const georges = new JobSeekerSituation(
    georgesId,
    'M.',
    'Moustaki',
    'Moustaki',
    'Georges',
    'M',
    new Date('1977-01-19T00:00:00+01:00'),
    'VC',
    '0628687614',
    null,
    'georges@moustaki.com',
    georgesAddress,
    new Date('2018-09-10T00:00:00+02:00'),
    null,
    'PERSONNE SANS EMPLOI DISPONIBLE DUREE INDETERMINEE PLEIN TPS',
  );

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [JobSeekerModule],
    })
      .overrideProvider(jobSeekerSituationRepositoryProviderToken)
      .useValue(new MockJobSeekerSituationRepository([georges]))
      .compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('returns georges situation', () => {
    return request(app.getHttpServer())
      .get('/v2/situations-pole-emploi')
      .query({ identifiant: 'moustaki' })
      .expect(200)
      .expect(JSON.parse(JSON.stringify(georges)));
  });
});
