#!/usr/bin/env python3
"""
Script pour créer des images placeholder pour la clinique
"""

import os
from pathlib import Path

def create_placeholder_images():
    """Créer des images SVG placeholder pour la clinique"""
    
    images_dir = Path("static/images")
    images_dir.mkdir(exist_ok=True)
    
    # Définir les images à créer
    images = {
        "clinique-facade.jpg": {
            "title": "Clinique Priorité Santé",
            "subtitle": "Façade Principale",
            "color": "#4a90e2",
            "icon": "🏥"
        },
        "urgences.jpg": {
            "title": "Service d'Urgences",
            "subtitle": "24h/24 - 7j/7",
            "color": "#ff4757",
            "icon": "🚨"
        },
        "laboratoire.jpg": {
            "title": "Laboratoire d'Analyses",
            "subtitle": "Équipements Modernes",
            "color": "#2ed573",
            "icon": "🔬"
        },
        "accueil.jpg": {
            "title": "Hall d'Accueil",
            "subtitle": "Espace Confortable",
            "color": "#ffa502",
            "icon": "🏢"
        },
        "consultation.jpg": {
            "title": "Salles de Consultation",
            "subtitle": "Cabinets Médicaux",
            "color": "#3742fa",
            "icon": "🩺"
        },
        "bloc-operatoire.jpg": {
            "title": "Bloc Opératoire",
            "subtitle": "Normes Internationales",
            "color": "#2f3542",
            "icon": "⚕️"
        },
        "chambre.jpg": {
            "title": "Chambres",
            "subtitle": "Hospitalisation Confort",
            "color": "#ff6348",
            "icon": "🛏️"
        },
        "pharmacie.jpg": {
            "title": "Pharmacie",
            "subtitle": "Médicaments & Conseils",
            "color": "#1e90ff",
            "icon": "💊"
        },
        "clinique-kaloum.jpg": {
            "title": "Clinique Priorité Santé",
            "subtitle": "Kaloum - Établissement Principal",
            "color": "#e26d4a",
            "icon": "🏥"
        },
        "centre-matam.jpg": {
            "title": "Centre Médical",
            "subtitle": "Matam - Soins Ambulatoires",
            "color": "#2c5aa0",
            "icon": "🏢"
        },
        "polyclinique-ratoma.jpg": {
            "title": "Polyclinique",
            "subtitle": "Ratoma - Chirurgie Spécialisée",
            "color": "#e26d4a",
            "icon": "🏛️"
        },
        "centre-dixinn.jpg": {
            "title": "Centre de Santé",
            "subtitle": "Dixinn - Soins Communautaires",
            "color": "#2c5aa0",
            "icon": "🏪"
        },
        "clinique-camayenne.jpg": {
            "title": "Clinique Spécialisée",
            "subtitle": "Camayenne - Haute Technologie",
            "color": "#e26d4a",
            "icon": "⚕️"
        },
        "maternite-kipe.jpg": {
            "title": "Maternité Priorité",
            "subtitle": "Kipé - Mère & Enfant",
            "color": "#2c5aa0",
            "icon": "👶"
        }
    }
    
    # Template SVG
    svg_template = '''<svg width="800" height="600" xmlns="http://www.w3.org/2000/svg">
    <defs>
        <linearGradient id="bg" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" style="stop-color:{color};stop-opacity:1" />
            <stop offset="100%" style="stop-color:{color_dark};stop-opacity:1" />
        </linearGradient>
        <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
            <path d="M 40 0 L 0 0 0 40" fill="none" stroke="rgba(255,255,255,0.1)" stroke-width="1"/>
        </pattern>
    </defs>
    
    <!-- Background -->
    <rect width="100%" height="100%" fill="url(#bg)"/>
    <rect width="100%" height="100%" fill="url(#grid)"/>
    
    <!-- Content -->
    <g transform="translate(400, 300)">
        <!-- Icon -->
        <text x="0" y="-50" text-anchor="middle" font-size="120" fill="rgba(255,255,255,0.9)">{icon}</text>
        
        <!-- Title -->
        <text x="0" y="20" text-anchor="middle" font-family="Arial, sans-serif" font-size="36" font-weight="bold" fill="white">{title}</text>
        
        <!-- Subtitle -->
        <text x="0" y="60" text-anchor="middle" font-family="Arial, sans-serif" font-size="24" fill="rgba(255,255,255,0.8)">{subtitle}</text>
        
        <!-- Decorative elements -->
        <circle cx="-150" cy="-100" r="3" fill="rgba(255,255,255,0.3)"/>
        <circle cx="150" cy="-80" r="2" fill="rgba(255,255,255,0.3)"/>
        <circle cx="-120" cy="120" r="4" fill="rgba(255,255,255,0.3)"/>
        <circle cx="130" cy="100" r="2" fill="rgba(255,255,255,0.3)"/>
    </g>
    
    <!-- Bottom info -->
    <text x="400" y="550" text-anchor="middle" font-family="Arial, sans-serif" font-size="18" fill="rgba(255,255,255,0.7)">Clinique Priorité Santé - Conakry, Guinée</text>
</svg>'''
    
    def darken_color(hex_color, factor=0.7):
        """Assombrir une couleur hexadécimale"""
        hex_color = hex_color.lstrip('#')
        rgb = tuple(int(hex_color[i:i+2], 16) for i in (0, 2, 4))
        dark_rgb = tuple(int(c * factor) for c in rgb)
        return f"#{dark_rgb[0]:02x}{dark_rgb[1]:02x}{dark_rgb[2]:02x}"
    
    created_count = 0
    
    for filename, data in images.items():
        filepath = images_dir / filename
        
        # Ne pas écraser les images existantes
        if filepath.exists():
            print(f"⏭️  {filename} existe déjà, ignoré")
            continue
        
        # Créer le SVG
        svg_content = svg_template.format(
            color=data["color"],
            color_dark=darken_color(data["color"]),
            icon=data["icon"],
            title=data["title"],
            subtitle=data["subtitle"]
        )
        
        # Sauvegarder comme SVG (on peut le renommer en .jpg plus tard si nécessaire)
        svg_filepath = images_dir / filename.replace('.jpg', '.svg')
        with open(svg_filepath, 'w', encoding='utf-8') as f:
            f.write(svg_content)
        
        print(f"✅ Créé: {svg_filepath}")
        created_count += 1
    
    print(f"\n🎉 {created_count} images créées avec succès!")
    print(f"📁 Dossier: {images_dir.absolute()}")
    
    # Créer un fichier HTML de prévisualisation
    preview_html = '''<!DOCTYPE html>
<html lang="fr">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Prévisualisation Images Clinique</title>
    <style>
        body { font-family: Arial, sans-serif; margin: 20px; background: #f5f5f5; }
        .container { max-width: 1200px; margin: 0 auto; }
        .grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 20px; }
        .image-card { background: white; border-radius: 10px; overflow: hidden; box-shadow: 0 4px 12px rgba(0,0,0,0.1); }
        .image-card img { width: 100%; height: 200px; object-fit: cover; }
        .image-info { padding: 15px; }
        .image-title { font-weight: bold; color: #333; margin-bottom: 5px; }
        .image-filename { color: #666; font-size: 0.9em; }
    </style>
</head>
<body>
    <div class="container">
        <h1>🖼️ Images de la Clinique Priorité Santé</h1>
        <p>Prévisualisation des images créées pour le site web</p>
        
        <div class="grid">
'''
    
    for filename, data in images.items():
        svg_filename = filename.replace('.jpg', '.svg')
        preview_html += f'''
            <div class="image-card">
                <img src="static/images/{svg_filename}" alt="{data['title']}">
                <div class="image-info">
                    <div class="image-title">{data['icon']} {data['title']}</div>
                    <div class="image-filename">{filename}</div>
                </div>
            </div>
        '''
    
    preview_html += '''
        </div>
    </div>
</body>
</html>'''
    
    with open('preview_images.html', 'w', encoding='utf-8') as f:
        f.write(preview_html)
    
    print(f"📋 Prévisualisation créée: preview_images.html")

if __name__ == "__main__":
    create_placeholder_images()