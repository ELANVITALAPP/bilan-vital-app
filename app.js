// app.js - Version complète avec les gestionnaires d'événements pour les boutons de retour
document.addEventListener('DOMContentLoaded', function() {
    // Initialisation de l'application
    console.log('Initialisation de Bilan Vital - Version simplifiée');
    
    // Gestion de la navigation simplifiée
    initNavigation();
    
    // Chargement des tests
    loadTests();
    
    // Chargement du bilan si des données existent
    loadBilan();
});

// Fonction globale pour la navigation entre les sections
// Cette fonction est utilisée par d'autres modules
function showSection(sectionId) {
    // Masquer toutes les sections
    document.querySelectorAll('main > section').forEach(section => {
        section.classList.add('hidden');
        section.classList.remove('active');
    });
    
    // Afficher la section demandée
    const targetSection = document.getElementById(sectionId);
    if (targetSection) {
        targetSection.classList.remove('hidden');
        targetSection.classList.add('active');
    }
}

// Navigation simplifiée
function initNavigation() {
    // Boutons de navigation principale
    document.getElementById('show-tests').addEventListener('click', function() {
        showSection('tests-list');
    });
    
    document.getElementById('show-bilan').addEventListener('click', function() {
        showSection('bilan');
    });
    
    // Boutons retour
    document.getElementById('back-to-home').addEventListener('click', function() {
        showSection('welcome');
    });
    
    document.getElementById('back-from-bilan').addEventListener('click', function() {
        showSection('welcome');
    });
    
    // Boutons de retour supplémentaires
    document.getElementById('back-to-home-from-tests').addEventListener('click', function() {
        showSection('welcome');
    });

    document.getElementById('back-to-tests-from-question').addEventListener('click', function() {
        if (confirm('Voulez-vous vraiment quitter ce test ? Votre progression ne sera pas sauvegardée.')) {
            showSection('tests-list');
        }
    });

    document.getElementById('back-to-home-from-bilan').addEventListener('click', function() {
        showSection('welcome');
    });
    
    // Navigation dans les tests
    document.getElementById('prev-question').addEventListener('click', function() {
        Tests.previousQuestion();
    });
    
    document.getElementById('next-question').addEventListener('click', function() {
        Tests.nextQuestion();
    });
}

// Fonction pour charger les tests disponibles
function loadTests() {
    try {
        const testsContainer = document.getElementById('tests-container');
        
        // Vérifier si les données de test sont disponibles
        if (!testsData || !Array.isArray(testsData.categories)) {
            throw new Error('Les données de test ne sont pas disponibles');
        }
        
        // Vider le conteneur
        testsContainer.innerHTML = '';
        
        // Ajouter chaque catégorie et ses tests
        testsData.categories.forEach(category => {
            // Créer l'élément de catégorie
            const categoryEl = document.createElement('div');
            categoryEl.className = 'test-category';
            categoryEl.innerHTML = `
                <h3>${category.name}</h3>
                <div class="category-tests"></div>
            `;
            
            const testsEl = categoryEl.querySelector('.category-tests');
            
            // Ajouter chaque test
            category.tests.forEach(test => {
                const testEl = document.createElement('div');
                testEl.className = 'test-card';
                testEl.innerHTML = `
                    <h4>${test.name}</h4>
                    <p>${test.description || 'Aucune description disponible'}</p>
                    <span class="test-duration">${test.duration || '5-10'} min</span>
                    <button class="btn-start-test" data-test-id="${test.id}">Commencer</button>
                `;
                
                testsEl.appendChild(testEl);
            });
            
            testsContainer.appendChild(categoryEl);
        });
        
        // Ajouter les écouteurs d'événements pour démarrer les tests
        document.querySelectorAll('.btn-start-test').forEach(button => {
            button.addEventListener('click', function() {
                const testId = this.getAttribute('data-test-id');
                Tests.startTest(testId);
            });
        });
    } catch (error) {
        console.error('Erreur lors du chargement des tests:', error);
        
        // Afficher un message d'erreur
        const testsContainer = document.getElementById('tests-container');
        testsContainer.innerHTML = `
            <div class="error-message">
                <p>Impossible de charger les tests. Erreur: ${error.message}</p>
                <p>Veuillez réessayer ultérieurement ou contacter le support.</p>
            </div>
        `;
    }
}

// Fonction pour charger le bilan récapitulatif
function loadBilan() {
    try {
        // Vérifier si l'objet Bilan existe et si la fonction loadUserData est disponible
        if (typeof Bilan !== 'undefined' && typeof Bilan.loadUserData === 'function') {
            Bilan.loadUserData();
        } else {
            console.warn('Module Bilan non disponible ou incomplet');
        }
    } catch (error) {
        console.error('Erreur lors du chargement du bilan:', error);
    }
}
