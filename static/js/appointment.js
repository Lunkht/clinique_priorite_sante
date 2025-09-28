document.addEventListener('DOMContentLoaded', function() {
    const appointmentForm = document.getElementById('appointmentForm');
    const formStatus = document.getElementById('form-status');
    const submitButton = appointmentForm.querySelector('button[type="submit"]');

    if (appointmentForm) {
        appointmentForm.addEventListener('submit', async function(e) {
            e.preventDefault();

            // Affiche un message de chargement et désactive le bouton
            submitButton.disabled = true;
            submitButton.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Envoi en cours...';
            formStatus.textContent = '';
            formStatus.style.color = '';

            // Récupération des données du formulaire
            const formData = new FormData(appointmentForm);
            const data = Object.fromEntries(formData.entries());

            try {
                // Envoi des données au backend Flask
                // Note: L'URL doit correspondre à l'adresse de votre serveur Flask
                const response = await fetch('http://127.0.0.1:5001/api/prendre-rendez-vous', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(data),
                });

                const result = await response.json();

                if (response.ok) {
                    // Succès
                    formStatus.textContent = result.message || "Votre demande de rendez-vous a été envoyée avec succès ! Nous vous contacterons bientôt.";
                    formStatus.style.color = 'green';
                    appointmentForm.reset();
                } else {
                    // Erreur gérée par le backend
                    formStatus.textContent = result.error || 'Une erreur est survenue. Veuillez réessayer.';
                    formStatus.style.color = 'red';
                }
            } catch (error) {
                // Erreur réseau ou autre
                console.error('Erreur lors de la soumission du formulaire:', error);
                formStatus.textContent = 'Impossible de contacter le serveur. Veuillez vérifier votre connexion et réessayer.';
                formStatus.style.color = 'red';
            } finally {
                // Réactive le bouton
                submitButton.disabled = false;
                submitButton.innerHTML = '<i class="fas fa-paper-plane"></i> Envoyer la demande';
            }
        });
    }
});