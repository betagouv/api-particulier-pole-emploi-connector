import { HttpModule, HttpService, Module } from '@nestjs/common';
import { TerminusModule } from '@nestjs/terminus';
import { HealthController } from 'src/job-seeker/health.controller';
import { JobSeekerController } from 'src/job-seeker/job-seeker.controller';
import { AirtableJobSeekerSituationRepository } from 'src/job-seeker/repositories/airtable-job-seeker-situation.repository';
import { JOB_SEEKER_SITUATION_REPOSITORY_TOKEN } from 'src/job-seeker/repositories/job-seeker-situation.repository';
import { PoleEmploiJobSeekerSituationRepository } from 'src/job-seeker/repositories/pole-emploi-job-seeker-situation.repository';
import axios from 'axios';
import * as oauth from 'axios-oauth-client';
import * as tokenProvider from 'axios-token-interceptor';
import { AXIOS_INSTANCE_TOKEN } from '@nestjs/common/http/http.constants';

@Module({
  imports: [HttpModule, TerminusModule],
  controllers: [JobSeekerController, HealthController],
  providers: [
    {
      provide: JOB_SEEKER_SITUATION_REPOSITORY_TOKEN,
      useFactory(httpService: HttpService) {
        return process.env.MOCK_PROVIDER === 'false'
          ? new PoleEmploiJobSeekerSituationRepository(httpService)
          : new AirtableJobSeekerSituationRepository(httpService);
      },
      inject: [HttpService],
    },
    {
      provide: AXIOS_INSTANCE_TOKEN,
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

          const instance = axios.create();
          instance.interceptors.request.use(
            oauth.interceptor(tokenProvider, getClientCredentials),
          );

          return instance;
        }

        return axios.create();
      },
    },
  ],
})
export class JobSeekerModule {}
