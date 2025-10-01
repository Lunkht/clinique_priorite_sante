#!/usr/bin/env python3
"""
Script pour tester le site localement
Usage: python run_local.py
"""

import http.server
import socketserver
import webbrowser
import os
import sys
from pathlib import Path

PORT = 8000

class CustomHTTPRequestHandler(http.server.SimpleHTTPRequestHandler):
    def end_headers(self):
        self.send_header('Cache-Control', 'no-cache, no-store, must-revalidate')
        self.send_header('Pragma', 'no-cache')
        self.send_header('Expires', '0')
        super().end_headers()

    def guess_type(self, path):
        mimetype = super().guess_type(path)
        if path.endswith('.js'):
            return 'application/javascript'
        elif path.endswith('.css'):
            return 'text/css'
        return mimetype

def main():
    # Changer vers le répertoire du script
    os.chdir(Path(__file__).parent)
    
    print(f"🚀 Démarrage du serveur local sur le port {PORT}")
    print(f"📁 Répertoire: {os.getcwd()}")
    print(f"🌐 URL: http://localhost:{PORT}")
    print("📝 Appuyez sur Ctrl+C pour arrêter le serveur")
    
    try:
        with socketserver.TCPServer(("", PORT), CustomHTTPRequestHandler) as httpd:
            print(f"✅ Serveur démarré avec succès!")
            
            # Ouvrir automatiquement le navigateur
            webbrowser.open(f'http://localhost:{PORT}')
            
            httpd.serve_forever()
            
    except KeyboardInterrupt:
        print("\n🛑 Serveur arrêté par l'utilisateur")
        sys.exit(0)
    except OSError as e:
        if e.errno == 48:  # Port already in use
            print(f"❌ Erreur: Le port {PORT} est déjà utilisé")
            print("💡 Essayez de fermer les autres serveurs ou utilisez un autre port")
        else:
            print(f"❌ Erreur: {e}")
        sys.exit(1)

if __name__ == "__main__":
    main()