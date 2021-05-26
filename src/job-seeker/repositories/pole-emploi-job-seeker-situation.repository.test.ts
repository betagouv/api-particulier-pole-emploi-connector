import { PoleEmploiJobSeekerSituationRepository } from 'src/job-seeker/repositories/pole-emploi-job-seeker-situation.repository';
import { HttpService } from '@nestjs/common';
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import { JobSeekerSituationId } from 'src/job-seeker/entities/job-seeker-situation.entity';

describe('The PE repository', () => {
  it('calls the PE API to fetch jobseeker situation', async () => {
    const instance = axios.create();
    const mock = new MockAdapter(instance);
    const httpService = new HttpService(instance);
    const repository = new PoleEmploiJobSeekerSituationRepository(httpService);
    const expectedResponse = {
      adresse: {
        INSEECommune: '54225',
        codePostal: '54380',
        ligneNom: 'BELLO',
        ligneVoie: '2 RUE DE LA VAU RENARD',
        localite: '54380 GEZONCOURT',
      },
      categorieInscription: 'PERSONNE SANS EMPLOI NON DISPONIBLE IMMEDIATEMENT',
      civilite: 'MME',
      codeCertificationCNAV: 'VC',
      dateCessationInscription: '2021-08-21T00:00:00+02:00',
      dateInscription: '2021-03-15T00:00:00+01:00',
      dateNaissance: '1977-01-19T00:00:00+01:00',
      email: 'BELLOCAROLINE01@GMAIL.COM',
      nom: 'BELLO',
      prenom: 'CAROLINE',
      telephone: '0628687614',
    };

    mock
      .onGet(
        'https://api.emploi-store.fr/partenaire/statutaugmente/v1/statutAugmente',
      )
      .reply(200, expectedResponse);

    const response = await repository.findById(
      'Caroline1977' as JobSeekerSituationId,
    );

    expect(mock.history.get).toHaveLength(1);
    expect(response).toEqual({
      identifiant: 'Caroline1977',
      ...expectedResponse,
    });
  });
});
