from app import db, login_manager
from flask_login import UserMixin
from datetime import datetime

@login_manager.user_loader
def load_user(user_id):
    return Admin.query.get(int(user_id))

class Admin(db.Model, UserMixin):
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(20), unique=True, nullable=False)
    password = db.Column(db.String(60), nullable=False)

class RendezVous(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    nom_patient = db.Column(db.String(100), nullable=False)
    email_patient = db.Column(db.String(120), nullable=False)
    telephone_patient = db.Column(db.String(20), nullable=False)
    specialite = db.Column(db.String(100), nullable=False)
    date_rdv = db.Column(db.DateTime, nullable=False)
    status = db.Column(db.String(20), nullable=False, default='En attente')
    date_creation = db.Column(db.DateTime, nullable=False, default=datetime.utcnow)

    def __repr__(self):
        return f"RendezVous('{self.nom_patient}', '{self.date_rdv}', '{self.status}')"

class Medecin(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    nom = db.Column(db.String(100), nullable=False)
    specialite = db.Column(db.String(100), nullable=False)
    biographie = db.Column(db.Text, nullable=True)
    photo = db.Column(db.String(100), nullable=False, default='default_doctor.jpg')

    def __repr__(self):
        return f"Medecin('{self.nom}', '{self.specialite}')"

class Clinique(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    nom = db.Column(db.String(100), nullable=False)
    adresse = db.Column(db.String(255), nullable=False)
    telephone = db.Column(db.String(50), nullable=False)
    email = db.Column(db.String(120), nullable=True)
    heures_ouverture = db.Column(db.String(100), nullable=True)

    def __repr__(self):
        return f"Clinique('{self.nom}', '{self.adresse}')"

class Specialite(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    nom = db.Column(db.String(100), nullable=False, unique=True)
    description = db.Column(db.Text, nullable=False)
    image = db.Column(db.String(100), nullable=False, default='default_specialty.jpg')

    def __repr__(self):
        return f"Specialite('{self.nom}')"