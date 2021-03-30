import {
  JobSeekerId,
  JobSeekerSituation,
} from 'src/job-seeker/entities/job-seeker-situation.entity';

export interface JobSeekerSituationRepository {
  findById(id: JobSeekerId): Promise<JobSeekerSituation>;
}
