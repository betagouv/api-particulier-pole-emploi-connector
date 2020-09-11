from flask import current_app
import requests


def get_situation(id):
    (base_url, api_key) = _get_credentials()

    payload = {"filterByFormula": "{{identifiant}} = '{}'".format(id)}
    headers = {"Authorization": "Bearer {}".format(api_key)}

    r = requests.get("{}/Individus".format(base_url), params=payload, headers=headers)

    response_content = r.json()

    if len(response_content["records"]) == 0:
        return None

    record = response_content["records"][0]["fields"]

    return {
        "email": record.get("email"),
        "telephone": record.get("telephone"),
        "sexe": record.get("sexe"),
        "codeCertificationCNAV": record.get("codeCertificationCNAV"),
        "dateInscription": record.get("dateInscription"),
        "identifiant": record.get("identifiant"),
        "civilite": record.get("civilite"),
        "categorieInscription": record.get("categorieInscription"),
        "nomUsage": record.get("nomUsage"),
        "dateNaissance": record.get("dateNaissance"),
        "nom": record.get("nom"),
        "dateRadiation": record.get("dateRadiation"),
        "prenom": record.get("prenom"),
        "adresse": {
            "codePostal": record.get("codePostal"),
            "INSEECommune": record.get("INSEECommune"),
            "ligneVoie": record.get("ligneVoie"),
            "ligneNom": record.get("ligneNom"),
            "localite": record.get("localite"),
        },
    }


def _get_credentials():
    return (
        current_app.config["AIRTABLE_API_URL"],
        current_app.config["AIRTABLE_API_KEY"],
    )
