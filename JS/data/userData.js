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
