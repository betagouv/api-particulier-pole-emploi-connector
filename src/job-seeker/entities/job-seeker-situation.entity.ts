import { Branded } from 'src/branded-types';

export type JobSeekerId = Branded<string, 'JobSeekerId'>;

export class Address {
  public readonly codePostal: string;
  public readonly INSEECommune: string;
  public readonly localite: string;
  public readonly ligneVoie: string;
  public readonly ligneComplementDestinaire: string;
  public readonly ligneComplementAdresse: string;
  public readonly ligneComplementDistribution: string;
  public readonly ligneNom: string;
}

export class JobSeekerSituation {
  public readonly identifiant: JobSeekerId;
  public readonly civilite: string;
  public readonly nom: string;
  public readonly nomUsage: string;
  public readonly prenom: string;
  public readonly sexe: string;
  public readonly dateNaissance: Date;
  public readonly codeCertificationCNAV: string;
  public readonly telephone: string;
  public readonly telephone2: string;
  public readonly email: string;
  public readonly adresse: Address;
  public readonly dateInscription: Date;
  public readonly dateCessationInscription: Date;
  public readonly categorieInscription: string;
}
