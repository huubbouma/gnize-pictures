"""
models.py
- Data classes for the surveyapi application
"""

from datetime import datetime
from flask_sqlalchemy import SQLAlchemy

from werkzeug.security import generate_password_hash, check_password_hash

db = SQLAlchemy()


ACCESS = {
    'guest': 0,
    'user': 1,
    'admin': 2
}
ACCESS_LOOKUP = dict([(value, key) for key, value in ACCESS.items()])



class User(db.Model):
    __tablename__ = 'users'

    id = db.Column(db.Integer, primary_key=True)
    email = db.Column(db.String(120), unique=True, nullable=False)
    password = db.Column(db.String(255), nullable=False)
    access = db.Column(db.Integer, nullable=False)

    def __init__(self, email, password, access=ACCESS['guest']):
        self.email = email
        self.password = generate_password_hash(password, method='sha256')
        self.access = access

    def is_admin(self):
        return self.access == ACCESS['admin']
    
    def allowed(self, access_level):
        return self.access >= access_level

    @property
    def access_str(self):
        return ACCESS_LOOKUP[self.access]

    @classmethod
    def authenticate(cls, **kwargs):
        email = kwargs.get('email')
        password = kwargs.get('password')
        
        if not email or not password:
            return None

        user = cls.query.filter_by(email=email).first()
        if not user or not check_password_hash(user.password, password):
            return None

        return user

    def to_dict(self):
        return dict(id=self.id, email=self.email, access=self.access_str, )
