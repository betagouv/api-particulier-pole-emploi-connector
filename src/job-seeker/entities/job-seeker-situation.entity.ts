import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Branded } from 'src/branded-types';

export type JobSeekerSituationId = Branded<string, 'JobSeekerId'>;

export class Address {
  @ApiPropertyOptional()
  public readonly codePostal: string;
  @ApiPropertyOptional()
  public readonly INSEECommune: string;
  @ApiPropertyOptional()
  public readonly localite: string;
  @ApiPropertyOptional()
  public readonly ligneVoie: string;
  @ApiPropertyOptional()
  public readonly ligneComplementDestinataire: string;
  @ApiPropertyOptional()
  public readonly ligneComplementAdresse: string;
  @ApiPropertyOptional()
  public readonly ligneComplementDistribution: string;
  @ApiPropertyOptional()
  public readonly ligneNom: string;

  constructor(
    codePostal: string,
    INSEECommune: string,
    localite: string,
    ligneVoie: string,
    ligneComplementDestinataire: string,
    ligneComplementAdresse: string,
    ligneComplementDistribution: string,
    ligneNom: string,
  ) {
    this.codePostal = codePostal;
    this.INSEECommune = INSEECommune;
    this.localite = localite;
    this.ligneVoie = ligneVoie;
    this.ligneComplementDestinataire = ligneComplementDestinataire;
    this.ligneComplementAdresse = ligneComplementAdresse;
    this.ligneComplementDistribution = ligneComplementDistribution;
    this.ligneNom = ligneNom;
  }
}

export class JobSeekerSituation {
  @ApiProperty()
  public readonly identifiant: JobSeekerSituationId;
  @ApiPropertyOptional()
  public readonly civilite: string;
  @ApiPropertyOptional()
  public readonly nom: string;
  @ApiPropertyOptional()
  public readonly nomUsage: string;
  @ApiPropertyOptional()
  public readonly prenom: string;
  @ApiPropertyOptional()
  public readonly sexe: string;
  @ApiPropertyOptional()
  public readonly dateNaissance: Date;
  @ApiPropertyOptional()
  public readonly codeCertificationCNAV: string;
  @ApiPropertyOptional()
  public readonly telephone: string;
  @ApiPropertyOptional()
  public readonly telephone2: string;
  @ApiPropertyOptional()
  public readonly email: string;
  @ApiProperty()
  public readonly adresse: Address;
  @ApiPropertyOptional()
  public readonly dateInscription: Date;
  @ApiPropertyOptional()
  public readonly dateCessationInscription: Date;
  @ApiPropertyOptional()
  public readonly categorieInscription: string;

  constructor(
    identifiant: JobSeekerSituationId,
    civilite: string,
    nom: string,
    nomUsage: string,
    prenom: string,
    sexe: string,
    dateNaissance: Date,
    codeCertificationCNAV: string,
    telephone: string,
    telephone2: string,
    email: string,
    adresse: Address,
    dateInscription: Date,
    dateCessationInscription: Date,
    categorieInscription: string,
  ) {
    this.identifiant = identifiant;
    this.civilite = civilite;
    this.nom = nom;
    this.nomUsage = nomUsage;
    this.prenom = prenom;
    this.sexe = sexe;
    this.dateNaissance = dateNaissance;
    this.codeCertificationCNAV = codeCertificationCNAV;
    this.telephone = telephone;
    this.telephone2 = telephone2;
    this.email = email;
    this.adresse = adresse;
    this.dateInscription = dateInscription;
    this.dateCessationInscription = dateCessationInscription;
    this.categorieInscription = categorieInscription;
  }
}
