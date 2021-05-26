import { HttpService } from '@nestjs/common';
import {
  JobSeekerSituationId,
  JobSeekerSituation,
} from 'src/job-seeker/entities/job-seeker-situation.entity';
import { JobSeekerSituationRepository } from 'src/job-seeker/repositories/job-seeker-situation.repository';

export class PoleEmploiJobSeekerSituationRepository
  implements JobSeekerSituationRepository {
  constructor(private readonly httpService: HttpService) {}

  findById(id: JobSeekerSituationId): Promise<JobSeekerSituation> {
    throw new Error('Method not implemented.');
  }
}
