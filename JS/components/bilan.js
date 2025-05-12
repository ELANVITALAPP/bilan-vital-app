/**
 * Module de bilan récapitulatif pour l'application Bilan Vital
 * Gère l'affichage, la génération et l'interactivité du bilan récapitulatif
 */

const bilanModule = (function() {
    // Dépendances
    const testsData = window.testsData || {}; // Défini dans tests-data.js
    const userData = window.userData || {}; // Défini dans user-data.js
    const helpers = window.helpers || {}; // Défini dans helpers.js
    const charts = window.charts || {}; // Défini dans charts.js
    
    // Constantes pour les types de vues (utilisées dans tout le module)
    const VIEW_TYPES = {
        OVERVIEW: 'overview',
        DETAILS: 'details',
        PROGRESS: 'progress',
        RECOMMENDATIONS: 'recommendations',
        RESOURCES: 'resources'
    };
    
    // Constantes pour les périodes de temps (utilisées dans tout le module)
    const PERIOD_TYPES = {
        WEEK: 'week',
        MONTH: 'month',
        QUARTER: 'quarter',
        YEAR: 'year',
        ALL: 'all'
    };
    
    // Constantes pour les types de destinataires lors du partage
    const RECIPIENT_TYPES = {
        COACH: 'coach',
        MEDIC: 'medic',
        OTHER: 'other'
    };
    
    // Constantes pour les formats d'export
    const EXPORT_FORMATS = {
        PDF: 'pdf',
        HTML: 'html',
        LINK: 'link'
    };
    
    // Constantes pour les niveaux de score
    const SCORE_THRESHOLDS = {
        EXCELLENT: 9,
        VERY_GOOD: 7.5,
        GOOD: 6,
        AVERAGE: 5,
        NEEDS_IMPROVEMENT: 3.5,
        WEAK: 2
    };
    
    // Constantes pour les niveaux de complétion
    const COMPLETION_THRESHOLDS = {
        ALMOST_COMPLETE: 0.9,
        WELL_ADVANCED: 0.7,
        HALFWAY: 0.5,
        PROGRESSING: 0.3,
        BEGINNER: 0.1
    };
    
    // État du module (variables qui changent)
    let currentView = VIEW_TYPES.OVERVIEW; 
    let currentPeriod = PERIOD_TYPES.ALL;
    let selectedCategories = [];
    
    /**
     * Initialise le module de bilan
     * Doit être appelé lors du chargement de la page
     */
    function initialize() {
        // Écouter les événements de navigation pour réinitialiser la vue si nécessaire
        document.addEventListener('navigation:change', handleNavigationChange);
    }
    
    /**
     * Gère les changements de navigation
     * @param {Event} event - Événement de navigation
     */
    function handleNavigationChange(event) {
        // Réinitialiser l'état lorsqu'on arrive sur le bilan
        if (event.detail && event.detail.path === 'feature/bilan') {
            // Réinitialiser à la vue par défaut
            currentView = VIEW_TYPES.OVERVIEW;
            currentPeriod = PERIOD_TYPES.ALL;
            selectedCategories = [];
        }
    }
    
    /**
     * Charge et affiche le bilan récapitulatif
     * @returns {Promise<boolean>} Succès du chargement
     */
    async function loadBilan() {
        try {
            const bilanContainer = document.getElementById('bilan-container');
            if (!bilanContainer) {
                console.error('Conteneur du bilan non trouvé');
                return false;
            }
            
            // Récupérer les données utilisateur et les résultats des tests
            const userProfile = await userData.getUserProfile();
            const allTestResults = await userData.getAllTestResults();
            
            // Vérifier si des tests ont été complétés
            if (!allTestResults || allTestResults.length === 0) {
                displayEmptyBilan(bilanContainer);
                return true;
            }
            
            // Créer la structure de base du bilan
            createBilanStructure(bilanContainer);
            
            // Charger la vue appropriée
            switch (currentView) {
                case VIEW_TYPES.OVERVIEW:
                    loadOverviewView(userProfile, allTestResults);
                    break;
                case VIEW_TYPES.DETAILS:
                    loadDetailsView(userProfile, allTestResults);
                    break;
                case VIEW_TYPES.PROGRESS:
                    loadProgressView(userProfile, allTestResults);
                    break;
                case VIEW_TYPES.RECOMMENDATIONS:
                    loadRecommendationsView(userProfile, allTestResults);
                    break;
                case VIEW_TYPES.RESOURCES:
                    loadResourcesView(userProfile, allTestResults);
                    break;
                default:
                    loadOverviewView(userProfile, allTestResults);
                    break;
            }
            
            // Ajouter les écouteurs d'événements pour les onglets et filtres
            setupEventListeners();
            
            return true;
        } catch (error) {
            console.error('Erreur lors du chargement du bilan:', error);
            return false;
        }
    }
    
    /**
     * Affiche un message lorsqu'aucun test n'a été complété
     * @param {HTMLElement} container - Conteneur où afficher le message
     */
    function displayEmptyBilan(container) {
        container.innerHTML = `
            <div class="empty-bilan">
                <h2>Aucun test complété</h2>
                <p>Vous n'avez pas encore complété de tests. Complétez au moins un test pour accéder à votre bilan récapitulatif.</p>
                <button class="btn btn-primary" id="start-tests-btn">Découvrir les tests</button>
            </div>
        `;
        
        // Ajouter l'écouteur d'événement pour rediriger vers les catégories de tests
        document.getElementById('start-tests-btn').addEventListener('click', () => {
            window.navigation.navigateToHome();
        });
    }
    
    /**
     * Crée la structure de base du bilan récapitulatif
     * @param {HTMLElement} container - Conteneur où créer la structure
     */
    function createBilanStructure(container) {
        container.innerHTML = `
            <div class="bilan-header">
                <h1>Bilan récapitulatif</h1>
                <div class="bilan-filters">
                    <div class="period-filter">
                        <label for="period-select">Période :</label>
                        <select id="period-select">
                            <option value="${PERIOD_TYPES.WEEK}" ${currentPeriod === PERIOD_TYPES.WEEK ? 'selected' : ''}>Semaine</option>
                            <option value="${PERIOD_TYPES.MONTH}" ${currentPeriod === PERIOD_TYPES.MONTH ? 'selected' : ''}>Mois</option>
                            <option value="${PERIOD_TYPES.QUARTER}" ${currentPeriod === PERIOD_TYPES.QUARTER ? 'selected' : ''}>Trimestre</option>
                            <option value="${PERIOD_TYPES.YEAR}" ${currentPeriod === PERIOD_TYPES.YEAR ? 'selected' : ''}>Année</option>
                            <option value="${PERIOD_TYPES.ALL}" ${currentPeriod === PERIOD_TYPES.ALL ? 'selected' : ''}>Tout</option>
                        </select>
                    </div>
                    <div class="export-options">
                        <button class="btn btn-secondary" id="export-pdf-btn"><i class="icon-download"></i> Exporter en PDF</button>
                        <button class="btn btn-secondary" id="share-bilan-btn"><i class="icon-share"></i> Partager</button>
                    </div>
                </div>
            </div>
            
            <div class="bilan-tabs">
                <button class="tab-btn ${currentView === VIEW_TYPES.OVERVIEW ? 'active' : ''}" data-view="${VIEW_TYPES.OVERVIEW}">Vue d'ensemble</button>
                <button class="tab-btn ${currentView === VIEW_TYPES.DETAILS ? 'active' : ''}" data-view="${VIEW_TYPES.DETAILS}">Résultats détaillés</button>
                <button class="tab-btn ${currentView === VIEW_TYPES.PROGRESS ? 'active' : ''}" data-view="${VIEW_TYPES.PROGRESS}">Progrès</button>
                <button class="tab-btn ${currentView === VIEW_TYPES.RECOMMENDATIONS ? 'active' : ''}" data-view="${VIEW_TYPES.RECOMMENDATIONS}">Recommandations</button>
                <button class="tab-btn ${currentView === VIEW_TYPES.RESOURCES ? 'active' : ''}" data-view="${VIEW_TYPES.RESOURCES}">Ressources</button>
            </div>
            
            <div class="bilan-content" id="bilan-content">
                <!-- Le contenu spécifique à chaque vue sera inséré ici -->
                <div class="loading-indicator">
                    <div class="spinner"></div>
                    <p>Chargement de votre bilan...</p>
                </div>
            </div>
        `;
    }
    
    /**
     * Configure les écouteurs d'événements pour les onglets et filtres
     */
    function setupEventListeners() {
        // Gestion des onglets
        const tabButtons = document.querySelectorAll('.tab-btn');
        tabButtons.forEach(button => {
            button.addEventListener('click', () => {
                currentView = button.getAttribute('data-view');
                
                // Mettre à jour les classes actives
                tabButtons.forEach(btn => btn.classList.remove('active'));
                button.classList.add('active');
                
                // Recharger le bilan avec la nouvelle vue
                loadBilan();
            });
        });
        
        // Gestion du sélecteur de période
        const periodSelect = document.getElementById('period-select');
        if (periodSelect) {
            periodSelect.addEventListener('change', () => {
                currentPeriod = periodSelect.value;
                loadBilan();
            });
        }
        
        // Gestion des boutons d'export et de partage
        const exportPdfBtn = document.getElementById('export-pdf-btn');
        if (exportPdfBtn) {
            exportPdfBtn.addEventListener('click', exportBilanAsPdf);
        }
        
        const shareBilanBtn = document.getElementById('share-bilan-btn');
        if (shareBilanBtn) {
            shareBilanBtn.addEventListener('click', shareBilan);
        }
    }
    
    /**
     * Charge et affiche la vue d'ensemble du bilan
     * @param {Object} userProfile - Profil utilisateur
     * @param {Array} testResults - Résultats des tests
     */
    function loadOverviewView(userProfile, testResults) {
        const bilanContent = document.getElementById('bilan-content');
        if (!bilanContent) return;
        
        // Calculer les données pour l'aperçu
        const vitalScore = calculateVitalScore(testResults);
        const completionRate = calculateCompletionRate(testResults);
        const categoryScores = calculateCategoryScores(testResults);
        const scoreEvolution = calculateScoreEvolution(testResults);
        
        // Créer le contenu pour la vue d'ensemble (correction du HTML qui était dupliqué)
        bilanContent.innerHTML = `
            <div class="overview-view">
                <div class="overview-main-metrics">
                    <div class="vital-score-container">
                        <h2>VitalScore</h2>
                        <div class="vital-score-visualization" id="vital-score-viz">
                            <!-- Le graphique circulaire sera inséré ici -->
                        </div>
                        <div class="vital-score-value">${vitalScore.toFixed(1)}/10</div>
                        <div class="vital-score-label">${getScoreLabel(vitalScore)}</div>
                    </div>
                    
                    <div class="completion-rate-container">
                        <h2>Taux de complétion</h2>
                        <div class="completion-rate-visualization" id="completion-rate-viz">
                            <!-- Le graphique de progression sera inséré ici -->
                        </div>
                        <div class="completion-rate-value">${Math.round(completionRate * 100)}%</div>
                        <div class="completion-rate-label">${getCompletionLabel(completionRate)}</div>
                    </div>
                </div>
                
                <div class="overview-category-scores">
                    <h2>Scores par catégorie</h2>
                    <div class="category-radar-chart" id="category-radar-chart">
                        <!-- Le graphique radar sera inséré ici -->
                    </div>
                </div>
                
                <div class="overview-evolution">
                    <h2>Évolution du VitalScore</h2>
                    <div class="evolution-chart" id="evolution-chart">
                        <!-- Le graphique d'évolution sera inséré ici -->
                    </div>
                </div>
                
                <div class="overview-actions">
                    <button class="btn btn-primary" id="plan-week-btn">Planifier ma semaine</button>
                    <button class="btn btn-secondary" id="today-session-btn">Quelle séance aujourd'hui?</button>
                </div>
            </div>
        `;
        
        // Initialiser les graphiques
        setTimeout(() => {
            // Graphique circulaire pour le VitalScore
            charts.createDonutChart('vital-score-viz', vitalScore, 10, '#00813F');
            
            // Graphique pour le taux de complétion
            charts.createProgressBar('completion-rate-viz', completionRate);
            
            // Graphique radar pour les scores par catégorie
            charts.createRadarChart('category-radar-chart', categoryScores);
            
            // Graphique d'évolution pour le VitalScore
            charts.createLineChart('evolution-chart', scoreEvolution);
        }, 50);
        
        // Ajouter les écouteurs d'événements pour les boutons d'action
        document.getElementById('plan-week-btn').addEventListener('click', () => {
            window.navigation.navigateToFeature('planner');
        });
        
        document.getElementById('today-session-btn').addEventListener('click', () => {
            window.navigation.navigateToFeature('today-session');
        });
    }
    
    /**
     * Calcule le VitalScore à partir des résultats des tests
     * @param {Array} testResults - Résultats des tests
     * @returns {number} VitalScore calculé (0-10)
     */
    function calculateVitalScore(testResults) {
        if (!testResults || testResults.length === 0) {
            return 0;
        }
        
        // Cette implémentation est simplifiée
        // Dans une vraie application, le calcul serait plus sophistiqué
        
        // Calculer la moyenne des scores globaux normalisés
        let totalScore = 0;
        let maxPossibleScore = 0;
        
        testResults.forEach(result => {
            // Obtenir le test correspondant pour déterminer le score max possible
            const test = testsData.getTestById(result.testId);
            if (!test || !test.scoring || !test.scoring.ranges) return;
            
            // Trouver le score maximum possible pour ce test
            let testMaxScore = 0;
            test.scoring.ranges.forEach(range => {
                if (range.max > testMaxScore) {
                    testMaxScore = range.max;
                }
            });
            
            if (testMaxScore > 0) {
                totalScore += (result.scores.global / testMaxScore) * 10;
                maxPossibleScore += 10;
            }
        });
        
        // Retourner le score moyen
        return maxPossibleScore > 0 ? totalScore / testResults.length : 0;
    }
    
    /**
     * Calcule le taux de complétion des tests
     * @param {Array} testResults - Résultats des tests
     * @returns {number} Taux de complétion (0-1)
     */
    function calculateCompletionRate(testResults) {
        // Obtenir le nombre total de tests disponibles
        const totalTests = testsData.getCategories().reduce((total, category) => {
            return total + category.tests.length;
        }, 0);
        
        // Obtenir le nombre de tests uniques complétés
        const completedTestIds = new Set();
        testResults.forEach(result => {
            completedTestIds.add(result.testId);
        });
        
        // Calculer le taux de complétion
        return totalTests > 0 ? completedTestIds.size / totalTests : 0;
    }
    
    /**
     * Calcule les scores par catégorie
     * @param {Array} testResults - Résultats des tests
     * @returns {Object} Scores par catégorie
     */
    function calculateCategoryScores(testResults) {
        const categories = testsData.getCategories();
        const categoryScores = {};
        
        // Initialiser les scores à 0
        categories.forEach(category => {
            categoryScores[category.id] = {
                name: category.name,
                score: 0,
                count: 0
            };
        });
        
        // Calculer les scores moyens par catégorie
        testResults.forEach(result => {
            const test = testsData.getTestById(result.testId);
            if (!test) return;
            
            const categoryId = test.categoryId;
            if (!categoryScores[categoryId]) return;
            
            // Normaliser le score sur une échelle de 0 à 10
            const testMaxScore = getTestMaxScore(test); // variable renommée en camelCase
            const normalizedScore = testMaxScore > 0 
                ? (result.scores.global / testMaxScore) * 10 
                : 0;
            
            categoryScores[categoryId].score += normalizedScore;
            categoryScores[categoryId].count++;
        });
        
        // Calculer les moyennes
        for (const categoryId in categoryScores) {
            if (categoryScores[categoryId].count > 0) {
                categoryScores[categoryId].score = categoryScores[categoryId].score / categoryScores[categoryId].count;
            }
        }
        
        return categoryScores;
    }
    
    /**
     * Retourne le score maximum possible pour un test
     * @param {Object} test - Données du test
     * @returns {number} Score maximum
     */
    function getTestMaxScore(test) {
        if (!test || !test.scoring || !test.scoring.ranges) return 0;
        
        let maxScore = 0;
        test.scoring.ranges.forEach(range => {
            if (range.max > maxScore) {
                maxScore = range.max;
            }
        });
        
        return maxScore;
    }
    
    /**
     * Calcule l'évolution du score global dans le temps
     * @param {Array} testResults - Résultats des tests
     * @returns {Array} Données d'évolution
     */
    function calculateScoreEvolution(testResults) {
        // Trier les résultats par date
        const sortedResults = [...testResults].sort((a, b) => {
            return new Date(a.completedAt) - new Date(b.completedAt);
        });
        
        // Regrouper les résultats par jour
        const resultsByDay = {};
        sortedResults.forEach(result => {
            const date = new Date(result.completedAt);
            const dateString = date.toISOString().split('T')[0]; // YYYY-MM-DD
            
            if (!resultsByDay[dateString]) {
                resultsByDay[dateString] = [];
            }
            
            resultsByDay[dateString].push(result);
        });
        
        // Calculer le score moyen pour chaque jour
        const evolution = [];
        for (const dateString in resultsByDay) {
            const dayResults = resultsByDay[dateString];
            const dayScore = calculateVitalScore(dayResults);
            
            evolution.push({
                date: dateString,
                score: dayScore
            });
        }
        
        return evolution;
    }
    
    /**
     * Retourne l'étiquette correspondant à un score
     * @param {number} score - Score (0-10)
     * @returns {string} Étiquette du score
     */
    function getScoreLabel(score) {
        if (score >= SCORE_THRESHOLDS.EXCELLENT) return "Excellent";
        if (score >= SCORE_THRESHOLDS.VERY_GOOD) return "Très bon";
        if (score >= SCORE_THRESHOLDS.GOOD) return "Bon";
        if (score >= SCORE_THRESHOLDS.AVERAGE) return "Moyen";
        if (score >= SCORE_THRESHOLDS.NEEDS_IMPROVEMENT) return "À améliorer";
        if (score >= SCORE_THRESHOLDS.WEAK) return "Faible";
        return "Très faible";
    }
    
    /**
     * Retourne l'étiquette correspondant à un taux de complétion
     * @param {number} rate - Taux de complétion (0-1)
     * @returns {string} Étiquette du taux
     */
    function getCompletionLabel(rate) {
        if (rate >= COMPLETION_THRESHOLDS.ALMOST_COMPLETE) return "Presque complet";
        if (rate >= COMPLETION_THRESHOLDS.WELL_ADVANCED) return "Bien avancé";
        if (rate >= COMPLETION_THRESHOLDS.HALFWAY) return "À mi-chemin";
        if (rate >= COMPLETION_THRESHOLDS.PROGRESSING) return "En progression";
        if (rate >= COMPLETION_THRESHOLDS.BEGINNER) return "Débutant";
        return "Commencez maintenant";
    }
    
    /**
     * Formate une date pour l'affichage
     * @param {string} dateString - Date au format ISO (YYYY-MM-DD)
     * @returns {string} Date formatée
     */
    function formatDate(dateString) {
        if (!dateString) return '';
        
        const date = new Date(dateString);
        return date.toLocaleDateString('fr-FR', {
            day: 'numeric',
            month: 'long',
            year: 'numeric'
        });
    }
    
    /**
     * Met en majuscule la première lettre d'une chaîne
     * @param {string} str - Chaîne à transformer
     * @returns {string} Chaîne avec première lettre majuscule
     */
    function capitalizeFirstLetter(str) {
        if (!str) return '';
        return str.charAt(0).toUpperCase() + str.slice(1);
    }
    
    /**
     * Exporte le bilan complet au format PDF
     */
    function exportBilanAsPdf() {
        // Cette fonction serait implémentée pour générer un PDF du bilan
        // Pour l'exemple, on affiche juste un message
        alert('Export du bilan en PDF en cours de développement');
    }
    
    /**
     * Partage le bilan via email ou autre méthode
     */
    function shareBilan() {
        // Cette fonction serait implémentée pour partager le bilan
        // Pour l'exemple, on ouvre la modal de partage
        showShareModal(RECIPIENT_TYPES.OTHER);
    }
    
    /**
     * Affiche une fenêtre modale pour partager le bilan
     * @param {string} recipientType - Type de destinataire ('coach', 'medic', 'other')
     */
    function showShareModal(recipientType) {
        // Déterminer le titre et les options en fonction du type de destinataire
        let title = '';
        let emailPlaceholder = '';
        
        switch (recipientType) {
            case RECIPIENT_TYPES.COACH:
                title = 'Partager avec mon coach';
                emailPlaceholder = 'Email de votre coach';
                break;
            case RECIPIENT_TYPES.MEDIC:
                title = 'Partager avec mon médecin';
                emailPlaceholder = 'Email de votre médecin';
                break;
            case RECIPIENT_TYPES.OTHER:
                title = 'Partager avec un autre destinataire';
                emailPlaceholder = 'Email du destinataire';
                break;
        }
        
        // Créer la fenêtre modale
        const modal = document.createElement('div');
        modal.className = 'modal share-modal';
        modal.innerHTML = `
            <div class="modal-content">
                <div class="modal-header">
                    <h2>${title}</h2>
                    <button class="close-modal-btn">&times;</button>
                </div>
                <div class="modal-body">
                    <form id="share-form">
                        <div class="form-group">
                            <label for="share-email">Email du destinataire</label>
                            <input type="email" id="share-email" placeholder="${emailPlaceholder}" required>
                        </div>
                        
                        <div class="form-group">
                            <label for="share-message">Message personnalisé (optionnel)</label>
                            <textarea id="share-message" rows="4"></textarea>
                        </div>
                        
                        <div class="form-group">
                            <label>Contenu à partager</label>
                            <div class="form-checks">
                                <div class="form-check">
                                    <input type="checkbox" id="share-overview" checked>
                                    <label for="share-overview">Vue d'ensemble</label>
                                </div>
                                <div class="form-check">
                                    <input type="checkbox" id="share-details" checked>
                                    <label for="share-details">Résultats détaillés</label>
                                </div>
                                <div class="form-check">
                                    <input type="checkbox" id="share-progress" checked>
                                    <label for="share-progress">Progrès</label>
                                </div>
                                <div class="form-check">
                                    <input type="checkbox" id="share-recommendations">
                                    <label for="share-recommendations">Recommandations</label>
                                </div>
                            </div>
                        </div>
                        
                        <div class="form-group">
                            <label for="share-format">Format</label>
                            <select id="share-format">
                                <option value="${EXPORT_FORMATS.PDF}">PDF</option>
                                <option value="${EXPORT_FORMATS.HTML}">Email avec rapport intégré</option>
                                <option value="${EXPORT_FORMATS.LINK}">Lien sécurisé</option>
                            </select>
                        </div>
                        
                        <div class="form-actions">
                            <button type="submit" class="btn btn-primary">Partager</button>
                            <button type="button" class="btn btn-secondary cancel-btn">Annuler</button>
                        </div>
                    </form>
                </div>
            </div>
        `;
        
        // Ajouter la modal et configurer les écouteurs
        document.body.appendChild(modal);
        
        setTimeout(() => {
            modal.classList.add('show');
        }, 10);
        
        // Configurer les écouteurs d'événements pour la fermeture
        const closeBtn = modal.querySelector('.close-modal-btn');
        const cancelBtn = modal.querySelector('.cancel-btn');
        const form = modal.querySelector('#share-form');
        
        closeBtn.addEventListener('click', () => {
            modal.classList.remove('show');
            setTimeout(() => modal.remove(), 300);
        });
        
        cancelBtn.addEventListener('click', () => {
            modal.classList.remove('show');
            setTimeout(() => modal.remove(), 300);
        });
        
        form.addEventListener('submit', (event) => {
            event.preventDefault();
            // Traitement du partage ici
            alert('Fonction de partage en cours de développement');
            modal.classList.remove('show');
            setTimeout(() => modal.remove(), 300);
        });
    }
    
    // API publique
    return {
        initialize,
        loadBilan
    };
})();

// Initialisation au chargement du document
document.addEventListener('DOMContentLoaded', function() {
    bilanModule.initialize();
});

// Export du module pour utilisation dans d'autres fichiers
if (typeof module !== 'undefined' && module.exports) {
    module.exports = bilanModule;
}
