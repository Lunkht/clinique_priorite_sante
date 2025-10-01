# Clinique Priorité Santé

Site web pour la Clinique Priorité Santé - "Là où la guérison se sent comme à la maison"

## 🚀 Test Local

### Option 1: Serveur Python (Recommandé)
```bash
python run_local.py
```

### Option 2: Serveur Python simple
```bash
python -m http.server 8000
```

Puis ouvrez: http://localhost:8000

### Option 3: Avec Flask (pour le développement backend)
```bash
pip install -r requirements.txt
python app.py
```

## 📁 Structure du Projet

```
clinique_priorite_sante/
├── index.html              # Page d'accueil
├── medecins.html           # Page des médecins
├── clinique.html           # Page de la clinique
├── apropos.html            # Page à propos
├── contact.html            # Page de contact
├── static/
│   ├── css/
│   │   └── main.css        # Styles principaux
│   ├── js/
│   │   ├── main.js         # JavaScript principal
│   │   ├── data.js         # Données statiques
│   │   ├── navigation.js   # Navigation et utilitaires
│   │   └── doctors.js      # Fonctionnalités médecins
│   └── images/             # Images du site
├── templates/              # Templates Flask (optionnel)
├── app.py                  # Application Flask (optionnel)
├── run_local.py           # Serveur de test local
├── test_pages.html        # Test de toutes les pages
└── requirements.txt        # Dépendances Python
```

## 🌐 Déploiement GitHub Pages

1. **Activez GitHub Pages:**
   - Allez dans Settings > Pages
   - Source: Deploy from a branch
   - Branch: main / (root)

2. **Le site sera accessible à:**
   ```
   https://[votre-username].github.io/[nom-du-repo]
   ```

## 🔧 Problèmes Résolus

### ✅ Chemins des ressources corrigés
- CSS: `static/css/main.css`
- JS: `static/js/main.js`
- Images: `static/images/`

### ✅ Données statiques ajoutées
- Spécialités médicales
- Statistiques
- Témoignages
- Base de données des maladies

### ✅ Compatibilité GitHub Pages
- Pas de dépendance Flask pour la version statique
- Tous les assets dans le dossier `static/`

## 🛠️ Développement

### Pour modifier le contenu:
1. **Données:** Éditez `static/js/data.js`
2. **Styles:** Éditez `static/css/main.css`
3. **Fonctionnalités:** Éditez `static/js/main.js`

### Pour tester les modifications:
```bash
python run_local.py
```

## 📱 Fonctionnalités

### 🏠 Page d'Accueil
- ✅ Hero section avec image de fond
- ✅ Recherche de médecins
- ✅ Spécialités médicales
- ✅ Recherche de maladies A-Z
- ✅ Témoignages clients
- ✅ Statistiques de la clinique
- ✅ Partenaires de santé

### 👨‍⚕️ Page Médecins
- ✅ Liste complète des médecins
- ✅ Recherche par nom et spécialité
- ✅ Filtrage par spécialité
- ✅ Informations détaillées (formation, langues, expérience)
- ✅ Contact direct (téléphone, email, RDV)

### 🏥 Page Clinique
- ✅ Présentation des installations
- ✅ Services médicaux
- ✅ Équipements de pointe
- ✅ Informations pratiques et localisation

### ℹ️ Page À Propos
- ✅ Histoire de la clinique
- ✅ Mission et vision
- ✅ Valeurs fondamentales
- ✅ Équipe de direction
- ✅ Réalisations et statistiques

### 📞 Page Contact
- ✅ Formulaire de contact interactif
- ✅ Informations de contact complètes
- ✅ Section urgences 24h/24
- ✅ Prise de rendez-vous
- ✅ Horaires d'ouverture

### 🎨 Fonctionnalités Générales
- ✅ Design responsive (mobile, tablette, desktop)
- ✅ Navigation fluide avec menu hamburger mobile
- ✅ Animations au scroll
- ✅ Formulaires interactifs
- ✅ Notifications utilisateur
- ✅ Optimisation SEO

## 🎨 Technologies

- **Frontend:** HTML5, CSS3, JavaScript (Vanilla)
- **Backend (optionnel):** Flask, Python
- **Déploiement:** GitHub Pages compatible

## 📞 Support

Pour toute question ou problème, contactez l'équipe de développement.