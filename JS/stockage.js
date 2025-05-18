/**
 * Module de gestion du stockage pour l'application Bilan Vital
 * Fournit une abstraction pour gérer le stockage local (localStorage et IndexedDB)
 */

const storage = (function() {
    // Constantes globales
    const DB_NAME = 'bilanVitalDB';
    const DB_VERSION = 1;
    const STORES = {
        USER_PROFILE: 'userProfile',
        TEST_RESULTS: 'testResults',
        DAILY_STATE: 'dailyState',
        WEEKLY_PLAN: 'weeklyPlan',
        PREFERENCES: 'preferences'
    };
    
    // Variables d'état
    let db = null;
    let isInitialized = false;
    
    /**
     * Initialise la base de données IndexedDB
     * @returns {Promise<boolean>} Succès de l'initialisation
     */
    async function initialize() {
        if (isInitialized) return true;
        
        return new Promise((resolve, reject) => {
            try {
                // Vérifier si IndexedDB est supporté
                if (!window.indexedDB) {
                    console.warn('IndexedDB n\'est pas supporté par ce navigateur, utilisation de localStorage.');
                    isInitialized = true;
                    resolve(true);
                    return;
                }
                
                // Ouvrir ou créer la base de données
                const request = window.indexedDB.open(DB_NAME, DB_VERSION);
                
                // Gérer la mise à niveau de la base de données
                request.onupgradeneeded = function(event) {
                    const db = event.target.result;
                    
                    // Créer les object stores s'ils n'existent pas
                    if (!db.objectStoreNames.contains(STORES.USER_PROFILE)) {
                        db.createObjectStore(STORES.USER_PROFILE, { keyPath: 'userId' });
                    }
                    
                    if (!db.objectStoreNames.contains(STORES.TEST_RESULTS)) {
                        const testResultsStore = db.createObjectStore(STORES.TEST_RESULTS, { keyPath: 'id', autoIncrement: true });
                        testResultsStore.createIndex('testId', 'testId', { unique: false });
                        testResultsStore.createIndex('completedAt', 'completedAt', { unique: false });
                    }
                    
                    if (!db.objectStoreNames.contains(STORES.DAILY_STATE)) {
                        const dailyStateStore = db.createObjectStore(STORES.DAILY_STATE, { keyPath: 'date' });
                        dailyStateStore.createIndex('date', 'date', { unique: true });
                    }
                    
                    if (!db.objectStoreNames.contains(STORES.WEEKLY_PLAN)) {
                        const weeklyPlanStore = db.createObjectStore(STORES.WEEKLY_PLAN, { keyPath: 'startDate' });
                        weeklyPlanStore.createIndex('startDate', 'startDate', { unique: true });
                    }
                    
                    if (!db.objectStoreNames.contains(STORES.PREFERENCES)) {
                        db.createObjectStore(STORES.PREFERENCES, { keyPath: 'key' });
                    }
                };
                
                // Gérer les erreurs
                request.onerror = function(event) {
                    console.error('Erreur lors de l\'ouverture de la base de données:', event.target.error);
                    isInitialized = false;
                    reject(event.target.error);
                };
                
                // Gérer le succès
                request.onsuccess = function(event) {
                    db = event.target.result;
                    isInitialized = true;
                    resolve(true);
                };
            } catch (error) {
                console.error('Erreur lors de l\'initialisation du stockage:', error);
                isInitialized = false;
                reject(error);
            }
        });
    }
    
    /**
     * Sauvegarde des données dans IndexedDB ou localStorage
     * @param {string} storeName - Nom du store
     * @param {*} data - Données à sauvegarder
     * @param {*} key - Clé pour localStorage (optionnel)
     * @returns {Promise<boolean>} Succès de la sauvegarde
     */
    async function save(storeName, data, key = null) {
        // Initialiser si nécessaire
        if (!isInitialized) {
            await initialize();
        }
        
        return new Promise((resolve, reject) => {
            try {
                // Si IndexedDB est initialisé, utiliser IndexedDB
                if (db) {
                    const transaction = db.transaction([storeName], 'readwrite');
                    const objectStore = transaction.objectStore(storeName);
                    
                    const request = objectStore.put(data);
                    
                    request.onsuccess = function() {
                        resolve(true);
                    };
                    
                    request.onerror = function(event) {
                        console.error(`Erreur lors de la sauvegarde dans ${storeName}:`, event.target.error);
                        fallbackToLocalStorage(storeName, data, key);
                        resolve(false);
                    };
                } else {
                    // Sinon, utiliser localStorage comme solution de secours
                    fallbackToLocalStorage(storeName, data, key);
                    resolve(true);
                }
            } catch (error) {
                console.error(`Erreur lors de la sauvegarde dans ${storeName}:`, error);
                fallbackToLocalStorage(storeName, data, key);
                resolve(false);
            }
        });
    }
    
    /**
     * Récupère des données depuis IndexedDB ou localStorage
     * @param {string} storeName - Nom du store
     * @param {*} key - Clé pour la recherche (pour IndexedDB) ou prefix pour localStorage
     * @returns {Promise<*>} Données récupérées
     */
    async function get(storeName, key = null) {
        // Initialiser si nécessaire
        if (!isInitialized) {
            await initialize();
        }
        
        return new Promise((resolve, reject) => {
            try {
                // Si IndexedDB est initialisé, utiliser IndexedDB
                if (db) {
                    const transaction = db.transaction([storeName], 'readonly');
                    const objectStore = transaction.objectStore(storeName);
                    
                    let request;
                    
                    if (key !== null) {
                        request = objectStore.get(key);
                    } else {
                        request = objectStore.getAll();
                    }
                    
                    request.onsuccess = function(event) {
                        resolve(event.target.result);
                    };
                    
                    request.onerror = function(event) {
                        console.error(`Erreur lors de la récupération depuis ${storeName}:`, event.target.error);
                        const data = fallbackFromLocalStorage(storeName, key);
                        resolve(data);
                    };
                } else {
                    // Sinon, utiliser localStorage comme solution de secours
                    const data = fallbackFromLocalStorage(storeName, key);
                    resolve(data);
                }
            } catch (error) {
                console.error(`Erreur lors de la récupération depuis ${storeName}:`, error);
                const data = fallbackFromLocalStorage(storeName, key);
                resolve(data);
            }
        });
    }
    
    /**
     * Récupère toutes les entrées d'un store qui correspondent à un index et une valeur
     * @param {string} storeName - Nom du store
     * @param {string} indexName - Nom de l'index
     * @param {*} indexValue - Valeur recherchée
     * @returns {Promise<Array>} Tableau des entrées trouvées
     */
    async function getByIndex(storeName, indexName, indexValue) {
        // Initialiser si nécessaire
        if (!isInitialized) {
            await initialize();
        }
        
        return new Promise((resolve, reject) => {
            try {
                // Si IndexedDB est initialisé, utiliser IndexedDB
                if (db) {
                    const transaction = db.transaction([storeName], 'readonly');
                    const objectStore = transaction.objectStore(storeName);
                    
                    // Vérifier si l'index existe
                    if (!objectStore.indexNames.contains(indexName)) {
                        console.warn(`Index ${indexName} n'existe pas dans ${storeName}.`);
                        resolve([]);
                        return;
                    }
                    
                    const index = objectStore.index(indexName);
                    const request = index.getAll(indexValue);
                    
                    request.onsuccess = function(event) {
                        resolve(event.target.result);
                    };
                    
                    request.onerror = function(event) {
                        console.error(`Erreur lors de la récupération par index depuis ${storeName}:`, event.target.error);
                        resolve([]);
                    };
                } else {
                    // Fallback pour localStorage (moins efficace)
                    const allData = fallbackFromLocalStorage(storeName);
                    
                    if (Array.isArray(allData)) {
                        const filteredData = allData.filter(item => item[indexName] === indexValue);
                        resolve(filteredData);
                    } else if (allData && typeof allData === 'object') {
                        const filteredData = Object.values(allData).filter(item => item[indexName] === indexValue);
                        resolve(filteredData);
                    } else {
                        resolve([]);
                    }
                }
            } catch (error) {
                console.error(`Erreur lors de la récupération par index depuis ${storeName}:`, error);
                resolve([]);
            }
        });
    }
    
    /**
     * Supprime une entrée d'un store
     * @param {string} storeName - Nom du store
     * @param {*} key - Clé de l'entrée à supprimer
     * @returns {Promise<boolean>} Succès de la suppression
     */
    async function remove(storeName, key) {
        // Initialiser si nécessaire
        if (!isInitialized) {
            await initialize();
        }
        
        return new Promise((resolve, reject) => {
            try {
                // Si IndexedDB est initialisé, utiliser IndexedDB
                if (db) {
                    const transaction = db.transaction([storeName], 'readwrite');
                    const objectStore = transaction.objectStore(storeName);
                    
                    const request = objectStore.delete(key);
                    
                    request.onsuccess = function() {
                        // Également supprimer du localStorage par sécurité
                        fallbackRemoveFromLocalStorage(storeName, key);
                        resolve(true);
                    };
                    
                    request.onerror = function(event) {
                        console.error(`Erreur lors de la suppression depuis ${storeName}:`, event.target.error);
                        resolve(false);
                    };
                } else {
                    // Sinon, utiliser localStorage comme solution de secours
                    fallbackRemoveFromLocalStorage(storeName, key);
                    resolve(true);
                }
            } catch (error) {
                console.error(`Erreur lors de la suppression depuis ${storeName}:`, error);
                resolve(false);
            }
        });
    }
    
    /**
     * Vide complètement un store
     * @param {string} storeName - Nom du store à vider
     * @returns {Promise<boolean>} Succès de l'opération
     */
    async function clear(storeName) {
        // Initialiser si nécessaire
        if (!isInitialized) {
            await initialize();
        }
        
        return new Promise((resolve, reject) => {
            try {
                // Si IndexedDB est initialisé, utiliser IndexedDB
                if (db) {
                    const transaction = db.transaction([storeName], 'readwrite');
                    const objectStore = transaction.objectStore(storeName);
                    
                    const request = objectStore.clear();
                    
                    request.onsuccess = function() {
                        // Également vider le localStorage
                        fallbackClearLocalStorage(storeName);
                        resolve(true);
                    };
                    
                    request.onerror = function(event) {
                        console.error(`Erreur lors du vidage de ${storeName}:`, event.target.error);
                        resolve(false);
                    };
                } else {
                    // Sinon, utiliser localStorage comme solution de secours
                    fallbackClearLocalStorage(storeName);
                    resolve(true);
                }
            } catch (error) {
                console.error(`Erreur lors du vidage de ${storeName}:`, error);
                resolve(false);
            }
        });
    }
    
    /**
     * Fallback pour sauvegarder dans localStorage
     * @param {string} storeName - Nom du store
     * @param {*} data - Données à sauvegarder
     * @param {*} key - Clé spécifique (optionnel)
     */
    function fallbackToLocalStorage(storeName, data, key = null) {
        try {
            // Utiliser le keyPath comme clé si disponible
            const storageKey = key || (data.id ? `${storeName}_${data.id}` : 
                                      data.userId ? `${storeName}_${data.userId}` : 
                                      data.date ? `${storeName}_${data.date}` : 
                                      data.startDate ? `${storeName}_${data.startDate}` : 
                                      `${storeName}_default`);
            
            localStorage.setItem(storageKey, JSON.stringify(data));
        } catch (error) {
            console.error(`Erreur lors de la sauvegarde dans localStorage pour ${storeName}:`, error);
        }
    }
    
    /**
     * Fallback pour récupérer depuis localStorage
     * @param {string} storeName - Nom du store
     * @param {*} key - Clé spécifique ou préfixe
     * @returns {*} Données récupérées
     */
    function fallbackFromLocalStorage(storeName, key = null) {
        try {
            // Si une clé spécifique est fournie
            if (key !== null) {
                const storageKey = `${storeName}_${key}`;
                const data = localStorage.getItem(storageKey);
                return data ? JSON.parse(data) : null;
            }
            
            // Sinon, récupérer toutes les entrées qui commencent par storeName
            const results = [];
            const prefix = `${storeName}_`;
            
            for (let i = 0; i < localStorage.length; i++) {
                const storageKey = localStorage.key(i);
                
                if (storageKey.startsWith(prefix)) {
                    const data = localStorage.getItem(storageKey);
                    if (data) {
                        results.push(JSON.parse(data));
                    }
                }
            }
            
            return results.length > 0 ? results : null;
        } catch (error) {
            console.error(`Erreur lors de la récupération depuis localStorage pour ${storeName}:`, error);
            return null;
        }
    }
    
    /**
     * Fallback pour supprimer depuis localStorage
     * @param {string} storeName - Nom du store
     * @param {*} key - Clé de l'entrée à supprimer
     */
    function fallbackRemoveFromLocalStorage(storeName, key) {
        try {
            const storageKey = `${storeName}_${key}`;
            localStorage.removeItem(storageKey);
        } catch (error) {
            console.error(`Erreur lors de la suppression depuis localStorage pour ${storeName}:`, error);
        }
    }
    
    /**
     * Fallback pour vider localStorage pour un store spécifique
     * @param {string} storeName - Nom du store à vider
     */
    function fallbackClearLocalStorage(storeName) {
        try {
            const prefix = `${storeName}_`;
            const keysToRemove = [];
            
            for (let i = 0; i < localStorage.length; i++) {
                const storageKey = localStorage.key(i);
                
                if (storageKey.startsWith(prefix)) {
                    keysToRemove.push(storageKey);
                }
            }
            
            keysToRemove.forEach(key => localStorage.removeItem(key));
        } catch (error) {
            console.error(`Erreur lors du vidage de localStorage pour ${storeName}:`, error);
        }
    }
    
    // API publique
    return {
        initialize,
        save,
        get,
        getByIndex,
        remove,
        clear,
        STORES
    };
})();

// Export du module
window.storage = storage;

// Initialisation au chargement du document
document.addEventListener('DOMContentLoaded', function() {
    storage.initialize().then(success => {
        if (success) {
            console.log('Module de stockage initialisé avec succès');
        } else {
            console.warn('Initialisation du module de stockage en mode dégradé');
        }
    }).catch(error => {
        console.error('Erreur lors de l\'initialisation du module de stockage:', error);
    });
});
