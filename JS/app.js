/**
 * Module principal de l'application Bilan Vital
 * Coordonne les différents modules et gère l'initialisation de l'application
 */

// Utilisons un IIFE pour éviter les conflits de noms
const appModule = (function() {
    // Dépendances
    let userModule;
    let testsModule;
    let bilanModule;
    let plannerModule;
    let todaySessionModule;
    
    // États de l'application
    let isInitialized = false;
    let currentUser = null;
    
    /**
     * Initialise l'application et tous ses modules
     */
    function initialize() {
        console.log('Initialisation de l\'application Bilan Vital');
        
        try {
            // Initialisation des modules
            initModules();
            
            // Gestion des événements globaux
            setupEventListeners();
            
            // Vérification de l'utilisateur
            checkUserAuthentication();
            
            // Marquer comme initialisé
            isInitialized = true;
            
            console.log('Application Bilan Vital initialisée avec succès');
            
            // Montrer le contenu principal
            showMainContent();
            
            return true;
        } catch (error) {
            console.error('Erreur lors de l\'initialisation de l\'application:', error);
            showErrorMessage('Une erreur est survenue lors du chargement de l\'application.');
            return false;
        }
    }
    
    /**
     * Initialise tous les modules de l'application
     */
    function initModules() {
        console.log('Initialisation des modules...');
        
        // Récupération des références aux modules (s'ils existent dans la portée globale)
        userModule = window.userData || null;
        if (!userModule) console.warn('Module userData non disponible');
        
        testsModule = window.testsModule || null;
        if (!testsModule) console.warn('Module testsModule non disponible');
        
        bilanModule = window.bilanModule || null;
        if (!bilanModule) console.warn('Module bilanModule non disponible');
        
        plannerModule = window.plannerModule || null;
        if (!plannerModule) console.warn('Module plannerModule non disponible');
        
        todaySessionModule = window.todaySessionModule || null;
        if (!todaySessionModule) console.warn('Module todaySessionModule non disponible');
    }
    
    /**
     * Configure les écouteurs d'événements globaux
     */
    function setupEventListeners() {
        // Gestionnaire d'événements pour la déconnexion
        const logoutButton = document.getElementById('logout-button');
        if (logoutButton) {
            logoutButton.addEventListener('click', logout);
        }
        
        // Autres écouteurs d'événements globaux...
    }
    
    /**
     * Vérifie l'authentification de l'utilisateur
     */
    function checkUserAuthentication() {
        if (userModule) {
            try {
                currentUser = userModule.getUserProfile();
                if (currentUser) {
                    console.log('Utilisateur connecté:', currentUser.name);
                    updateUIForLoggedInUser(currentUser);
                } else {
                    console.log('Aucun utilisateur connecté');
                    showWelcomeScreen();
                }
            } catch (error) {
                console.error('Erreur lors de la vérification de l\'utilisateur:', error);
                showWelcomeScreen();
            }
        } else {
            console.log('Module utilisateur non disponible, affichage du mode invité');
            showWelcomeScreen();
        }
    }
    
    /**
     * Met à jour l'interface pour un utilisateur connecté
     */
    function updateUIForLoggedInUser(user) {
        const welcomeMessage = document.querySelector('.welcome p');
        if (welcomeMessage) {
            welcomeMessage.textContent = `Bonjour ${user.name} ! Bienvenue sur votre espace Bilan Vital.`;
        }
        
        // Mise à jour des autres éléments de l'interface...
    }
    
    /**
     * Affiche l'écran de bienvenue pour les utilisateurs non connectés
     */
    function showWelcomeScreen() {
        const welcomeMessage = document.querySelector('.welcome p');
        if (welcomeMessage) {
            welcomeMessage.textContent = 'Bienvenue sur l\'application Bilan Vital. Évaluez votre santé et votre bien-être avec des tests personnalisés.';
        }
        
        // Autres modifications de l'interface pour les utilisateurs non connectés...
    }
    
    /**
     * Affiche le contenu principal après l'initialisation
     */
    function showMainContent() {
        // Masquer les messages de secours
        const fallbackMessages = document.querySelectorAll('.fallback-message');
        fallbackMessages.forEach(message => {
            message.style.display = 'none';
        });
        
        // Afficher les conteneurs de contenu
        const contentContainers = [
            document.getElementById('tests-container'),
            document.getElementById('bilan-container'),
            document.getElementById('planification-container'),
            document.getElementById('seance-container')
        ];
        
        contentContainers.forEach(container => {
            if (container) {
                container.classList.remove('hidden');
            }
        });
        
        // Masquer l'indicateur de chargement
        const loadingIndicator = document.getElementById('loading-indicator');
        if (loadingIndicator) {
            loadingIndicator.classList.add('hidden');
        }
    }
    
    /**
     * Affiche un message d'erreur à l'utilisateur
     */
    function showErrorMessage(message) {
        const welcomeSection = document.querySelector('.welcome');
        if (welcomeSection) {
            const errorMessage = document.createElement('div');
            errorMessage.className = 'error-message';
            errorMessage.style.color = 'red';
            errorMessage.style.marginTop = '15px';
            errorMessage.style.padding = '10px';
            errorMessage.style.border = '1px solid red';
            errorMessage.style.borderRadius = '5px';
            errorMessage.textContent = message;
            welcomeSection.appendChild(errorMessage);
        }
    }
    
    /**
     * Déconnecte l'utilisateur actuel
     */
    function logout() {
        console.log('Déconnexion de l\'utilisateur');
        if (userModule) {
            try {
                // Opérations de déconnexion...
                currentUser = null;
                showWelcomeScreen();
                console.log('Utilisateur déconnecté avec succès');
            } catch (error) {
                console.error('Erreur lors de la déconnexion:', error);
            }
        }
        // Pour l'instant, rechargeons simplement la page
        window.location.reload();
    }
    
    // Initialisation automatique au chargement du DOM
    document.addEventListener('DOMContentLoaded', initialize);
    
    // Expose l'API publique
    return {
        initialize: initialize,
        logout: logout
    };
})();

// Export du module pour utilisation dans d'autres fichiers
if (typeof module !== 'undefined' && module.exports) {
    module.exports = appModule;
} else {
    window.appModule = appModule;
}
