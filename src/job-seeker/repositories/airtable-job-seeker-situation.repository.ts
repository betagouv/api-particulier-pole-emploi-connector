import { HttpService } from '@nestjs/common';
import {
  Address,
  JobSeekerSituation,
  JobSeekerSituationId,
} from 'src/job-seeker/entities/job-seeker-situation.entity';
import { JobSeekerSituationRepository } from 'src/job-seeker/repositories/job-seeker-situation.repository';
import { AirtableSituationListDTO } from 'src/job-seeker/dtos/airtable-situation.dto';
import { JobSeekerSituationNotFoundError } from 'src/job-seeker/errors/job-seeker-situation-not-found.error';

export class AirtableJobSeekerSituationRepository
  implements JobSeekerSituationRepository {
  constructor(private readonly httpService: HttpService) {}

  async findById(id: JobSeekerSituationId): Promise<JobSeekerSituation> {
    const {
      data: { records },
    } = await this.httpService
      .get<AirtableSituationListDTO>(
        `${process.env.AIRTABLE_API_URL}/Individus`,
        {
          headers: {
            Authorization: `Bearer ${process.env.AIRTABLE_API_KEY}`,
          },
          params: {
            filterByFormula: `{identifiant} = '${id}'`,
          },
        },
      )
      .toPromise();

    if (records.length === 0) {
      throw new JobSeekerSituationNotFoundError(id);
    }

    const fields = records[0].fields;

    const address = new Address(
      fields.codePostal,
      fields.INSEECommune,
      fields.localite,
      fields.ligneVoie,
      fields.ligneComplementDestinataire,
      fields.ligneComplementAdresse,
      fields.ligneComplementDistribution,
      fields.ligneNom,
    );

    return new JobSeekerSituation(
      fields.identifiant as JobSeekerSituationId,
      fields.civilite,
      fields.nom,
      fields.nomUsage,
      fields.prenom,
      fields.sexe,
      new Date(fields.dateNaissance),
      fields.codeCertificationCNAV,
      fields.telephone,
      fields.telephone2,
      fields.email,
      address,
      new Date(fields.dateInscription),
      new Date(fields.dateCessationInscription),
      fields.codeCategorieInscription,
      fields.libelleCategorieInscription,
    );
  }
}
