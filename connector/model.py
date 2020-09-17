from flask_restplus import Namespace, fields, Model


class SituationModel:
    api = Namespace(
        "Pôle Emploi",
        description="Situation Pôle Emploi d'un individu",
        path="/v2/situations-pole-emploi",
    )
    situation = api.model(
        "SituationPôleEmploi",
        {
            "email": fields.String(
                description="L’adresse mail", example="georges@moustaki.fr"
            ),
            "nom": fields.String(
                required=True, description="Le nom de naissance", example="Moustaki"
            ),
            "nomUsage": fields.String(description="Le nom d'usage", example="Moustaki"),
            "prenom": fields.String(
                required=True, description="Le prénom", example="Georges", max_length=13
            ),
            "identifiant": fields.String(
                required=True,
                description="Identifiant Pôle Emploi d'un individu",
                example="georges_moustaki_77",
            ),
            "sexe": fields.String(required=True, description="Le sexe", example="M"),
            "dateNaissance": fields.DateTime(
                required=True,
                description="La date de naissance",
                example="1992-11-29T00:00:00",
            ),
            "dateInscription": fields.DateTime(
                description="Date inscription", example="2019-08-09T00:00:00",
            ),
            "dateRadiation": fields.DateTime(
                description="Date de radiation/cessation d'inscription",
                example="2019-08-09T00:00:00",
            ),
            "dateProchaineConvocation": fields.DateTime(
                description="Date et heure de la prochaine convocation",
                example="2020-08-09T00:00:00",
            ),
            "categorieInscription": fields.String(
                description="Code de la catégorie ", example="3",
            ),
            "codeCertificationCNAV": fields.String(
                required=True,
                description='Le statut de certification d’identité (un code ex : "VC" qui correspond à Identité certifiée)',
                example="VC",
            ),
            "telephone": fields.String(
                description="Le téléphone 1", example="0656585656"
            ),
            "telephone2": fields.String(
                description="Le téléphone 2", example="0656585657"
            ),
            "civilite": fields.String(
                required=True, description="La civilité", example="M."
            ),
            "adresse": fields.Nested(
                api.model(
                    "Adresse",
                    {
                        "codePostal": fields.String(
                            attribute="codePostal",
                            description="Le code postal",
                            example="29980",
                        ),
                        "INSEECommune": fields.String(
                            attribute="INSEECommune",
                            description="Le code commune",
                            example="29085",
                        ),
                        "localite": fields.String(
                            attribute="localite",
                            description="La localité",
                            example="29980 ILE TUDY",
                        ),
                        "ligneVoie": fields.String(
                            attribute="ligneVoie",
                            description="La voie",
                            example="3 rue des Huttes",
                        ),
                        "ligneComplementDestinataire": fields.String(
                            attribute="ligneComplementDestinataire",
                            description="Le complément destinataire",
                        ),
                        "ligneComplementAdresse": fields.String(
                            attribute="ligneComplementAdresse",
                            description="Le complément d’adresse",
                        ),
                        "ligneComplementDistribution": fields.String(
                            attribute="ligneComplementDistribution",
                            description="Le complément de distribution",
                        ),
                        "ligneNom": fields.String(
                            attribute="ligneNom",
                            description="Le nom du destinataire",
                            example="Moustaki",
                        ),
                    },
                )
            ),
        },
    )
