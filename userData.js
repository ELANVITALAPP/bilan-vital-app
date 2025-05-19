/**
 * Point d'entrée principal de l'application Bilan Vital
 * Gère l'initialisation et la configuration globale
 */

const app = (function() {
    // Configuration de l'application (constante globale)
    const APP_CONFIG = {
        appName: 'Bilan Vital',
        version: '1.0.0',
        apiEndpoint: null, // Pas d'API externe pour l'instant
        debug: false,
        theme: 'light'
    };
    
    // État de l'application (variables qui changent)
    let isInitialized = false;
    let userAuthenticated = false;
    let userProfile = null;
    
    /**
     * Initialise l'application
     * @returns {Promise<boolean>} Succès de l'initialisation
     */
    async function initialize() {
        if (isInitialized) {
            console.warn('L\'application est déjà initialisée');
            return true;
        }
        
        try {
            // Afficher le message de chargement
            showLoadingScreen('Initialisation de l\'application...');
            
            // Vérifier la compatibilité du navigateur
            if (!checkBrowserCompatibility()) {
                showError('Votre navigateur n\'est pas compatible avec cette application. Veuillez utiliser une version récente de Chrome, Firefox, Safari ou Edge.');
                return false;
            }
            
            // Initialiser les modules principaux
            initializeModules();
            
            // Vérifier l'authentification
            userAuthenticated = await checkAuthentication();
            
            // Si l'utilisateur est authentifié, charger son profil
            if (userAuthenticated) {
                userProfile = await loadUserProfile();
            }
            
            // Charger les préférences de l'utilisateur
            loadUserPreferences();
            
            // Initialiser l'interface utilisateur
            initializeUI();
            
            // Définir l'application comme initialisée
            isInitialized = true;
            
            // Masquer le message de chargement
            hideLoadingScreen();
            
            // Déclencher l'événement d'initialisation
            document.dispatchEvent(new CustomEvent('app:initialized'));
            
            return true;
        } catch (error) {
            console.error('Erreur lors de l\'initialisation de l\'application:', error);
            showError('Une erreur est survenue lors de l\'initialisation de l\'application. Veuillez réessayer.');
            
            return false;
        }
    }
    
    /**
     * Vérifie la compatibilité du navigateur
     * @returns {boolean} Navigateur compatible
     */
    function checkBrowserCompatibility() {
        // Vérifier les fonctionnalités essentielles
        const REQUIRED_FEATURES = [
            'Promise' in window,
            'localStorage' in window,
            'fetch' in window,
            'CustomEvent' in window
        ];
        
        return REQUIRED_FEATURES.every(feature => feature === true);
    }
    
    /**
     * Initialise les modules principaux de l'application
     */
    function initializeModules() {
        // Modules utilitaires
        try {
            // S'assurer que les modules sont disponibles
            if (!window.helpers) {
                console.warn('Module helpers non disponible');
            }
            
            if (!window.storage) {
                console.warn('Module storage non disponible');
            }
            
            if (!window.charts) {
                console.warn('Module charts non disponible');
            }
        } catch (error) {
            console.error('Erreur lors de l\'initialisation des modules utilitaires:', error);
        }
        
        // Modules de données
        try {
            if (!window.testsData) {
                console.warn('Module testsData non disponible');
            }
            
            if (!window.userData) {
                console.warn('Module userData non disponible');
            }
        } catch (error) {
            console.error('Erreur lors de l\'initialisation des modules de données:', error);
        }
        
        // Modules de fonctionnalités
        try {
            if (!window.testsModule) {
                console.warn('Module testsModule non disponible');
            }
            
            if (!window.bilanModule) {
                console.warn('Module bilanModule non disponible');
            }
            
            if (!window.plannerModule) {
                console.warn('Module plannerModule non disponible');
            }
            
            if (!window.todaySessionModule) {
                console.warn('Module todaySessionModule non disponible');
            }
        } catch (error) {
            console.error('Erreur lors de l\'initialisation des modules de fonctionnalités:', error);
        }
        
        // Module de navigation
        try {
            if (!window.navigation) {
                console.warn('Module navigation non disponible');
            }
        } catch (error) {
            console.error('Erreur lors de l\'initialisation du module de navigation:', error);
        }
    }
    
    /**
     * Vérifie si l'utilisateur est authentifié
     * @returns {Promise<boolean>} Utilisateur authentifié
     */
    async function checkAuthentication() {
        // Dans un contexte réel, vérifierait l'authentification avec le service d'authentification de GoodBarber
        
        return new Promise(resolve => {
            // Simuler un délai d'authentification
            setTimeout(() => {
                // Vérifier si l'URL contient un paramètre d'authentification
                const urlParams = new URLSearchParams(window.location.search);
                const authToken = urlParams.get('auth_token');
                
                if (authToken) {
                    // Stocker le token d'authentification
                    localStorage.setItem('auth_token', authToken);
                    resolve(true);
                } else {
                    // Vérifier si un token existe déjà en localStorage
                    const existingToken = localStorage.getItem('auth_token');
                    resolve(!!existingToken);
                }
            }, 500);
        });
    }
    
    /**
     * Déconnecte l'utilisateur
     * Fonction manquante qui était référencée
     */
    function logout() {
        console.log("Fonction logout à implémenter");
        try {
            // Supprimer le token d'authentification
            localStorage.removeItem('auth_token');
            
            // Réinitialiser l'état
            userAuthenticated = false;
            userProfile = null;
            
            // Rediriger vers la page d'accueil
            window.location.href = '/bilan-vital-app/';
        } catch (error) {
            console.error('Erreur lors de la déconnexion:', error);
        }
    }
    
    /**
     * Charge le profil utilisateur
     * @returns {Promise<Object>} Profil utilisateur
     */
    async function loadUserProfile() {
        try {
            // Utiliser le module userData pour récupérer le profil
            if (window.userData && typeof window.userData.getUserProfile === 'function') {
                return await window.userData.getUserProfile();
            }
            
            // Fallback si le module n'est pas disponible
            return null;
        } catch (error) {
            console.error('Erreur lors du chargement du profil utilisateur:', error);
            return null;
        }
    }
    
    /**
     * Charge les préférences de l'utilisateur
     */
    function loadUserPreferences() {
        try {
            // Récupérer le thème stocké en localStorage
            const savedTheme = localStorage.getItem('theme');
            if (savedTheme) {
                APP_CONFIG.theme = savedTheme;
                applyTheme(savedTheme);
            }
        } catch (error) {
            console.error('Erreur lors du chargement des préférences:', error);
        }
    }
    
    /**
     * Initialise l'interface utilisateur
     */
    function initializeUI() {
        try {
            // Appliquer le thème actuel
            applyTheme(APP_CONFIG.theme);
            
            // Initialiser les liens de navigation
            initializeNavigation();
            
            // Initialiser les gestionnaires d'événements pour l'UI
            initializeEventListeners();
        } catch (error) {
            console.error('Erreur lors de l\'initialisation de l\'UI:', error);
        }
    }
    
    /**
     * Initialise les liens de navigation
     */
    function initializeNavigation() {
        try {
            // Récupérer tous les liens de navigation
            const navLinks = document.querySelectorAll('nav a');
            
            // Ajouter les écouteurs d'événements
            navLinks.forEach(link => {
                link.addEventListener('click', function(event) {
                    // Empêcher le comportement par défaut
                    event.preventDefault();
                    
                    // Récupérer la cible
                    const target = this.getAttribute('href');
                    
                    // Si c'est un lien externe (commence par http)
                    if (target.startsWith('http')) {
                        window.open(target, '_blank');
                        return;
                    }
                    
                    // Si c'est un lien d'ancre (commence par #)
                    if (target.startsWith('#')) {
                        const targetId = target.substring(1);
                        const targetElement = document.getElementById(targetId);
                        
                        if (targetElement) {
                            // Faire défiler jusqu'à l'élément
                            targetElement.scrollIntoView({ behavior: 'smooth' });
                            
                            // Déclencher un événement de navigation pour les modules
                            document.dispatchEvent(new CustomEvent('navigation:change', {
                                detail: {
                                    path: `feature/${targetId}`
                                }
                            }));
                        }
                    }
                });
            });
        } catch (error) {
            console.error('Erreur lors de l\'initialisation de la navigation:', error);
        }
    }
    
    /**
     * Initialise les gestionnaires d'événements pour l'UI
     */
    function initializeEventListeners() {
        try {
            // Écouteur pour le changement de thème
            const themeToggle = document.getElementById('themeToggle');
            if (themeToggle) {
                themeToggle.addEventListener('click', function() {
                    const newTheme = APP_CONFIG.theme === 'light' ? 'dark' : 'light';
                    setTheme(newTheme);
                });
            }
            
            // Écouteur pour le bouton de déconnexion
            const logoutButton = document.getElementById('logoutButton');
            if (logoutButton) {
                logoutButton.addEventListener('click', logout);
            }
        } catch (error) {
            console.error('Erreur lors de l\'initialisation des écouteurs d\'événements:', error);
        }
    }
    
    /**
     * Affiche un message de chargement
     * @param {string} message - Message à afficher
     */
    function showLoadingScreen(message) {
        try {
            // Vérifier si un écran de chargement existe déjà
            let loadingScreen = document.getElementById('loadingScreen');
            
            if (!loadingScreen) {
                // Créer l'écran de chargement
                loadingScreen = document.createElement('div');
                loadingScreen.id = 'loadingScreen';
                loadingScreen.className = 'loading-screen';
                
                // Créer le contenu
                loadingScreen.innerHTML = `
                    <div class="loading-content">
                        <div class="loading-spinner"></div>
                        <p class="loading-message">${message || 'Chargement en cours...'}</p>
                    </div>
                `;
                
                // Ajouter au document
                document.body.appendChild(loadingScreen);
            } else {
                // Mettre à jour le message
                const loadingMessage = loadingScreen.querySelector('.loading-message');
                if (loadingMessage) {
                    loadingMessage.textContent = message || 'Chargement en cours...';
                }
                
                // S'assurer que l'écran est visible
                loadingScreen.style.display = 'flex';
            }
        } catch (error) {
            console.error('Erreur lors de l\'affichage de l\'écran de chargement:', error);
        }
    }
    
    /**
     * Masque le message de chargement
     */
    function hideLoadingScreen() {
        try {
            const loadingScreen = document.getElementById('loadingScreen');
            if (loadingScreen) {
                // Ajouter une classe pour une animation de disparition
                loadingScreen.classList.add('loading-screen-hidden');
                
                // Supprimer après l'animation
                setTimeout(() => {
                    if (loadingScreen.parentNode) {
                        loadingScreen.parentNode.removeChild(loadingScreen);
                    }
                }, 300);
            }
        } catch (error) {
            console.error('Erreur lors du masquage de l\'écran de chargement:', error);
        }
    }
    
    /**
     * Affiche un message d'erreur
     * @param {string} message - Message d'erreur
     * @param {string} type - Type d'erreur (error, warning, info)
     */
    function showError(message, type = 'error') {
        try {
            // Vérifier si un conteneur d'erreur existe déjà
            let errorContainer = document.getElementById('errorContainer');
            
            if (!errorContainer) {
                // Créer le conteneur d'erreur
                errorContainer = document.createElement('div');
                errorContainer.id = 'errorContainer';
                errorContainer.className = 'error-container';
                
                // Ajouter au document
                document.body.appendChild(errorContainer);
            }
            
            // Créer le message d'erreur
            const errorElement = document.createElement('div');
            errorElement.className = `error-message error-${type}`;
            errorElement.innerHTML = `
                <div class="error-icon"></div>
                <div class="error-text">${message}</div>
                <button class="error-close">&times;</button>
            `;
            
            // Ajouter au conteneur
            errorContainer.appendChild(errorElement);
            
            // Ajouter l'écouteur pour fermer le message
            const closeButton = errorElement.querySelector('.error-close');
            if (closeButton) {
                closeButton.addEventListener('click', () => {
                    errorElement.classList.add('error-hidden');
                    setTimeout(() => {
                        if (errorElement.parentNode) {
                            errorElement.parentNode.removeChild(errorElement);
                        }
                    }, 300);
                });
            }
            
            // Fermer automatiquement après un délai (sauf pour les erreurs)
            if (type !== 'error') {
                setTimeout(() => {
                    errorElement.classList.add('error-hidden');
                    setTimeout(() => {
                        if (errorElement.parentNode) {
                            errorElement.parentNode.removeChild(errorElement);
                        }
                    }, 300);
                }, 5000);
            }
        } catch (error) {
            console.error('Erreur lors de l\'affichage du message d\'erreur:', error);
        }
    }
    
    /**
     * Change le thème de l'application
     * @param {string} theme - Thème à appliquer (light ou dark)
     */
    function setTheme(theme) {
        if (theme !== 'light' && theme !== 'dark') {
            console.warn('Thème non valide. Utilisation du thème par défaut: light');
            theme = 'light';
        }
        
        // Mettre à jour la configuration
        APP_CONFIG.theme = theme;
        
        // Sauvegarder dans localStorage
        localStorage.setItem('theme', theme);
        
        // Appliquer le thème
        applyTheme(theme);
    }
    
    /**
     * Applique un thème
     * @param {string} theme - Thème à appliquer
     */
    function applyTheme(theme) {
        try {
            // Appliquer la classe de thème au body
            document.body.classList.remove('theme-light', 'theme-dark');
            document.body.classList.add(`theme-${theme}`);
            
            // Mettre à jour les métadonnées
            const metaThemeColor = document.querySelector('meta[name="theme-color"]');
            if (metaThemeColor) {
                metaThemeColor.setAttribute('content', theme === 'dark' ? '#333333' : '#00813F');
            }
        } catch (error) {
            console.error('Erreur lors de l\'application du thème:', error);
        }
    }
    
    // Le reste du code de app.js reste en camelCase car il contient principalement des fonctions et des variables qui changent...
    
    // API publique
    return {
        initialize,
        config: APP_CONFIG, // Renommé mais garde la même clé dans l'API
        logout,
        showError,
        setTheme,
        isAuthenticated: () => userAuthenticated,
        getUserProfile: () => userProfile
    };
})();

// Initialiser l'application au chargement du document
document.addEventListener('DOMContentLoaded', function() {
    app.initialize().then(success => {
        if (!success) {
            console.error('L\'initialisation de l\'application a échoué');
        }
    });
});

// Export global
window.app = app;
