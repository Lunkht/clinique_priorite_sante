from flask import Blueprint, render_template, redirect, url_for, request, flash, jsonify
from flask_login import login_user, logout_user, login_required, current_user
from werkzeug.utils import secure_filename
from datetime import datetime
import os

from extensions import db, bcrypt, mail
from models import Admin, RendezVous, Medecin, Clinique, Specialite

main_routes = Blueprint('main', __name__)

ALLOWED_EXTENSIONS = {'png', 'jpg', 'jpeg', 'gif'}

def allowed_file(filename):
    return '.' in filename and filename.rsplit('.', 1)[1].lower() in ALLOWED_EXTENSIONS

@main_routes.route("/admin/login", methods=['GET', 'POST'])
def login():
    if current_user.is_authenticated:
        return redirect(url_for('main.dashboard'))
    if request.method == 'POST':
        admin = Admin.query.filter_by(username=request.form.get('username')).first()
        if admin and bcrypt.check_password_hash(admin.password, request.form.get('password')):
            login_user(admin)
            next_page = request.args.get('next')
            return redirect(next_page) if next_page else redirect(url_for('main.dashboard'))
        else:
            flash('Login échoué. Veuillez vérifier l\'identifiant et le mot de passe.', 'danger')
    return render_template('admin/login.html', title='Connexion Admin')

@main_routes.route("/admin/logout")
@login_required
def logout():
    logout_user()
    return redirect(url_for('main.login'))

@main_routes.route("/admin/dashboard")
@login_required
def dashboard():
    page = request.args.get('page', 1, type=int)
    per_page = 10
    appointments = RendezVous.query.order_by(
        db.case(
            (RendezVous.status == 'En attente', 0),
            (RendezVous.status == 'Confirmé', 1),
            (RendezVous.status == 'Annulé', 2),
        ),
        RendezVous.date_rdv.asc()
    ).paginate(page=page, per_page=per_page)
    return render_template('admin/dashboard.html', title='Tableau de Bord', appointments=appointments)

@main_routes.route("/admin/rendezvous/<int:rdv_id>/update", methods=['POST'])
@login_required
def update_appointment_status(rdv_id):
    rdv = RendezVous.query.get_or_404(rdv_id)
    new_status = request.form.get('status')
    if new_status in ['Confirmé', 'Annulé']:
        rdv.status = new_status
        db.session.commit()
        if rdv.status == 'Confirmé':
            try:
                msg = Message('Confirmation de votre rendez-vous',
                              sender=('Clinique Priorité Santé', os.environ.get('EMAIL_USER')),
                              recipients=[rdv.email_patient])
                msg.html = render_template('email/confirmation_rdv.html', rdv=rdv)
                mail.send(msg)
                flash(f'Le rendez-vous de {rdv.nom_patient} a été confirmé et un e-mail a été envoyé.', 'success')
            except Exception as e:
                flash(f'Le statut a été mis à jour, mais l\'e-mail n\'a pas pu être envoyé. Erreur: {e}', 'warning')
        else:
            flash(f'Le rendez-vous de {rdv.nom_patient} a été annulé.', 'info')
    return redirect(url_for('main.dashboard'))

@main_routes.route("/admin/rendezvous/<int:rdv_id>/delete", methods=['POST'])
@login_required
def delete_appointment(rdv_id):
    rdv = RendezVous.query.get_or_404(rdv_id)
    db.session.delete(rdv)
    db.session.commit()
    flash('Le rendez-vous a été supprimé.', 'success')
    return redirect(url_for('main.dashboard'))

@main_routes.route("/admin/medecins")
@login_required
def gerer_medecins():
    medecins = Medecin.query.all()
    return render_template('admin/medecins.html', title="Gérer les Médecins", medecins=medecins)

