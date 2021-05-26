import {
  JobSeekerSituationId,
  JobSeekerSituation,
} from 'src/job-seeker/entities/job-seeker-situation.entity';

export interface JobSeekerSituationRepository {
  findById(id: JobSeekerSituationId): Promise<JobSeekerSituation>;
}

export const JOB_SEEKER_SITUATION_REPOSITORY_TOKEN = Symbol(
  'JobSeekerSituationRepository',
);
