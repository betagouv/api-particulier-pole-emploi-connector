import os


class Config(object):
    DEBUG = False
    TESTING = False
    AIRTABLE_API_KEY = os.environ.get("AIRTABLE_API_KEY")
    AIRTABLE_API_URL = os.environ.get("AIRTABLE_API_URL")


class DevConfig(Config):
    DEBUG = True


class ProductionConfig(Config):
    pass
