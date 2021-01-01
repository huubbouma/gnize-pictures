"""
    config.py
    - settings for the flask application object
"""

class BaseConfig(object):
    DEBUG = True
    ANONYMOUS_ACCESS = False
    SECRET_KEY = 'ninahagenisdood'
    SQLALCHEMY_DATABASE_URI = 'sqlite:///mediaserver.db'
    SQLALCHEMY_TRACK_MODIFICATIONS = False
    TOKEN_EXPIRATION_TIME_MINUTES = 60 * 24
    MEDIASERVER_ROOT_PATH = '/home/huub/Desktop/av/media/'
    MEDIASERVER_CACHED_PATH = '/home/huub/Desktop/av/cache/'
