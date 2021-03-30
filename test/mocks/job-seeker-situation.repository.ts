import {
  JobSeekerSituationId,
  JobSeekerSituation,
} from 'src/job-seeker/entities/job-seeker-situation.entity';
import { JobSeekerSituationNotFoundError } from 'src/job-seeker/errors/job-seeker-situation-not-found.error';
import { JobSeekerSituationRepository } from 'src/job-seeker/repositories/job-seeker-situation.repository';

export class MockJobSeekerSituationRepository
  implements JobSeekerSituationRepository {
  constructor(private readonly jobSeekerSituations: JobSeekerSituation[]) {}

  findById(id: JobSeekerSituationId): Promise<JobSeekerSituation> {
    const record = this.jobSeekerSituations.find(
      (situation) => situation.identifiant === id,
    );
    if (record) {
      return Promise.resolve(record);
    }
    return Promise.reject(new JobSeekerSituationNotFoundError(id));
  }
}