@main_routes.route("/admin/medecins/ajouter", methods=['GET', 'POST'])
@login_required
def ajouter_medecin():
    if request.method == 'POST':
        nom = request.form.get('nom')
        specialite = request.form.get('specialite')
        biographie = request.form.get('biographie')
        photo_file = request.files.get('photo')

        if not nom or not specialite:
            flash('Le nom et la spécialité sont requis.', 'danger')
            return redirect(request.url)

        filename = 'default_doctor.jpg'
        if photo_file and photo_file.filename != '' and allowed_file(photo_file.filename):
            filename = secure_filename(photo_file.filename)
            photo_file.save(os.path.join(os.environ.get('UPLOAD_FOLDER'), filename))

        nouveau_medecin = Medecin(nom=nom, specialite=specialite, biographie=biographie, photo=filename)
        db.session.add(nouveau_medecin)
        db.session.commit()
        flash('Le médecin a été ajouté avec succès.', 'success')
        return redirect(url_for('main.gerer_medecins'))

    return render_template('admin/medecin_form.html', title="Ajouter un Médecin")

@main_routes.route("/admin/medecins/<int:medecin_id>/modifier", methods=['GET', 'POST'])
@login_required
def modifier_medecin(medecin_id):
    medecin = Medecin.query.get_or_404(medecin_id)
    if request.method == 'POST':
        medecin.nom = request.form.get('nom')
        medecin.specialite = request.form.get('specialite')
        medecin.biographie = request.form.get('biographie')
        photo_file = request.files.get('photo')

        if photo_file and photo_file.filename != '' and allowed_file(photo_file.filename):
            filename = secure_filename(photo_file.filename)
            photo_file.save(os.path.join(os.environ.get('UPLOAD_FOLDER'), filename))
            medecin.photo = filename

        db.session.commit()
        flash('Les informations du médecin ont été mises à jour.', 'success')
        return redirect(url_for('main.gerer_medecins'))

    return render_template('admin/medecin_form.html', title="Modifier un Médecin", medecin=medecin)

@main_routes.route("/admin/medecins/<int:medecin_id>/supprimer", methods=['POST'])
@login_required
def supprimer_medecin(medecin_id):
    medecin = Medecin.query.get_or_404(medecin_id)
    db.session.delete(medecin)
    db.session.commit()
    flash('Le médecin a été supprimé.', 'success')
    return redirect(url_for('main.gerer_medecins'))

@main_routes.route("/admin/cliniques")
@login_required
def gerer_cliniques():
    cliniques = Clinique.query.all()
    return render_template('admin/cliniques.html', title="Gérer les Cliniques", cliniques=cliniques)

@main_routes.route("/admin/cliniques/ajouter", methods=['GET', 'POST'])
@login_required
def ajouter_clinique():
    if request.method == 'POST':
        nouvelle_clinique = Clinique(
            nom=request.form.get('nom'),
            adresse=request.form.get('adresse'),
            telephone=request.form.get('telephone'),
            email=request.form.get('email'),
            heures_ouverture=request.form.get('heures_ouverture')
        )
        db.session.add(nouvelle_clinique)
        db.session.commit()
        flash('La clinique a été ajoutée avec succès.', 'success')
        return redirect(url_for('main.gerer_cliniques'))
    return render_template('admin/clinique_form.html', title="Ajouter une Clinique")

@main_routes.route("/admin/cliniques/<int:clinique_id>/modifier", methods=['GET', 'POST'])
@login_required
def modifier_clinique(clinique_id):
    clinique = Clinique.query.get_or_404(clinique_id)
    if request.method == 'POST':
        clinique.nom = request.form.get('nom')
        clinique.adresse = request.form.get('adresse')
        clinique.telephone = request.form.get('telephone')
        clinique.email = request.form.get('email')
        clinique.heures_ouverture = request.form.get('heures_ouverture')
        db.session.commit()
        flash('Les informations de la clinique ont été mises à jour.', 'success')
        return redirect(url_for('main.gerer_cliniques'))
    return render_template('admin/clinique_form.html', title="Modifier une Clinique", clinique=clinique)

@main_routes.route("/admin/cliniques/<int:clinique_id>/supprimer", methods=['POST'])
@login_required
def supprimer_clinique(clinique_id):
    clinique = Clinique.query.get_or_404(clinique_id)
    db.session.delete(clinique)
    db.session.commit()
    flash('La clinique a été supprimée.', 'success')
    return redirect(url_for('main.gerer_cliniques'))

