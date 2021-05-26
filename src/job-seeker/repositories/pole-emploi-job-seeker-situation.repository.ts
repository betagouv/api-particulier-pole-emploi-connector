import { HttpException, HttpService } from '@nestjs/common';
import { PoleEmploiSituationDTO } from 'src/job-seeker/dtos/pole-emploi-situation.dto';
import {
  JobSeekerSituationId,
  JobSeekerSituation,
} from 'src/job-seeker/entities/job-seeker-situation.entity';
import { JobSeekerSituationNotFoundError } from 'src/job-seeker/errors/job-seeker-situation-not-found.error';
import { JobSeekerSituationRepository } from 'src/job-seeker/repositories/job-seeker-situation.repository';

export class PoleEmploiJobSeekerSituationRepository
  implements JobSeekerSituationRepository {
  constructor(private readonly httpService: HttpService) {}

  async findById(id: JobSeekerSituationId): Promise<JobSeekerSituation> {
    try {
      const { data } = await this.httpService
        .post<PoleEmploiSituationDTO>(process.env.POLE_EMPLOI_API_URL, id)
        .toPromise();
      return {
        identifiant: id as JobSeekerSituationId,
        ...data,
      };
    } catch (err) {
      if (err.response.status === 404) {
        throw new JobSeekerSituationNotFoundError(id);
      }
      throw new HttpException(err.response, err.response.status);
    }
  }
}
