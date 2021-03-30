import { HttpModule, HttpService, Module } from '@nestjs/common';
import { JobSeekerController } from 'src/job-seeker/job-seeker.controller';
import { AirtableJobSeekerSituationRepository } from 'src/job-seeker/repositories/airtable-job-seeker-situation.repository';
import { jobSeekerSituationRepositoryProviderToken } from 'src/job-seeker/repositories/job-seeker-situation.repository';

@Module({
  imports: [HttpModule],
  controllers: [JobSeekerController],
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
