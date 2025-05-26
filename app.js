// app.js - Version simplifiée corrigée
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

// Navigation simplifiée avec vérifications
function initNavigation() {
    // Boutons de navigation principale - avec vérification d'existence
    const showTestsBtn = document.getElementById('show-tests');
    if (showTestsBtn) {
        showTestsBtn.addEventListener('click', function() {
            showSection('tests-list');
        });
    } else {
        console.warn('Élément show-tests non trouvé');
    }
    
    const showBilanBtn = document.getElementById('show-bilan');
    if (showBilanBtn) {
        showBilanBtn.addEventListener('click', function() {
            showSection('bilan');
        });
    } else {
        console.warn('Élément show-bilan non trouvé');
    }
    
    // Boutons retour - avec vérification d'existence
    const backToHomeBtn = document.getElementById('back-to-home');
    if (backToHomeBtn) {
        backToHomeBtn.addEventListener('click', function() {
            showSection('welcome');
        });
    } else {
        console.warn('Élément back-to-home non trouvé');
    }
    
    const backFromBilanBtn = document.getElementById('back-from-bilan');
    if (backFromBilanBtn) {
        backFromBilanBtn.addEventListener('click', function() {
            showSection('welcome');
        });
    } else {
        console.warn('Élément back-from-bilan non trouvé');
    }
    
    // Navigation dans les tests - avec vérification d'existence
    const prevQuestionBtn = document.getElementById('prev-question');
    if (prevQuestionBtn) {
        prevQuestionBtn.addEventListener('click', function() {
            if (window.Tests && typeof window.Tests.previousQuestion === 'function') {
                Tests.previousQuestion();
            }
        });
    } else {
        console.warn('Élément prev-question non trouvé');
    }
    
    const nextQuestionBtn = document.getElementById('next-question');
    if (nextQuestionBtn) {
        nextQuestionBtn.addEventListener('click', function() {
            if (window.Tests && typeof window.Tests.nextQuestion === 'function') {
                Tests.nextQuestion();
            }
        });
    } else {
        console.warn('Élément next-question non trouvé');
    }
}

// Fonction pour afficher une section et masquer les autres
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
    } else {
        console.error('Section non trouvée:', sectionId);
    }
}

// Fonction pour charger les tests disponibles
function loadTests() {
    try {
        const testsContainer = document.getElementById('tests-container');
        
        if (!testsContainer) {
            console.error('Conteneur des tests non trouvé');
            return;
        }
        
        // Vérifier si les données de test sont disponibles
        if (!window.testsData || !Array.isArray(window.testsData.categories)) {
            throw new Error('Les données de test ne sont pas disponibles');
        }
        
        // Vider le conteneur
        testsContainer.innerHTML = '';
        
        // Ajouter chaque catégorie et ses tests
        window.testsData.categories.forEach(category => {
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
                
                // Vérifier que le module Tests est disponible
                if (window.Tests && typeof window.Tests.startTest === 'function') {
                    Tests.startTest(testId);
                } else {
                    console.error('Module Tests non disponible');
                    alert('Erreur : Module de tests non disponible. Veuillez recharger la page.');
                }
            });
        });
        
        console.log('Tests chargés avec succès');
        
    } catch (error) {
        console.error('Erreur lors du chargement des tests:', error);
        
        // Afficher un message d'erreur
        const testsContainer = document.getElementById('tests-container');
        if (testsContainer) {
            testsContainer.innerHTML = `
                <div class="error-message">
                    <p>Impossible de charger les tests. Erreur: ${error.message}</p>
                    <p>Veuillez recharger la page ou contacter le support.</p>
                    <button onclick="location.reload()">Recharger la page</button>
                </div>
            `;
        }
    }
}

// Fonction pour charger le bilan récapitulatif
function loadBilan() {
    try {
        // Vérifier si la fonction Bilan.loadUserData existe
        if (window.Bilan && typeof window.Bilan.loadUserData === 'function') {
            Bilan.loadUserData();
            console.log('Bilan chargé avec succès');
        } else {
            console.warn('Module Bilan non disponible ou incomplet');
        }
    } catch (error) {
        console.error('Erreur lors du chargement du bilan:', error);
    }
}

// Fonction utilitaire pour déboguer les éléments manquants
function debugMissingElements() {
    const requiredElements = [
        'show-tests',
        'show-bilan', 
        'back-to-home',
        'back-from-bilan',
        'prev-question',
        'next-question',
        'tests-container',
        'welcome',
        'tests-list',
        'test-content',
        'bilan'
    ];
    
    console.log('=== Vérification des éléments HTML ===');
    requiredElements.forEach(id => {
        const element = document.getElementById(id);
        console.log(`${id}: ${element ? '✅ Trouvé' : '❌ Manquant'}`);
    });
    console.log('=====================================');
}

// Appeler la fonction de debug si nécessaire (décommentez pour déboguer)
// setTimeout(debugMissingElements, 1000);
