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
├── index.html              # Page principale
├── static/
│   ├── css/
│   │   └── main.css        # Styles principaux
│   ├── js/
│   │   ├── main.js         # JavaScript principal
│   │   └── data.js         # Données statiques
│   └── images/             # Images du site
├── templates/              # Templates Flask (optionnel)
├── app.py                  # Application Flask (optionnel)
├── run_local.py           # Serveur de test local
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

- ✅ Design responsive
- ✅ Navigation fluide
- ✅ Recherche de spécialités
- ✅ Recherche de maladies A-Z
- ✅ Témoignages clients
- ✅ Statistiques de la clinique
- ✅ Formulaire de contact
- ✅ Appel d'urgence

## 🎨 Technologies

- **Frontend:** HTML5, CSS3, JavaScript (Vanilla)
- **Backend (optionnel):** Flask, Python
- **Déploiement:** GitHub Pages compatible

## 📞 Support

Pour toute question ou problème, contactez l'équipe de développement.