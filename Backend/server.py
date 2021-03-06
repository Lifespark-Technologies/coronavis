#!/usr/bin/env python3
# -*- coding: utf-8 -*-
import logging
import os

from flask import Flask
from flask_compress import Compress
from flask_cors import CORS

from cache import cache
from db import db
from views import cases, divi, health, hospitals, osm, version

# add sentry integration




# Create Flask application
app = Flask(__name__)
app.url_map.strict_slashes = False

if os.environ.get('SENTRY_DSN') is not None:
    import sentry_sdk
    from sentry_sdk.integrations.flask import FlaskIntegration
    from sentry_sdk.integrations.sqlalchemy import SqlalchemyIntegration

    SENTRY_DSN = os.environ.get('SENTRY_DSN').replace('\n', '')
    VERSION = os.environ.get('VERSION').replace('\n', '')
    ENVIRONMENT = os.environ.get('ENVIRONMENT').replace('\n', '')
    sentry_sdk.init(
        environment=ENVIRONMENT,
        release=VERSION,
        dsn=SENTRY_DSN, 
        integrations=[FlaskIntegration(), SqlalchemyIntegration()])
else:
    app.logger.warning('No SENTRY_DSN environment variable set, will not report errors to sentry.io')


try:
    DB_HOST = os.environ.get('DB_HOST')
    DB_PORT = os.environ.get('DB_PORT')
    DB_USER = os.environ.get('DB_USER')
    DB_PASS = os.environ.get('DB_PASS')
    DB_NAME = os.environ.get('DB_NAME')

    if None in (DB_HOST, DB_PORT, DB_USER, DB_PASS, DB_NAME):
        raise KeyError
    else:
        # why? i don't know but its necessary
        DB_PASS = DB_PASS.replace('\n', '').replace('\r', '')
        DB_CONNECTION_STRING = f"postgresql://{DB_USER}:{DB_PASS}@{DB_HOST}:{DB_PORT}/{DB_NAME}"
    
except KeyError as e:
    app.logger.warning('One or multiple necessary environment variables not set, using config.py file as backup')
    #DB_CONNECTION_STRING = config.SQLALCHEMY_DATABASE_URI

app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
app.config['SQLALCHEMY_DATABASE_URI'] = DB_CONNECTION_STRING

db.init_app(app)
cache.init_app(app)

# register blueprints
app.register_blueprint(cases.routes)
app.register_blueprint(health.routes)
app.register_blueprint(hospitals.routes)
app.register_blueprint(osm.routes)
app.register_blueprint(version.routes)
app.register_blueprint(divi.routes)

# add cors and compress
CORS(app)
Compress(app)

if __name__ == "__main__":
    app.run(port=5000, debug=True)
