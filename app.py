from flask import Flask
from flask_cors import CORS
from dotenv import load_dotenv
import os

# Importer les extensions
from extensions import db, bcrypt, login_manager, mail

# Charger les variables d'environnement
load_dotenv()

def create_app():
    app = Flask(__name__)
    CORS(app)

    # Configuration de l'application
    app.config['SECRET_KEY'] = os.environ.get('SECRET_KEY', 'une-clé-secrète-par-défaut')
    app.config['SQLALCHEMY_DATABASE_URI'] = os.environ.get('DATABASE_URL', 'sqlite:///site.db')
    app.config['UPLOAD_FOLDER'] = 'static/uploads/medecins'
    app.config['MAIL_SERVER'] = 'smtp.gmail.com'
    app.config['MAIL_PORT'] = 587
    app.config['MAIL_USE_TLS'] = True
    app.config['MAIL_USERNAME'] = os.environ.get('EMAIL_USER')
    app.config['MAIL_PASSWORD'] = os.environ.get('EMAIL_PASS')

    # Initialiser les extensions
    db.init_app(app)
    bcrypt.init_app(app)
    login_manager.init_app(app)
    mail.init_app(app)

    # Configuration de Flask-Login
    login_manager.login_view = 'main.login'
    login_manager.login_message_category = 'info'

    from models import Admin
    @login_manager.user_loader
    def load_user(user_id):
        return Admin.query.get(int(user_id))

    # Importer et enregistrer le blueprint
    from routes import main_routes
    app.register_blueprint(main_routes)

    return app

if __name__ == '__main__':
    app = create_app()
    with app.app_context():
        db.create_all()
    app.run(debug=True, port=5001)
