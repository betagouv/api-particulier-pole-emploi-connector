import { Controller, Get, Inject, Query } from '@nestjs/common';
import {
  JobSeekerSituationId,
  JobSeekerSituation,
} from 'src/job-seeker/entities/job-seeker-situation.entity';
import {
  JobSeekerSituationRepository,
  jobSeekerSituationRepositoryProviderToken,
} from 'src/job-seeker/repositories/job-seeker-situation.repository';

@Controller('v2/situations-pole-emploi')
export class JobSeekerController {
  constructor(
    @Inject(jobSeekerSituationRepositoryProviderToken)
    private readonly jobSeekerSituationRepository: JobSeekerSituationRepository,
  ) {}

  @Get()
  searchJobSeekerSituation(
    @Query('identifiant') id: JobSeekerSituationId,
  ): Promise<JobSeekerSituation> {
    return this.jobSeekerSituationRepository.findById(id);
  }
}