@main_routes.route("/admin/specialites")
@login_required
def gerer_specialites():
    specialites = Specialite.query.all()
    return render_template('admin/specialites.html', title="Gérer les Spécialités", specialites=specialites)

@main_routes.route("/admin/specialites/ajouter", methods=['GET', 'POST'])
@login_required
def ajouter_specialite():
    if request.method == 'POST':
        nom = request.form.get('nom')
        description = request.form.get('description')
        image_file = request.files.get('image')

        filename = 'default_specialty.jpg'
        if image_file and image_file.filename != '' and allowed_file(image_file.filename):
            filename = secure_filename(image_file.filename)
            image_file.save(os.path.join(os.environ.get('UPLOAD_FOLDER').replace('medecins', 'specialites'), filename))

        nouvelle_specialite = Specialite(nom=nom, description=description, image=filename)
        db.session.add(nouvelle_specialite)
        db.session.commit()
        flash('La spécialité a été ajoutée avec succès.', 'success')
        return redirect(url_for('main.gerer_specialites'))
    return render_template('admin/specialite_form.html', title="Ajouter une Spécialité")

@main_routes.route("/admin/specialites/<int:specialite_id>/modifier", methods=['GET', 'POST'])
@login_required
def modifier_specialite(specialite_id):
    specialite = Specialite.query.get_or_404(specialite_id)
    if request.method == 'POST':
        specialite.nom = request.form.get('nom')
        specialite.description = request.form.get('description')
        image_file = request.files.get('image')
        if image_file and image_file.filename != '' and allowed_file(image_file.filename):
            filename = secure_filename(image_file.filename)
            image_file.save(os.path.join(os.environ.get('UPLOAD_FOLDER').replace('medecins', 'specialites'), filename))
            specialite.image = filename
        db.session.commit()
        flash('La spécialité a été mise à jour.', 'success')
        return redirect(url_for('main.gerer_specialites'))
    return render_template('admin/specialite_form.html', title="Modifier une Spécialité", specialite=specialite)

@main_routes.route("/admin/specialites/<int:specialite_id>/supprimer", methods=['POST'])
@login_required
def supprimer_specialite(specialite_id):
    specialite = Specialite.query.get_or_404(specialite_id)
    db.session.delete(specialite)
    db.session.commit()
    flash('La spécialité a été supprimée.', 'success')
    return redirect(url_for('main.gerer_specialites'))

@main_routes.route("/api/prendre-rendez-vous", methods=['POST'])
def prendre_rendez_vous():
    data = request.get_json()
    required_fields = ['name', 'email', 'phone', 'specialite', 'date']
    if not data or not all(field in data for field in required_fields):
        return jsonify({"error": "Données manquantes ou invalides."} ), 400

    try:
        date_rdv_obj = datetime.fromisoformat(data['date'])
    except ValueError:
        return jsonify({"error": "Format de date invalide."} ), 400
    
    nouveau_rdv = RendezVous(
        nom_patient=data['name'],
        email_patient=data['email'],
        telephone_patient=data['phone'],
        specialite=data['specialite'],
        date_rdv=date_rdv_obj
    )
    db.session.add(nouveau_rdv)
    db.session.commit()
    
    return jsonify({"message": "Votre demande de rendez-vous a bien été enregistrée !"} ), 201

@main_routes.route("/")
def public_home():
    medecins = Medecin.query.limit(4).all()
    cliniques = Clinique.query.all()
    specialites = Specialite.query.limit(6).all()
    return render_template('public/index.html', medecins=medecins, cliniques=cliniques, specialites=specialites)

@main_routes.route("/medecins")
def public_medecins():
    medecins = Medecin.query.order_by(Medecin.nom).all()
    return render_template('public/medecins.html', medecins=medecins)

@main_routes.route("/cliniques/<int:clinique_id>")
def public_clinique_detail(clinique_id):
    clinique = Clinique.query.get_or_404(clinique_id)
    return render_template('public/clinique_detail.html', clinique=clinique)