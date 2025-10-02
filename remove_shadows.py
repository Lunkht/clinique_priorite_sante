#!/usr/bin/env python3
"""
Script pour supprimer toutes les ombres (box-shadow, drop-shadow, text-shadow) 
du fichier CSS principal
"""

import re

def remove_shadows_from_css():
    # Lire le fichier CSS
    with open('static/css/main.css', 'r', encoding='utf-8') as f:
        content = f.read()
    
    # Patterns pour supprimer les ombres
    patterns = [
        # box-shadow avec toutes ses variations
        r'box-shadow:\s*[^;]+;',
        # drop-shadow dans filter
        r'filter:\s*drop-shadow\([^)]+\);',
        # text-shadow
        r'text-shadow:\s*[^;]+;',
        # Lignes contenant seulement box-shadow (avec espaces)
        r'^\s*box-shadow:\s*[^;]+;\s*$',
        # Lignes contenant seulement filter: drop-shadow
        r'^\s*filter:\s*drop-shadow\([^)]+\);\s*$',
        # Lignes contenant seulement text-shadow
        r'^\s*text-shadow:\s*[^;]+;\s*$'
    ]
    
    # Supprimer toutes les ombres
    for pattern in patterns:
        content = re.sub(pattern, '', content, flags=re.MULTILINE)
    
    # Nettoyer les lignes vides multiples
    content = re.sub(r'\n\s*\n\s*\n', '\n\n', content)
    
    # Sauvegarder le fichier modifié
    with open('static/css/main.css', 'w', encoding='utf-8') as f:
        f.write(content)
    
    print("✅ Toutes les ombres ont été supprimées du fichier CSS principal")

if __name__ == "__main__":
    remove_shadows_from_css()