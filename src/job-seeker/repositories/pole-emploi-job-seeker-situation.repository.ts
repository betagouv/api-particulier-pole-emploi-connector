import { HttpService } from '@nestjs/common';
import { PoleEmploiSituationDTO } from 'src/job-seeker/dtos/pole-emploi-situation.dto';
import {
  JobSeekerSituationId,
  JobSeekerSituation,
} from 'src/job-seeker/entities/job-seeker-situation.entity';
import { JobSeekerSituationRepository } from 'src/job-seeker/repositories/job-seeker-situation.repository';

export class PoleEmploiJobSeekerSituationRepository
  implements JobSeekerSituationRepository {
  constructor(private readonly httpService: HttpService) {}

  async findById(id: JobSeekerSituationId): Promise<JobSeekerSituation> {
    const { data } = await this.httpService
      .get<PoleEmploiSituationDTO>(
        'https://api.emploi-store.fr/partenaire/statutaugmente/v1/statutAugmente',
      )
      .toPromise();
    return {
      identifiant: id as JobSeekerSituationId,
      ...data,
    };
  }
}
