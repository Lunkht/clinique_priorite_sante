from flask import Flask, render_template, jsonify, request
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

# Données pour les spécialités médicales
specialties_data = [
    {
        "id": "cardiac",
        "name": "Soins cardiaques",
        "description": "Traitement de la santé cardiaque",
        "icon": "❤️"
    },
    {
        "id": "dentistry",
        "name": "Dentisterie",
        "description": "Solutions de soins dentaires",
        "icon": "/images/touth-03.svg"
    },
    {
        "id": "gastro",
        "name": "Gastrosciences",
        "description": "Soins de santé digestive",
        "icon": "🫁"
    },
    {
        "id": "neuro",
        "name": "Neuroscience",
        "description": "Soins du cerveau et des nerfs",
        "icon": "🧠"
    },
    {
        "id": "ortho",
        "name": "Orthopédie",
        "description": "Soins des os et des articulations",
        "icon": "🦴"
    },
    {
        "id": "liver",
        "name": "Soins du foie",
        "description": "Santé du foie et soins de transplantation",
        "icon": "🔬"
    },
    {
        "id": "renal",
        "name": "Soins rénaux",
        "description": "Traitement de la santé rénale",
        "icon": "🩺"
    },
    {
        "id": "gyneco",
        "name": "Gynécologie",
        "description": "Solutions de soins gynécologiques",
        "icon": "👩‍⚕️"
    },
    {
        "id": "pediatric",
        "name": "Soins pédiatriques",
        "description": "Services de santé infantile",
        "icon": "👶"
    }
]

# Données pour les statistiques
stats_data = [
    {
        "title": "30+ ans d'excellence",
        "description": "Des décennies de soins de confiance, donnant la priorité à votre santé et à votre bien-être",
        "type": "building"
    },
    {
        "title": "1000+ soins médicaux spécialisés",
        "description": "Une équipe de professionnels engagés pour votre santé et votre bien-être",
        "type": "team"
    },
    {
        "title": "Technologie médicale avancée",
        "description": "Technologie médicale pour un diagnostic précis et un traitement efficace",
        "type": "technology"
    },
    {
        "title": "98% de patients satisfaits",
        "description": "Nous sommes fiers de créer une expérience positive pour chaque patient",
        "type": "satisfaction"
    },
    {
        "title": "Pharmacie de confiance depuis plus de 12 ans",
        "description": "Nous faisons confiance aux solutions pharmaceutiques, offrant des soins de qualité et de fiabilité",
        "type": "pharmacy"
    }
]

# Données pour les témoignages
testimonials_data = [
    {
        "id": 1,
        "name": "Mawa Cissé",
        "role": "Employeuse",
        "rating": 5,
        "comment": "Les médecins et le personnel du Clinique Priorité Santé m'ont incroyablement soutenu tout au long de mon traitement..",
        "image": "patient1.jpg"
    },
    {
        "id": 2,
        "name": "Mohamed Camara",
        "role": "Patient",
        "rating": 5,
        "comment": "Des soins et un accompagnement exceptionnels ! L'équipe médicale a prodigué un traitement exceptionnel..",
        "image": "patient2.jpg"
    },
    {
        "id": 3,
        "name": "Malik Conté",
        "role": "Patient",
        "rating": 5,
        "comment": "Service professionnel et personnel attentionné. Je recommande vivement les Cliniques Priorité Santé.",
        "image": "patient3.jpg"
    }
]

# Données pour les maladies (A-Z)
diseases_data = {
    'A': ['Arthritis', 'Asthma', 'Anemia', 'Alzheimer'],
    'B': ['Bronchitis', 'Burns', 'Blood Pressure', 'Bladder Issues'],
    'C': ['Cancer', 'Cardiac Disease', 'Cholesterol', 'Cataract'],
    'D': ['Diabetes', 'Depression', 'Dermatitis', 'Dental Problems'],
    'E': ['Epilepsy', 'Eczema', 'Ear Infections', 'Eye Problems'],
    # Ajoutez plus de données selon vos besoins
}

@app.route('/')
def home():
    return render_template('index.html')

@app.route('/api/specialties')
def get_specialties():
    return jsonify(specialties_data)

@app.route('/api/stats')
def get_stats():
    return jsonify(stats_data)

@app.route('/api/testimonials')
def get_testimonials():
    return jsonify(testimonials_data)

@app.route('/api/diseases')
def get_diseases():
    return jsonify(diseases_data)

@app.route('/api/diseases/<letter>')
def get_diseases_by_letter(letter):
    letter = letter.upper()
    diseases = diseases_data.get(letter, [])
    return jsonify(diseases)

@app.route('/api/search/doctor')
def search_doctor():
    query = request.args.get('q', '')
    # Simuler une recherche de médecins
    doctors = [
        {"name": f"Dr. Bérété - {query}", "specialty": "Chirurgie générale"},
        {"name": f"Dr. Daniel  - {query}", "specialty": "Neurology"}
    ]
    return jsonify(doctors)

if __name__ == '__main__':
    app.run(debug=True)