from flask_restplus import Resource
from connector.model import SituationModel
import connector.airtable_client as client

api = SituationModel.api
_situation = SituationModel.situation


@api.route("/<string:identifiant>")
@api.param("identifiant", "Identifiant Pôle Emploi d'un individu")
@api.response(404, "Individu introuvable")
class Situation(Resource):
    @api.doc("get_situation")
    @api.marshal_with(_situation)
    def get(self, identifiant):
        situation = client.get_situation(identifiant)

        if not situation:
            api.abort(404, "Individu introuvable")

        return situation
