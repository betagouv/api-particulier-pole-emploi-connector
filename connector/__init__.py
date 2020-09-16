import os

from flask import Flask
from flask_restplus import Api


def create_app(config="connector.config.ProductionConfig"):
    app = Flask(__name__, instance_relative_config=True)
    app.config.from_mapping(SECRET_KEY="dev",)

    app.config.from_object(config)

    from . import controller

    api = Api(
        app=app,
        version="0.1",
        title="Connecteur Pôle Emploi",
        description="Connecteur utilisé par API Particulier pour fournir de la donnée Pôle Emploi",
    )
    api.add_namespace(controller.api)
    return app
