import { JobSeekerSituationId } from 'src/job-seeker/entities/job-seeker-situation.entity';

export class JobSeekerSituationNotFoundError extends Error {
  constructor(jobSeekerSituationId: JobSeekerSituationId) {
    super(
      `Impossible de trouver la situation pôle emploi correspondant à l'identifiant ${jobSeekerSituationId}`,
    );
    this.name = 'JobSeekerSituationNotFoundError';
  }
}
