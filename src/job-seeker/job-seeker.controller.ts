import { Controller, Get, Query } from '@nestjs/common';
import {
  JobSeekerId,
  JobSeekerSituation,
} from 'src/job-seeker/entities/job-seeker-situation.entity';
import { JobSeekerSituationRepository } from 'src/job-seeker/repositories/job-seeker-situation.repository';

@Controller('v2/situations-pole-emploi')
export class JobSeekerController {
  constructor(
    private readonly jobSeekerSituationRepository: JobSeekerSituationRepository,
  ) {}

  @Get()
  searchJobSeekerSituation(
    @Query('identifiant') id: JobSeekerId,
  ): Promise<JobSeekerSituation> {
    return this.jobSeekerSituationRepository.findById(id);
  }
}
