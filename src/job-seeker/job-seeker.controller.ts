import { Controller, Get, Inject, Query, UseFilters } from '@nestjs/common';
import {
  JobSeekerSituationId,
  JobSeekerSituation,
} from 'src/job-seeker/entities/job-seeker-situation.entity';
import { JobSeekerSituationNotFoundErrorFilter } from 'src/job-seeker/filters/job-seeker-situation-not-found.filter';
import { GatewayErrorFilter } from 'src/job-seeker/filters/gateway-error.filter';
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
  @UseFilters(JobSeekerSituationNotFoundErrorFilter)
  @UseFilters(GatewayErrorFilter)
  searchJobSeekerSituation(
    @Query('identifiant') id: JobSeekerSituationId,
  ): Promise<JobSeekerSituation> {
    return this.jobSeekerSituationRepository.findById(id);
  }
}
