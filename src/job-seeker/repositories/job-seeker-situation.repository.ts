import {
  JobSeekerSituationId,
  JobSeekerSituation,
} from 'src/job-seeker/entities/job-seeker-situation.entity';

export interface JobSeekerSituationRepository {
  findById(id: JobSeekerSituationId): Promise<JobSeekerSituation>;
}

export const jobSeekerSituationRepositoryProviderToken = Symbol();
