import { Test, TestingModule } from '@nestjs/testing';
import { GatewayTimeoutException, INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { JobSeekerModule } from 'src/job-seeker/job-seeker.module';
import {
  Address,
  JobSeekerSituation,
  JobSeekerSituationId,
} from 'src/job-seeker/entities/job-seeker-situation.entity';
import { JOB_SEEKER_SITUATION_REPOSITORY_TOKEN } from 'src/job-seeker/repositories/job-seeker-situation.repository';
import { JobSeekerSituationNotFoundError } from 'src/job-seeker/errors/job-seeker-situation-not-found.error';

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

  const jobSeekerSituationRepositoryMock = {
    findById: jest.fn(),
  };

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [JobSeekerModule],
    })
      .overrideProvider(JOB_SEEKER_SITUATION_REPOSITORY_TOKEN)
      .useValue(jobSeekerSituationRepositoryMock)
      .compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('returns georges situation', () => {
    jobSeekerSituationRepositoryMock.findById.mockResolvedValue(georges);

    return request(app.getHttpServer())
      .get('/v2/situations-pole-emploi')
      .query({ identifiant: 'moustaki' })
      .set({
        'X-Application-Scopes':
          'pole_emploi_identite,pole_emploi_contact,pole_emploi_adresse,pole_emploi_inscription',
      })
      .expect(200)
      .expect(JSON.parse(JSON.stringify(georges)));
  });

  it('returns 404 error when situation is not found', () => {
    jobSeekerSituationRepositoryMock.findById.mockRejectedValue(
      new JobSeekerSituationNotFoundError('croute' as JobSeekerSituationId),
    );

    return request(app.getHttpServer())
      .get('/v2/situations-pole-emploi')
      .query({ identifiant: 'croute' })
      .set({
        'X-Application-Scopes':
          'pole_emploi_identite,pole_emploi_contact,pole_emploi_adresse,pole_emploi_inscription',
      })
      .expect(404)
      .expect({
        statusCode: 404,
        message:
          "Impossible de trouver la situation pôle emploi correspondant à l'identifiant croute",
      });
  });

  it('returns a 502 on other errors', () => {
    jobSeekerSituationRepositoryMock.findById.mockRejectedValue(
      new GatewayTimeoutException(),
    );

    return request(app.getHttpServer())
      .get('/v2/situations-pole-emploi')
      .query({ identifiant: 'croute' })
      .set({
        'X-Application-Scopes':
          'pole_emploi_identite,pole_emploi_contact,pole_emploi_adresse,pole_emploi_inscription',
      })
      .expect(502)
      .expect({
        statusCode: 502,
        message: 'Erreur en provenance des services Pôle Emploi',
        error: 'Gateway Timeout',
      });
  });
});
