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
        civilite: data.civilite,
        nom: data.nom,
        nomUsage: data.nomUsage,
        prenom: data.prenom,
        sexe: data.sexe,
        dateNaissance: data.dateNaissance,
        codeCertificationCNAV: data.codeCertificationCNAV,
        telephone: data.telephone,
        telephone2: data.telephone2,
        email: data.email,
        adresse: data.adresse,
        dateInscription: data.dateInscription,
        dateCessationInscription: data.dateCessationInscription,
        codeCategorieInscription: data.categorieInscription
          ? parseInt(data.categorieInscription)
          : undefined,
        libelleCategorieInscription: data.libellecategorieInscription,
      };
    } catch (err) {
      if (err.response.status === 404) {
        throw new JobSeekerSituationNotFoundError(id);
      }
      throw new HttpException(err.response, err.response.status);
    }
  }
}
