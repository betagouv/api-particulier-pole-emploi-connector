import { Module } from '@nestjs/common';
import { JobSeekerController } from 'src/job-seeker/job-seeker.controller';
import { jobSeekerSituationRepositoryProviderToken } from 'src/job-seeker/repositories/job-seeker-situation.repository';

@Module({
  controllers: [JobSeekerController],
  providers: [
    {
      provide: jobSeekerSituationRepositoryProviderToken,
      useFactory() {
        return;
      },
    },
  ],
})
export class JobSeekerModule {}
