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
    const testsModule = window.testsModule || {};
    const bilanModule = window.bilanModule || {};
    const plannerModule = window.plannerModule || {};
    const todaySessionModule = window.todaySessionModule || {};
    
    /**
     * Initialise le module de navigation
     * @param {string} containerId - ID du conteneur principal de contenu
     */
    function initialize(containerId = 'mainContent') {
        // Définir le conteneur principal
        contentContainer = document.getElementById(containerId);
        if (!contentContainer) {
            console.error(`Conteneur de contenu non trouvé: ${containerId}`);
            return;
        }
        
        // Définir les routes
        defineRoutes();
        
        // Configurer la gestion de l'historique
        window.addEventListener('popstate', handlePopState);
        
        // Écouter les clics sur les liens de navigation
        document.addEventListener('click', handleNavigationClick);
        
        // Naviguer vers la page initiale
        const path = getPathFromUrl();
        navigateTo(path || ROUTE_TYPES.HOME);
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
        routes['feature/bilan'] = {
            title: 'Bilan récapitulatif',
            render: renderBilanPage
        };
        
        routes['feature/planner'] = {
            title: 'Planifier ma semaine',
            render: renderPlannerPage
        };
        
        routes['feature/todaySession'] = {
            title: 'Quelle séance aujourd\'hui?',
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
    }
    
    /**
     * Gère les événements popstate (navigation avec boutons précédent/suivant)
     * @param {Event} event - Événement popstate
     */
    function handlePopState(event) {
        const path = getPathFromUrl();
        navigateTo(path || ROUTE_TYPES.HOME, false);
    }
    
    /**
     * Gère les clics sur les liens de navigation
     * @param {Event} event - Événement de clic
     */
    function handleNavigationClick(event) {
        // Vérifier si le clic est sur un élément de navigation
        let target = event.target;
        
        // Remonter jusqu'au lien si le clic est sur un élément enfant
        while (target && target.tagName !== 'A' && !target.hasAttribute('data-nav')) {
            target = target.parentNode;
            if (!target || target === document.body) return;
        }
        
        // Ignorer si ce n'est pas un élément de navigation
        if (!target || !(target.hasAttribute('href') || target.hasAttribute('data-nav'))) return;
        
        // Récupérer la destination
        const href = target.getAttribute('data-nav') || target.getAttribute('href');
        
        // Ignorer les liens externes et les liens sans href
        if (!href || href.startsWith('http') || href.startsWith('mailto:')) return;
        
        // Empêcher le comportement par défaut
        event.preventDefault();
        
        // Extraire le chemin
        let path = href;
        if (path.startsWith('#/')) {
            path = path.substring(2);
        } else if (path.startsWith('/')) {
            path = path.substring(1);
        }
        
        // Naviguer vers la page
        navigateTo(path);
    }
    
    /**
     * Extrait le chemin de l'URL actuelle
     * @returns {string} Chemin de l'URL (sans le fragment #/)
     */
    function getPathFromUrl() {
        // Utiliser la partie après le # ou la partie après le domaine
        let path = window.location.hash.substring(2) || window.location.pathname.substring(1);
        
        // Si le chemin est vide, retourner 'home'
        return path || ROUTE_TYPES.HOME;
    }
    
    /**
     * Navigue vers une page spécifique
     * @param {string} path - Chemin de la page
     * @param {boolean} pushState - Mettre à jour l'historique de navigation
     */
    function navigateTo(path, pushState = true) {
        // Enregistrer la page précédente
        previousPage = currentPage;
        
        // Trouver la route correspondante
        const route = findRoute(path);
        if (!route) {
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
        route.render(path);
        
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
     * Rend le contenu de la page d'accueil
     */
    async function renderHomePage() {
        if (!contentContainer) return;
        
        // Récupérer les données des catégories et fonctionnalités spéciales
        const testsData = window.testsData || {};
        const categories = testsData.getCategories ? testsData.getCategories() : [];
        const features = testsData.getSpecialFeatures ? testsData.getSpecialFeatures() : [];
        
        // Générer le HTML
        contentContainer.innerHTML = `
            <div class="homeContainer">
                <div class="specialFeatures">
                    <h2>Fonctionnalités</h2>
                    <div class="featuresGrid">
                        ${features.map(feature => `
                            <div class="featureCard" data-feature-id="${feature.id}" style="border-color: ${feature.color}">
                                <div class="featureIcon" style="background-color: ${feature.color}">
                                    <i class="icon-${feature.icon}"></i>
                                </div>
                                <div class="featureInfo">
                                    <h3>${feature.name}</h3>
                                    <p>${feature.description}</p>
                                </div>
                                <button class="btn btnOutline featureBtn" data-nav="feature/${feature.id}">
                                    Accéder
                                </button>
                            </div>
                        `).join('')}
                    </div>
                </div>
                
                <div class="testCategories">
                    <h2>Catégories de tests</h2>
                    <div class="categoriesGrid">
                        ${categories.map(category => `
                            <div class="categoryCard" data-category-id="${category.id}">
                                <div class="categoryIcon" style="background-color: ${category.color}">
                                    <i class="icon-${category.icon}"></i>
                                </div>
                                <div class="categoryInfo">
                                    <h3>${category.name}</h3>
                                    <p>${category.description}</p>
                                </div>
                                <button class="btn btnOutline categoryBtn" data-nav="category/${category.id}">
                                    Voir les tests
                                </button>
                            </div>
                        `).join('')}
                    </div>
                </div>
            </div>
        `;
        
        // Ajouter les écouteurs d'événements pour les cartes de fonctionnalités et catégories
        document.querySelectorAll('.featureCard').forEach(card => {
            card.addEventListener('click', (event) => {
                if (event.target.classList.contains('btn')) return;
                
                const featureId = card.getAttribute('data-feature-id');
                navigateTo(`feature/${featureId}`);
            });
        });
        
        document.querySelectorAll('.categoryCard').forEach(card => {
            card.addEventListener('click', (event) => {
                if (event.target.classList.contains('btn')) return;
                
                const categoryId = card.getAttribute('data-category-id');
                navigateTo(`category/${categoryId}`);
            });
        });
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
        if (testsModule && testsModule.loadCategory) {
            testsModule.loadCategory(categoryId);
        } else {
            contentContainer.innerHTML = `
                <div class="errorContainer">
                    <h1>Erreur</h1>
                    <p>Impossible de charger la catégorie. Le module de tests n'est pas disponible.</p>
                    <button class="btn btnPrimary" data-nav="home">Retour à l'accueil</button>
                </div>
            `;
        }
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
        if (testsModule && testsModule.startTest) {
            testsModule.startTest(testId);
        } else {
            contentContainer.innerHTML = `
                <div class="errorContainer">
                    <h1>Erreur</h1>
                    <p>Impossible de charger le test. Le module de tests n'est pas disponible.</p>
                    <button class="btn btnPrimary" data-nav="home">Retour à l'accueil</button>
                </div>
            `;
        }
    }
    
    /**
     * Rend la page du bilan récapitulatif
     */
    function renderBilanPage() {
        if (!contentContainer) return;
        
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
        if (bilanModule && bilanModule.loadBilan) {
            bilanModule.loadBilan();
        } else {
            contentContainer.innerHTML = `
                <div class="errorContainer">
                    <h1>Erreur</h1>
                    <p>Impossible de charger le bilan. Le module de bilan n'est pas disponible.</p>
                    <button class="btn btnPrimary" data-nav="home">Retour à l'accueil</button>
                </div>
            `;
        }
    }
    
    /**
     * Rend la page du planificateur hebdomadaire
     */
    function renderPlannerPage() {
        if (!contentContainer) return;
        
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
        if (plannerModule && plannerModule.loadExistingPlan) {
            plannerModule.loadExistingPlan();
        } else {
            contentContainer.innerHTML = `
                <div class="errorContainer">
                    <h1>Erreur</h1>
                    <p>Impossible de charger le planificateur. Le module de planification n'est pas disponible.</p>
                    <button class="btn btnPrimary" data-nav="home">Retour à l'accueil</button>
                </div>
            `;
        }
    }
    
    /**
     * Rend la page de recommandation quotidienne
     */
    function renderTodaySessionPage() {
        if (!contentContainer) return;
        
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
        if (todaySessionModule && todaySessionModule.loadExistingEvaluation) {
            todaySessionModule.loadExistingEvaluation();
        } else {
            contentContainer.innerHTML = `
                <div class="errorContainer">
                    <h1>Erreur</h1>
                    <p>Impossible de charger la recommandation quotidienne. Le module n'est pas disponible.</p>
                    <button class="btn btnPrimary" data-nav="home">Retour à l'accueil</button>
                </div>
            `;
        }
    }
    
    /**
     * Rend la page de paramètres
     */
    function renderSettingsPage() {
        if (!contentContainer) return;
        
        contentContainer.innerHTML = `
            <div class="settingsContainer">
                <h1>Paramètres</h1>
                <p>Cette page est en cours de développement.</p>
                <button class="btn btnPrimary" data-nav="home">Retour à l'accueil</button>
            </div>
        `;
    }
    
    /**
     * Rend la page de profil utilisateur
     */
    function renderProfilePage() {
        if (!contentContainer) return;
        
        contentContainer.innerHTML = `
            <div class="profileContainer">
                <h1>Mon profil</h1>
                <p>Cette page est en cours de développement.</p>
                <button class="btn btnPrimary" data-nav="home">Retour à l'accueil</button>
            </div>
        `;
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
});

// Export du module
window.navigation = navigation;
