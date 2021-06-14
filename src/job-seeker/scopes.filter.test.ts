import {
  JobSeekerSituation,
  JobSeekerSituationId,
} from 'src/job-seeker/entities/job-seeker-situation.entity';
import { ScopesFilter } from 'src/job-seeker/scopes.filter';

describe('The scopes filters', () => {
  it('filters the provided payload', () => {
    const filter = new ScopesFilter();
    const unfilteredData: JobSeekerSituation = {
      identifiant: 'croute' as JobSeekerSituationId,
      adresse: {
        INSEECommune: '54225',
        codePostal: '54380',
        ligneNom: 'BELLO',
        ligneVoie: '2 RUE DE LA VAU RENARD',
        localite: '54380 GEZONCOURT',
      },
      codeCategorieInscription: 1,
      libelleCategorieInscription:
        'PERSONNE SANS EMPLOI NON DISPONIBLE IMMEDIATEMENT',
      civilite: 'MME',
      codeCertificationCNAV: 'VC',
      dateCessationInscription: new Date('2021-08-21T00:00:00+02:00'),
      dateInscription: new Date('2021-03-15T00:00:00+01:00'),
      dateNaissance: new Date('1977-01-19T00:00:00+01:00'),
      email: 'BELLOCAROLINE01@GMAIL.COM',
      nom: 'BELLO',
      prenom: 'CAROLINE',
      telephone: '0628687614',
    };

    const filteredData = filter.filter(
      ['pole_emploi_inscription'],
      unfilteredData,
    );

    expect(filteredData).toEqual({
      codeCategorieInscription: 1,
      libelleCategorieInscription:
        'PERSONNE SANS EMPLOI NON DISPONIBLE IMMEDIATEMENT',
      codeCertificationCNAV: 'VC',
      dateCessationInscription: new Date('2021-08-20T22:00:00.000Z'),
      dateInscription: new Date('2021-03-14T23:00:00.000Z'),
    });
  });
});
