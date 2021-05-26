import { PoleEmploiJobSeekerSituationRepository } from 'src/job-seeker/repositories/pole-emploi-job-seeker-situation.repository';
import { HttpService } from '@nestjs/common';

describe('The PE repository', () => {
  it('calls the PE API to fetch jobseeker situation', () => {
    const httpService = new HttpService();
    const repository = new PoleEmploiJobSeekerSituationRepository(httpService);
  });
});
