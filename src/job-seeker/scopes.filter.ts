import { JobSeekerSituation } from 'src/job-seeker/entities/job-seeker-situation.entity';
import * as _ from 'lodash';

export type Scope =
  | 'pole_emploi_identite'
  | 'pole_emploi_contact'
  | 'pole_emploi_adresse'
  | 'pole_emploi_inscription';

export type ScopesConfiguration = Record<Scope, (keyof JobSeekerSituation)[]>;

const scopesConfiguration: ScopesConfiguration = {
  pole_emploi_identite: ['identifiant'],
  pole_emploi_adresse: ['adresse'],
  pole_emploi_contact: ['dateNaissance'],
  pole_emploi_inscription: ['dateInscription', 'dateCessationInscription'],
};

export class ScopesFilter {
  filter(scopes: Scope[], response: JobSeekerSituation) {
    const maskedProperties = _(
      scopes.map((scope) => scopesConfiguration[scope]),
    )
      .flatten()
      .uniq()
      .value();
    return Object.keys(response).reduce((result, key) => {
      if (!maskedProperties.includes(key as keyof JobSeekerSituation)) {
        return result;
      }
      return { ...result, [key]: response[key] };
    }, {});
  }
}
