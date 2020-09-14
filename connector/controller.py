from flask import Blueprint, request, current_app, jsonify
import connector.airtable_client as client

bp = Blueprint(
    "Recherche situation individu", __name__, url_prefix="/situations-individu"
)


@bp.route("/<id>", methods=("GET",))
def get_situation(id=None):
    if not id:
        return "Identifiant manquant", 422

    situation = client.get_situation(id)

    if not situation:
        return "Identifiant introuvable", 404

    return jsonify(situation)
