from flask_restplus import Resource
from connector.model import SituationModel, parser
import connector.airtable_client as client

api = SituationModel.api
_situation = SituationModel.situation


@api.route("")
@api.response(404, "Individu introuvable")
class Situation(Resource):
    @api.doc("get_situation")
    @api.expect(parser)
    @api.marshal_with(_situation)
    def get(self):
        args = parser.parse_args()
        situation = client.get_situation(args["identifiant"])

        if not situation:
            api.abort(404, "Individu introuvable")

        return situation
