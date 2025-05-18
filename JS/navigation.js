/**
 * Module de gestion de la navigation pour l'application Bilan Vital
 * Gère le routage entre les différentes pages et fonctionnalités de l'application
 */

const navigation = (function() {
    // Constantes globales
    const ROUTE_TYPES = {
        HOME: 'home',
        CATEGORY: 'category',
        TEST: 'test',
        FEATURE: 'feature',
        SETTINGS: 'settings',
        PROFILE: 'profile',
        NOT_FOUND: '404'
    };

    // Stockage des routes et de l'état actuel
    const routes = {};
    let currentPage = null;
    let previousPage = null;
    let contentContainer = null;
    
    // Dépendances
    let testsModule = null;
    let bilanModule = null;
    let plannerModule = null;
    let todaySessionModule = null;
    
    /**
     * Initialise le module de navigation
     * @param {string} containerId - ID du conteneur principal de contenu
     */
    function initialize(containerId = 'mainContent') {
        console.log('Initialisation du module de navigation...');
        
        // Définir le conteneur principal
        contentContainer = document.getElementById(containerId);
        if (!contentContainer) {
            console.error(`Conteneur de contenu non trouvé: ${containerId}`);
            console.log('Création d\'un conteneur de contenu de secours');
            
            // Créer un conteneur de secours si nécessaire
            contentContainer = document.createElement('main');
            contentContainer.id = containerId;
            document.body.appendChild(contentContainer);
        }
        
        // Charger les dépendances
        loadDependencies();
        
        // Définir les routes
        defineRoutes();
        
        // Configurer la gestion de l'historique
        window.addEventListener('popstate', handlePopState);
        
        // Écouter les clics sur les liens de navigation
        document.addEventListener('click', handleNavigationClick);
        
        // Naviguer vers la page initiale (avec un délai pour s'assurer que tout est prêt)
        setTimeout(() => {
            const path = getPathFromUrl();
            console.log('Chemin initial détecté:', path);
            navigateTo(path || ROUTE_TYPES.HOME);
        }, 100);
        
        // Log de débogage
        console.log('Module de navigation initialisé avec succès');
    }
    
    /**
     * Charge les dépendances du module
     */
    function loadDependencies() {
        // Récupération sécurisée des modules
        if (window.testsModule) testsModule = window.testsModule;
        if (window.bilanModule) bilanModule = window.bilanModule;
        if (window.plannerModule) plannerModule = window.plannerModule;
        if (window.todaySessionModule) todaySessionModule = window.todaySessionModule;
        
        // Log de statut des dépendances
        console.log('Statut des dépendances du module de navigation:');
        console.log('- testsModule:', testsModule ? 'Disponible' : 'Non disponible');
        console.log('- bilanModule:', bilanModule ? 'Disponible' : 'Non disponible');
        console.log('- plannerModule:', plannerModule ? 'Disponible' : 'Non disponible');
        console.log('- todaySessionModule:', todaySessionModule ? 'Disponible' : 'Non disponible');
    }
    
    /**
     * Définit toutes les routes de l'application
     */
    function defineRoutes() {
        // Page d'accueil
        routes[ROUTE_TYPES.HOME] = {
            title: 'Bilan Vital',
            render: renderHomePage
        };
        
        // Routes des catégories
        routes['tests'] = {
            title: 'Tests de santé',
            render: renderTestsPage
        };
        
        routes['category/:id'] = {
            title: 'Catégorie',
            render: renderCategoryPage
        };
        
        // Routes des tests
        routes['test/:id'] = {
            title: 'Test',
            render: renderTestPage
        };
        
        // Routes des fonctionnalités spéciales
        routes['bilan'] = {
            title: 'Bilan récapitulatif',
            render: renderBilanPage
        };
        
        routes['planification'] = {
            title: 'Planifier ma semaine',
            render: renderPlannerPage
        };
        
        routes['seance'] = {
            title: 'Séance du jour',
            render: renderTodaySessionPage
        };
        
        // Compatibilité avec les anciennes routes (feature/xxx)
        routes['feature/bilan'] = {
            title: 'Bilan récapitulatif',
            render: renderBilanPage
        };
        
        routes['feature/planner'] = {
            title: 'Planifier ma semaine',
            render: renderPlannerPage
        };
        
        routes['feature/todaySession'] = {
            title: 'Séance du jour',
            render: renderTodaySessionPage
        };
        
        // Page de paramètres
        routes[ROUTE_TYPES.SETTINGS] = {
            title: 'Paramètres',
            render: renderSettingsPage
        };
        
        // Page de profil
        routes[ROUTE_TYPES.PROFILE] = {
            title: 'Mon profil',
            render: renderProfilePage
        };
        
        // Page d'erreur 404
        routes[ROUTE_TYPES.NOT_FOUND] = {
            title: 'Page non trouvée',
            render: renderNotFoundPage
        };
        
        console.log('Routes définies:', Object.keys(routes));
    }
    
    /**
     * Gère les événements popstate (navigation avec boutons précédent/suivant)
     * @param {Event} event - Événement popstate
     */
    function handlePopState(event) {
        const path = getPathFromUrl();
        console.log('Navigation popstate vers:', path);
        navigateTo(path || ROUTE_TYPES.HOME, false);
    }
    
    /**
     * Vérifie si un élément est un nœud DOM valide avec les méthodes attendues
     * @param {*} element - Élément à vérifier
     * @returns {boolean} Vrai si l'élément est un nœud DOM valide
     */
    function isValidElement(element) {
        return element && typeof element === 'object' && 
               typeof element.hasAttribute === 'function' &&
               typeof element.getAttribute === 'function';
    }
    
    /**
     * Gère les clics sur les liens de navigation
     * @param {Event} event - Événement de clic
     */
    function handleNavigationClick(event) {
        // Vérifier si le clic est sur un élément de navigation
        let target = event.target;
        
        // Vérifier si l'élément target est valide
        if (!isValidElement(target)) return;
        
        // Remonter jusqu'au lien si le clic est sur un élément enfant
        try {
            while (target && 
                  target.tagName !== 'A' && 
                  !target.hasAttribute('data-nav')) {
                target = target.parentNode;
                // Vérifier que le parent est un élément DOM valide
                if (!isValidElement(target) || target === document.body) return;
            }
            
            // Vérifier à nouveau si target est valide et a les attributs nécessaires
            if (!isValidElement(target)) return;
            
            // Ignorer si ce n'est pas un élément de navigation
            if (!(target.hasAttribute('href') || target.hasAttribute('data-nav'))) return;
            
            // Récupérer la destination
            const href = target.getAttribute('data-nav') || target.getAttribute('href');
            
            // Ignorer les liens externes et les liens sans href
            if (!href || href.startsWith('http') || href.startsWith('mailto:')) return;
            
            // Empêcher le comportement par défaut
            event.preventDefault();
            
            // Extraire le chemin
            let path = href;
            
            // Nettoyer le chemin
            if (path.startsWith('#/')) {
                path = path.substring(2);
            } else if (path.startsWith('#')) {
                path = path.substring(1);
            } else if (path.startsWith('/')) {
                path = path.substring(1);
            }
            
            // Naviguer vers la page
            console.log('Navigation par clic vers:', path);
            navigateTo(path);
        } catch (error) {
            console.error('Erreur lors de la gestion du clic de navigation:', error);
        }
    }
    
    /**
     * Extrait le chemin de l'URL actuelle
     * @returns {string} Chemin de l'URL (sans le fragment #/)
     */
    function getPathFromUrl() {
        // Essayer d'extraire le chemin depuis différentes parties de l'URL
        let path = '';
        
        // Priorité 1: Utiliser le hash (pour les SPAs)
        if (window.location.hash) {
            if (window.location.hash.startsWith('#/')) {
                path = window.location.hash.substring(2);
            } else if (window.location.hash.startsWith('#')) {
                path = window.location.hash.substring(1);
            }
        } 
        // Priorité 2: Utiliser le pathname (pour les sites sans hash)
        else if (window.location.pathname) {
            // Extraire uniquement la partie après le nom du dépôt
            const parts = window.location.pathname.split('/');
            // Si le chemin contient le nom du dépôt (bilan-vital-app), prendre ce qui suit
            const repoIndex = parts.indexOf('bilan-vital-app');
            if (repoIndex !== -1 && parts.length > repoIndex + 1) {
                path = parts.slice(repoIndex + 1).join('/');
            } else {
                // Sinon prendre la dernière partie du chemin
                path = parts[parts.length - 1];
            }
        }
        
        // Nettoyer le chemin (enlever index.html, etc.)
        path = path.replace('index.html', '').replace(/\/$/, '');
        
        console.log('Chemin extrait de l\'URL:', path || 'home');
        
        // Si le chemin est vide, retourner 'home'
        return path || ROUTE_TYPES.HOME;
    }
    
    /**
     * Navigue vers une page spécifique
     * @param {string} path - Chemin de la page
     * @param {boolean} pushState - Mettre à jour l'historique de navigation
     */
    function navigateTo(path, pushState = true) {
        console.log('Tentative de navigation vers:', path);
        
        // Enregistrer la page précédente
        previousPage = currentPage;
        
        // Trouver la route correspondante
        const route = findRoute(path);
        if (!route) {
            console.warn(`Route non trouvée pour le chemin: ${path}`);
            // Si la route n'existe pas, afficher la page 404
            navigateTo(ROUTE_TYPES.NOT_FOUND);
            return;
        }
        
        // Mettre à jour l'URL si nécessaire
        if (pushState) {
            window.history.pushState(null, route.title, `#/${path}`);
        }
        
        // Mettre à jour le titre de la page
        document.title = route.title;
        
        // Mettre à jour la page courante
        currentPage = path;
        
        // Afficher le contenu de la page
        try {
            route.render(path);
            console.log(`Page "${path}" rendue avec succès`);
        } catch (error) {
            console.error(`Erreur lors du rendu de la page "${path}":`, error);
            renderErrorPage(error);
        }
        
        // Faire défiler vers le haut
        window.scrollTo(0, 0);
        
        // Déclencher un événement de changement de navigation
        const event = new CustomEvent('navigation:change', {
            detail: {
                path: path,
                previousPath: previousPage
            }
        });
        document.dispatchEvent(event);
    }
    
    /**
     * Trouve la route correspondant au chemin spécifié
     * @param {string} path - Chemin de la page
     * @returns {Object|null} Route correspondante ou null
     */
    function findRoute(path) {
        // Vérifier d'abord les routes exactes
        if (routes[path]) {
            return routes[path];
        }
        
        // Vérifier les routes avec paramètres
        for (const routePath in routes) {
            if (routePath.includes(':')) {
                const routeRegex = new RegExp('^' + routePath.replace(/:\w+/g, '([^/]+)') + '$');
                if (routeRegex.test(path)) {
                    return routes[routePath];
                }
            }
        }
        
        return null;
    }
    
    /**
     * Extrait les paramètres d'une route
     * @param {string} routePath - Chemin de la route avec paramètres (:id)
     * @param {string} path - Chemin actuel
     * @returns {Object} Paramètres extraits
     */
    function extractParams(routePath, path) {
        const params = {};
        
        // Découper les chemins en segments
        const routeSegments = routePath.split('/');
        const pathSegments = path.split('/');
        
        // Parcourir les segments de la route
        for (let i = 0; i < routeSegments.length; i++) {
            // Vérifier si le segment est un paramètre
            if (routeSegments[i].startsWith(':')) {
                const paramName = routeSegments[i].substring(1);
                params[paramName] = pathSegments[i];
            }
        }
        
        return params;
    }
    
    /**
     * Affiche un message d'erreur
     * @param {Error} error - Erreur survenue
     */
    function renderErrorPage(error) {
        if (!contentContainer) return;
        
        contentContainer.innerHTML = `
            <div class="errorContainer">
                <h1>Erreur</h1>
                <p>Une erreur est survenue lors du chargement de la page.</p>
                <p class="errorDetails">${error.message || 'Erreur inconnue'}</p>
                <button class="btn btnPrimary" data-nav="home">Retour à l'accueil</button>
            </div>
        `;
    }
    
    /**
     * Rend une page d'état temporaire pour les modules manquants
     * @param {string} title - Titre de la page
     * @param {string} message - Message à afficher
     */
    function renderTemporaryPage(title, message) {
        if (!contentContainer) return;
        
        contentContainer.innerHTML = `
            <section class="tempPageContainer">
                <h2>${title}</h2>
                <p>${message}</p>
                <p class="fallback-message">Cette section est en cours de développement. Elle sera pleinement fonctionnelle très bientôt.</p>
                <div class="navigationButtons">
                    <button class="btn btnOutline" data-nav="home">Retour à l'accueil</button>
                </div>
            </section>
        `;
    }
    
    /**
     * Rend le contenu de la page d'accueil
     */
    function renderHomePage() {
        if (!contentContainer) return;
        
        contentContainer.innerHTML = `
            <section class="welcome">
                <h2>Bienvenue sur l'application Bilan Vital</h2>
                <p>Évaluez votre santé et votre bien-être avec des tests personnalisés et recevez des recommandations adaptées.</p>
            </section>
            
            <section id="features-section">
                <h2>Fonctionnalités principales</h2>
                <div class="features-grid">
                    <div class="feature-card" data-nav="tests">
                        <h3>Tests de santé</h3>
                        <p>Évaluez votre condition physique, mentale et émotionnelle grâce à nos tests personnalisés.</p>
                        <button class="btn" data-nav="tests">Découvrir</button>
                    </div>
                    <div class="feature-card" data-nav="bilan">
                        <h3>Bilan personnel</h3>
                        <p>Consultez le récapitulatif de vos résultats et suivez votre progression dans le temps.</p>
                        <button class="btn" data-nav="bilan">Découvrir</button>
                    </div>
                    <div class="feature-card" data-nav="planification">
                        <h3>Planification</h3>
                        <p>Planifiez vos activités hebdomadaires en fonction de vos objectifs et disponibilités.</p>
                        <button class="btn" data-nav="planification">Découvrir</button>
                    </div>
                    <div class="feature-card" data-nav="seance">
                        <h3>Séance du jour</h3>
                        <p>Recevez des recommandations adaptées à votre état du jour et à vos objectifs.</p>
                        <button class="btn" data-nav="seance">Découvrir</button>
                    </div>
                </div>
            </section>
        `;
    }
    
    /**
     * Rend la page principale des tests
     */
    function renderTestsPage() {
        renderTemporaryPage("Tests de santé", "Accédez à différents tests pour évaluer votre condition physique et mentale.");
    }
    
    /**
     * Rend le contenu d'une page de catégorie
     * @param {string} path - Chemin de la page
     */
    function renderCategoryPage(path) {
        if (!contentContainer) return;
        
        // Extraire l'ID de la catégorie
        const params = extractParams('category/:id', path);
        const categoryId = params.id;
        
        // Si le module de tests n'est pas disponible, afficher une page temporaire
        if (!testsModule || !testsModule.loadCategory) {
            renderTemporaryPage(
                "Catégorie de tests", 
                `Cette catégorie de tests vous permettra d'évaluer différents aspects de votre santé et bien-être.`
            );
            return;
        }
        
        // Préparer le conteneur pour la catégorie
        contentContainer.innerHTML = `
            <div id="categoryContainer">
                <div class="loading">
                    <div class="spinner"></div>
                    <p>Chargement de la catégorie...</p>
                </div>
            </div>
        `;
        
        // Utiliser le module de tests pour charger la catégorie
        testsModule.loadCategory(categoryId);
    }
    
    /**
     * Rend le contenu d'une page de test
     * @param {string} path - Chemin de la page
     */
    function renderTestPage(path) {
        if (!contentContainer) return;
        
        // Extraire l'ID du test
        const params = extractParams('test/:id', path);
        const testId = params.id;
        
        // Si le module de tests n'est pas disponible, afficher une page temporaire
        if (!testsModule || !testsModule.startTest) {
            renderTemporaryPage(
                "Test spécifique", 
                `Ce test vous permettra d'évaluer un aspect spécifique de votre santé et bien-être.`
            );
            return;
        }
        
        // Préparer le conteneur pour le test
        contentContainer.innerHTML = `
            <div id="testContainer">
                <div class="loading">
                    <div class="spinner"></div>
                    <p>Chargement du test...</p>
                </div>
            </div>
        `;
        
        // Utiliser le module de tests pour démarrer le test
        testsModule.startTest(testId);
    }
    
    /**
     * Rend la page du bilan récapitulatif
     */
    function renderBilanPage() {
        if (!contentContainer) return;
        
        // Si le module de bilan n'est pas disponible, afficher une page temporaire
        if (!bilanModule || !bilanModule.loadBilan) {
            renderTemporaryPage(
                "Bilan récapitulatif", 
                "Cette section vous permettra bientôt de consulter le récapitulatif de vos résultats et de votre progression."
            );
            return;
        }
        
        // Préparer le conteneur pour le bilan
        contentContainer.innerHTML = `
            <div id="bilanContainer">
                <div class="loading">
                    <div class="spinner"></div>
                    <p>Chargement du bilan récapitulatif...</p>
                </div>
            </div>
        `;
        
        // Utiliser le module de bilan pour charger le bilan
        bilanModule.loadBilan();
    }
    
    /**
     * Rend la page du planificateur hebdomadaire
     */
    function renderPlannerPage() {
        if (!contentContainer) return;
        
        // Si le module de planification n'est pas disponible, afficher une page temporaire
        if (!plannerModule || !plannerModule.loadExistingPlan) {
            renderTemporaryPage(
                "Planification hebdomadaire", 
                "Cette section vous permettra bientôt de planifier vos activités hebdomadaires en fonction de vos objectifs."
            );
            return;
        }
        
        // Préparer le conteneur pour le planificateur
        contentContainer.innerHTML = `
            <div id="plannerContainer">
                <div class="loading">
                    <div class="spinner"></div>
                    <p>Chargement du planificateur...</p>
                </div>
            </div>
        `;
        
        // Utiliser le module de planification pour charger le planificateur
        plannerModule.loadExistingPlan();
    }
    
    /**
     * Rend la page de recommandation quotidienne
     */
    function renderTodaySessionPage() {
        if (!contentContainer) return;
        
        // Si le module de recommandation quotidienne n'est pas disponible, afficher une page temporaire
        if (!todaySessionModule || !todaySessionModule.loadExistingEvaluation) {
            renderTemporaryPage(
                "Séance du jour", 
                "Cette section vous proposera bientôt des séances quotidiennes adaptées à votre profil."
            );
            return;
        }
        
        // Préparer le conteneur pour la recommandation quotidienne
        contentContainer.innerHTML = `
            <div id="todaySessionContainer">
                <div class="loading">
                    <div class="spinner"></div>
                    <p>Chargement de la recommandation quotidienne...</p>
                </div>
            </div>
        `;
        
        // Utiliser le module de recommandation quotidienne
        todaySessionModule.loadExistingEvaluation();
    }
    
    /**
     * Rend la page de paramètres
     */
    function renderSettingsPage() {
        renderTemporaryPage("Paramètres", "Personnalisez votre expérience avec Bilan Vital.");
    }
    
    /**
     * Rend la page de profil utilisateur
     */
    function renderProfilePage() {
        renderTemporaryPage("Mon profil", "Consultez et modifiez vos informations personnelles.");
    }
    
    /**
     * Rend la page d'erreur 404
     */
    function renderNotFoundPage() {
        if (!contentContainer) return;
        
        contentContainer.innerHTML = `
            <div class="notFoundContainer">
                <h1>Page non trouvée</h1>
                <p>La page que vous recherchez n'existe pas ou a été déplacée.</p>
                <button class="btn btnPrimary" data-nav="home">Retour à l'accueil</button>
            </div>
        `;
    }
    
    /**
     * Naviguer vers une catégorie spécifique
     * @param {string} categoryId - ID de la catégorie
     */
    function navigateToCategory(categoryId) {
        navigateTo(`category/${categoryId}`);
    }
    
    /**
     * Naviguer vers un test spécifique
     * @param {string} testId - ID du test
     */
    function navigateToTest(testId) {
        navigateTo(`test/${testId}`);
    }
    
    /**
     * Naviguer vers une fonctionnalité spéciale
     * @param {string} featureId - ID de la fonctionnalité
     */
    function navigateToFeature(featureId) {
        navigateTo(`feature/${featureId}`);
    }
    
    /**
     * Naviguer vers la page d'accueil
     */
    function navigateToHome() {
        navigateTo(ROUTE_TYPES.HOME);
    }
    
    /**
     * Naviguer vers la page précédente
     */
    function navigateBack() {
        if (previousPage) {
            navigateTo(previousPage);
        } else {
            navigateToHome();
        }
    }
    
    // API publique
    return {
        initialize,
        navigateTo,
        navigateToCategory,
        navigateToTest,
        navigateToFeature,
        navigateToHome,
        navigateBack
    };
})();

// Initialisation au chargement du document
document.addEventListener('DOMContentLoaded', function() {
    navigation.initialize();
    console.log('Navigation initialisée au chargement du document');
});

// Export du module
window.navigation = navigation;
