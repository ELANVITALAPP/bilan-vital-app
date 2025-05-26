// userData.js - Gestion des données utilisateur simplifiée
const userData = (function() {
    // Clés de stockage
    const STORAGE_KEYS = {
        USER_PROFILE: 'user_profile',
        TEST_RESULTS: 'testResults', // Clé simplifiée pour compatibilité
        DAILY_STATE: 'daily_state',
        WEEKLY_PLAN: 'weekly_plan'
    };
    
    /**
     * Génère un identifiant unique
     * @returns {string} ID unique
     */
    function generateId() {
        return Date.now() + '_' + Math.random().toString(36).substr(2, 9);
    }
    
    /**
     * Structure de base pour un profil utilisateur
     * @returns {Object} Profil utilisateur par défaut
     */
    function createDefaultUserProfile() {
        return {
            userId: generateId(),
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
            createdAt: new Date().toISOString(),
            lastUpdated: new Date().toISOString()
        };
    }
    
    /**
     * Récupère le profil utilisateur
     * @returns {Object} Profil utilisateur
     */
    function getUserProfile() {
        try {
            // Utiliser le module de stockage si disponible, sinon localStorage direct
            let profile;
            if (window.storage && window.storage.getData) {
                profile = window.storage.getData(STORAGE_KEYS.USER_PROFILE);
            } else {
                const data = localStorage.getItem('bilanVital_' + STORAGE_KEYS.USER_PROFILE);
                profile = data ? JSON.parse(data) : null;
            }
            
            // Si le profil existe, le retourner
            if (profile) {
                return profile;
            }
            
            // Sinon, créer un nouveau profil
            const newProfile = createDefaultUserProfile();
            
            // Sauvegarder le nouveau profil
            if (window.storage && window.storage.saveData) {
                window.storage.saveData(STORAGE_KEYS.USER_PROFILE, newProfile);
            } else {
                localStorage.setItem('bilanVital_' + STORAGE_KEYS.USER_PROFILE, JSON.stringify(newProfile));
            }
            
            return newProfile;
        } catch (error) {
            console.error('Erreur lors de la récupération du profil utilisateur:', error);
            return createDefaultUserProfile();
        }
    }
    
    /**
     * Met à jour le profil utilisateur
     * @param {Object} updates - Mises à jour à appliquer au profil
     * @returns {Object} Profil mis à jour
     */
    function updateUserProfile(updates) {
        try {
            // Récupérer le profil existant
            const profile = getUserProfile();
            
            // Appliquer les mises à jour
            const updatedProfile = {
                ...profile,
                ...updates,
                lastUpdated: new Date().toISOString()
            };
            
            // Sauvegarder le profil mis à jour
            if (window.storage && window.storage.saveData) {
                window.storage.saveData(STORAGE_KEYS.USER_PROFILE, updatedProfile);
            } else {
                localStorage.setItem('bilanVital_' + STORAGE_KEYS.USER_PROFILE, JSON.stringify(updatedProfile));
            }
            
            return updatedProfile;
        } catch (error) {
            console.error('Erreur lors de la mise à jour du profil utilisateur:', error);
            throw error;
        }
    }
    
    /**
     * Récupère les résultats de tests
     * @param {string} testId - ID du test (optionnel)
     * @returns {Array} Résultats des tests
     */
    function getTestResults(testId = null) {
        try {
            // Récupérer tous les résultats
            let results;
            
            // Essayer la nouvelle clé d'abord
            const newKey = localStorage.getItem('bilanVital_' + STORAGE_KEYS.TEST_RESULTS);
            if (newKey) {
                results = JSON.parse(newKey);
            } else {
                // Fallback vers l'ancienne clé pour compatibilité
                const oldKey = localStorage.getItem('bilanVital_testResults');
                results = oldKey ? JSON.parse(oldKey) : [];
            }
            
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
     * @param {Object} testResult - Résultat du test complet
     * @returns {Object} Résultats sauvegardés
     */
    function saveTestResult(testResult) {
        try {
            // Récupérer les résultats existants
            const existingResults = getTestResults();
            
            // Ajouter timestamp et ID si manquants
            if (!testResult.id) {
                testResult.id = generateId();
            }
            if (!testResult.date && !testResult.dateCompleted) {
                testResult.date = new Date().toISOString();
            }
            
            // Ajouter le nouveau résultat
            existingResults.push(testResult);
            
            // Sauvegarder tous les résultats
            localStorage.setItem('bilanVital_' + STORAGE_KEYS.TEST_RESULTS, JSON.stringify(existingResults));
            
            return testResult;
        } catch (error) {
            console.error('Erreur lors de la sauvegarde du résultat de test:', error);
            throw error;
        }
    }
    
    /**
     * Récupère l'état quotidien le plus récent
     * @returns {Object|null} État quotidien
     */
    function getDailyState() {
        try {
            let dailyState;
            if (window.storage && window.storage.getData) {
                dailyState = window.storage.getData(STORAGE_KEYS.DAILY_STATE);
            } else {
                const data = localStorage.getItem('bilanVital_' + STORAGE_KEYS.DAILY_STATE);
                dailyState = data ? JSON.parse(data) : null;
            }
            
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
     * @returns {Object} État quotidien sauvegardé
     */
    function saveDailyState(state) {
        try {
            // S'assurer que la date est définie
            if (!state.date) {
                state.date = new Date().toISOString();
            }
            
            // Sauvegarder l'état
            if (window.storage && window.storage.saveData) {
                window.storage.saveData(STORAGE_KEYS.DAILY_STATE, state);
            } else {
                localStorage.setItem('bilanVital_' + STORAGE_KEYS.DAILY_STATE, JSON.stringify(state));
            }
            
            return state;
        } catch (error) {
            console.error('Erreur lors de la sauvegarde de l\'état quotidien:', error);
            throw error;
        }
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
     * @returns {boolean} Succès de l'opération
     */
    function clearAllUserData() {
        try {
            // Effacer toutes les données
            localStorage.removeItem('bilanVital_' + STORAGE_KEYS.USER_PROFILE);
            localStorage.removeItem('bilanVital_' + STORAGE_KEYS.TEST_RESULTS);
            localStorage.removeItem('bilanVital_testResults'); // Ancienne clé
            localStorage.removeItem('bilanVital_' + STORAGE_KEYS.DAILY_STATE);
            localStorage.removeItem('bilanVital_' + STORAGE_KEYS.WEEKLY_PLAN);
            
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
        clearAllUserData,
        // Alias pour compatibilité
        addTestResult: saveTestResult,
        getTestHistory: getTestResults
    };
})();

// Export global pour compatibilité
window.userData = userData;
