/**
 * Gestion des données utilisateur pour l'application Bilan Vital
 * Ce module gère le stockage, la récupération et la mise à jour des données
 * utilisateur, y compris les résultats des tests, les préférences, et le suivi de progression.
 */

// Constantes globales en SCREAMING_SNAKE_CASE
const DAYS_OF_WEEK = ['Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi', 'Samedi', 'Dimanche'];
const ACTIVITY_TYPES = ['Cardio', 'Force', 'Souplesse', 'Équilibre', 'Récupération'];
const SOCIAL_PREFERENCES = ['Seul', 'En groupe', 'Les deux'];
const TIME_PREFERENCES = ['Matin', 'Midi', 'Après-midi', 'Soir'];
const OBJECTIVES_LIST = ['Perte de poids', 'Gain musculaire', 'Amélioration cardio', 'Bien-être général', 'Réduction stress'];
const STORAGE_KEYS = {
    USER_PROFILE: 'user_profile',
    TEST_RESULTS: 'test_results',
    DAILY_STATE: 'daily_state',
    WEEKLY_PLAN: 'weekly_plan'
};

const userData = (function() {
    // Référence aux constantes globales
    const STORE_TYPES = STORAGE_KEYS;

    // Dépendances
    const storageManager = window.storage || {
        // Implémentation de fallback si le module de stockage n'est pas chargé
        STORES: STORE_TYPES,
        save: (key, data) => {
            return new Promise((resolve) => {
                localStorage.setItem(key, JSON.stringify(data));
                resolve();
            });
        },
        get: (key) => {
            return new Promise((resolve) => {
                const data = localStorage.getItem(key);
                resolve(data ? JSON.parse(data) : null);
            });
        },
        getByIndex: (store, indexName, value) => {
            return new Promise((resolve) => {
                const allData = localStorage.getItem(store);
                if (!allData) return resolve([]);
                
                const parsedData = JSON.parse(allData);
                if (!Array.isArray(parsedData)) return resolve([]);
                
                const filtered = parsedData.filter(item => item[indexName] === value);
                resolve(filtered);
            });
        },
        clear: (store) => {
            return new Promise((resolve) => {
                localStorage.removeItem(store);
                resolve();
            });
        }
    };
    
    /**
     * Structure de base pour un profil utilisateur
     * @returns {Object} Profil utilisateur par défaut
     */
    function createDefaultUserProfile() {
        return {
            userId: generateUserId(),
            demographics: {
                age: null,
                gender: null,
                height: null,
                weight: null
            },
            objectives: [],
            preferences: {
                activityTypes: [],
                preferredTime: null,
                socialPreference: null
            },
            dailyState: {
                lastUpdated: null,
                physicalScore: null,
                mentalScore: null,
                recommendedActivityType: null
            },
            weeklyPlan: {
                lastUpdated: null,
                availableDays: [],
                weeklyGoals: [],
                plannedSessions: []
            },
            createdAt: new Date().toISOString(),
            lastUpdated: new Date().toISOString()
        };
    }
    
    /**
     * Génère un identifiant utilisateur unique
     * @returns {string} UUID v4
     */
    function generateUserId() {
        return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
            const r = Math.random() * 16 | 0;
            const v = c === 'x' ? r : (r & 0x3 | 0x8);
            return v.toString(16);
        });
    }
    
    /**
     * Initialise ou récupère le profil utilisateur
     * @returns {Promise<Object>} Profil utilisateur
     */
    async function getUserProfile() {
        try {
            // Tenter de récupérer le profil existant
            const profile = await storageManager.get(storageManager.STORES.USER_PROFILE, 'current');
            
            // Si le profil existe, le retourner
            if (profile) {
                return profile;
            }
            
            // Sinon, créer un nouveau profil
            const newProfile = createDefaultUserProfile();
            newProfile.userId = 'current'; // Utiliser 'current' comme ID pour simplifier
            
            // Sauvegarder le nouveau profil
            await storageManager.save(storageManager.STORES.USER_PROFILE, newProfile);
            
            return newProfile;
        } catch (error) {
            console.error('Erreur lors de la récupération du profil utilisateur:', error);
            
            // En cas d'erreur, retourner un profil par défaut sans le sauvegarder
            return createDefaultUserProfile();
        }
    }
    
    /**
     * Met à jour le profil utilisateur
     * @param {Object} updates - Mises à jour à appliquer au profil
     * @returns {Promise<Object>} Profil mis à jour
     */
    async function updateUserProfile(updates) {
        try {
            // Récupérer le profil existant
            const profile = await getUserProfile();
            
            // Appliquer les mises à jour
            const updatedProfile = {
                ...profile,
                ...updates,
                lastUpdated: new Date().toISOString()
            };
            
            // Sauvegarder le profil mis à jour
            await storageManager.save(storageManager.STORES.USER_PROFILE, updatedProfile);
            
            return updatedProfile;
        } catch (error) {
            console.error('Erreur lors de la mise à jour du profil utilisateur:', error);
            throw error;
        }
    }
    
    /**
     * Récupère les résultats de tests d'un utilisateur
     * @param {string} testId - ID du test (optionnel)
     * @returns {Promise<Array>} Résultats des tests
     */
    async function getTestResults(testId = null) {
        try {
            // Récupérer tous les résultats
            const results = await storageManager.get(storageManager.STORES.TEST_RESULTS) || [];
            
            // Si aucun ID de test n'est spécifié, retourner tous les résultats
            if (!testId) {
                return results;
            }
            
            // Sinon, filtrer les résultats pour ce test
            return results.filter(result => result.testId === testId);
        } catch (error) {
            console.error('Erreur lors de la récupération des résultats de tests:', error);
            return [];
        }
    }
    
    /**
     * Sauvegarde un résultat de test
     * @param {string} testId - ID du test
     * @param {Object} results - Résultats du test
     * @returns {Promise<Object>} Résultats sauvegardés
     */
    async function saveTestResult(testId, results) {
        try {
            // Récupérer les résultats existants
            const existingResults = await getTestResults();
            
            // Créer le nouvel enregistrement de résultat
            const newResult = {
                ...results,
                testId,
                id: generateUserId(), // Générer un ID unique pour ce résultat
                completedAt: results.completedAt || new Date().toISOString()
            };
            
            // Ajouter le nouveau résultat
            existingResults.push(newResult);
            
            // Sauvegarder tous les résultats
            await storageManager.save(storageManager.STORES.TEST_RESULTS, existingResults);
            
            return newResult;
        } catch (error) {
            console.error('Erreur lors de la sauvegarde du résultat de test:', error);
            throw error;
        }
    }
    
    /**
     * Récupère l'état quotidien le plus récent
     * @returns {Promise<Object>} État quotidien
     */
    async function getDailyState() {
        try {
            const dailyState = await storageManager.get(storageManager.STORES.DAILY_STATE);
            
            // Vérifier si l'état quotidien existe et s'il est encore valide pour aujourd'hui
            if (dailyState && isToday(new Date(dailyState.date))) {
                return dailyState;
            }
            
            return null;
        } catch (error) {
            console.error('Erreur lors de la récupération de l\'état quotidien:', error);
            return null;
        }
    }
    
    /**
     * Sauvegarde l'état quotidien
     * @param {Object} state - État quotidien à sauvegarder
     * @returns {Promise<Object>} État quotidien sauvegardé
     */
    async function saveDailyState(state) {
        try {
            // S'assurer que la date est définie
            if (!state.date) {
                state.date = new Date().toISOString();
            }
            
            // Sauvegarder l'état
            await storageManager.save(storageManager.STORES.DAILY_STATE, state);
            
            return state;
        } catch (error) {
            console.error('Erreur lors de la sauvegarde de l\'état quotidien:', error);
            throw error;
        }
    }
    
    /**
     * Récupère le plan hebdomadaire actuel
     * @returns {Promise<Object>} Plan hebdomadaire
     */
    async function getWeeklyPlan() {
        try {
            return await storageManager.get(storageManager.STORES.WEEKLY_PLAN);
        } catch (error) {
            console.error('Erreur lors de la récupération du plan hebdomadaire:', error);
            return null;
        }
    }
    
    /**
     * Sauvegarde un plan hebdomadaire
     * @param {Object} plan - Plan hebdomadaire à sauvegarder
     * @returns {Promise<Object>} Plan hebdomadaire sauvegardé
     */
    async function saveWeeklyPlan(plan) {
        try {
            // S'assurer que les dates sont définies
            if (!plan.startDate) {
                plan.startDate = new Date().toISOString();
            }
            
            plan.lastUpdated = new Date().toISOString();
            
            // Sauvegarder le plan
            await storageManager.save(storageManager.STORES.WEEKLY_PLAN, plan);
            
            // Mettre à jour le profil utilisateur avec les informations du plan
            await updateUserProfile({
                weeklyPlan: {
                    lastUpdated: plan.lastUpdated,
                    availableDays: plan.availableDays,
                    weeklyGoals: plan.weeklyGoals,
                    plannedSessions: plan.plannedSessions.length
                }
            });
            
            return plan;
        } catch (error) {
            console.error('Erreur lors de la sauvegarde du plan hebdomadaire:', error);
            throw error;
        }
    }
    
    /**
     * Vérifie si un plan hebdomadaire est toujours actif
     * @param {Object} plan - Plan hebdomadaire à vérifier
     * @returns {boolean} True si le plan est actif
     */
    function isWeeklyPlanActive(plan) {
        if (!plan || !plan.startDate) return false;
        
        // Calculer la date de fin (7 jours après le début)
        const startDate = new Date(plan.startDate);
        const endDate = new Date(startDate);
        endDate.setDate(startDate.getDate() + 7);
        
        // Vérifier si aujourd'hui est dans la plage du plan
        const today = new Date();
        return today >= startDate && today <= endDate;
    }
    
    /**
     * Vérifie si une date est aujourd'hui
     * @param {Date} date - Date à vérifier
     * @returns {boolean} True si la date est aujourd'hui
     */
    function isToday(date) {
        const today = new Date();
        return date.getDate() === today.getDate() &&
               date.getMonth() === today.getMonth() &&
               date.getFullYear() === today.getFullYear();
    }
    
    /**
     * Efface toutes les données utilisateur
     * @returns {Promise<boolean>} Succès de l'opération
     */
    async function clearAllUserData() {
        try {
            // Effacer toutes les données
            await storageManager.clear(storageManager.STORES.USER_PROFILE);
            await storageManager.clear(storageManager.STORES.TEST_RESULTS);
            await storageManager.clear(storageManager.STORES.DAILY_STATE);
            await storageManager.clear(storageManager.STORES.WEEKLY_PLAN);
            
            return true;
        } catch (error) {
            console.error('Erreur lors de l\'effacement des données utilisateur:', error);
            return false;
        }
    }
    
    // API publique
    return {
        getUserProfile,
        updateUserProfile,
        getTestResults,
        saveTestResult,
        getDailyState,
        saveDailyState,
        getWeeklyPlan,
        saveWeeklyPlan,
        isWeeklyPlanActive,
        clearAllUserData
    };
})();

// Export du module pour utilisation dans d'autres fichiers
if (typeof module !== 'undefined' && module.exports) {
    module.exports = userData;
} else {
    window.userData = userData;
}
