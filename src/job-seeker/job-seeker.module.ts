import { HttpService, Module } from '@nestjs/common';
import { TerminusModule } from '@nestjs/terminus';
import { HealthController } from 'src/job-seeker/health.controller';
import { JobSeekerController } from 'src/job-seeker/job-seeker.controller';
import { AirtableJobSeekerSituationRepository } from 'src/job-seeker/repositories/airtable-job-seeker-situation.repository';
import { JOB_SEEKER_SITUATION_REPOSITORY_TOKEN } from 'src/job-seeker/repositories/job-seeker-situation.repository';
import { PoleEmploiJobSeekerSituationRepository } from 'src/job-seeker/repositories/pole-emploi-job-seeker-situation.repository';
import axios from 'axios';
import * as oauth from 'axios-oauth-client';
import * as tokenProvider from 'axios-token-interceptor';

@Module({
  imports: [TerminusModule],
  controllers: [JobSeekerController, HealthController],
  providers: [
    {
      provide: JOB_SEEKER_SITUATION_REPOSITORY_TOKEN,
      useFactory() {
        if (process.env.MOCK_PROVIDER === 'false') {
          const getClientCredentials = oauth.client(axios.create(), {
            url:
              'https://entreprise.pole-emploi.fr/connexion/oauth2/access_token?realm=%2Fpartenaire',
            grant_type: 'client_credentials',
            client_id: process.env.POLE_EMPLOI_CLIENT_ID,
            client_secret: process.env.POLE_EMPLOI_CLIENT_SECRET,
            scope: process.env.POLE_EMPLOI_SCOPES,
          });

          const axiosInstance = axios.create();
          axiosInstance.interceptors.request.use(
            oauth.interceptor(tokenProvider, getClientCredentials),
          );

          return new PoleEmploiJobSeekerSituationRepository(
            new HttpService(axiosInstance),
          );
        }
        return new AirtableJobSeekerSituationRepository(new HttpService());
      },
    },
  ],
})
export class JobSeekerModule {}
