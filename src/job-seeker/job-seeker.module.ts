import { HttpModule, HttpService, Module } from '@nestjs/common';
import { TerminusModule } from '@nestjs/terminus';
import { HealthController } from 'src/job-seeker/health.controller';
import { JobSeekerController } from 'src/job-seeker/job-seeker.controller';
import { AirtableJobSeekerSituationRepository } from 'src/job-seeker/repositories/airtable-job-seeker-situation.repository';
import { jobSeekerSituationRepositoryProviderToken } from 'src/job-seeker/repositories/job-seeker-situation.repository';

@Module({
  imports: [HttpModule, TerminusModule],
  controllers: [JobSeekerController, HealthController],
  providers: [
    {
      provide: jobSeekerSituationRepositoryProviderToken,
      useFactory(httpService: HttpService) {
        return new AirtableJobSeekerSituationRepository(httpService);
      },
      inject: [HttpService],
    },
  ],
})
export class JobSeekerModule {}
