export type AirtableSituationDTO = {
  fields: {
    email: string;
    telephone: string;
    telephone2: string;
    localite: string;
    sexe: string;
    ligneVoie: string;
    ligneComplementDistribution: string;
    ligneComplementAdresse: string;
    ligneComplementDestinataire: string;
    codeCertificationCNAV: string;
    dateInscription: Date;
    identifiant: string;
    INSEECommune: string;
    civilite: string;
    ligneNom: string;
    codePostal: string;
    categorieInscription: string;
    nomUsage: string;
    dateNaissance: Date;
    nom: string;
    dateCessationInscription: Date;
    prenom: string;
  };
};

export type AirtableSituationListDTO = {
  records: AirtableSituationDTO[];
};
