// stockage.js - Gestion simplifiée du stockage local
const Storage = (function() {
    // Préfixe pour toutes les clés de stockage
    const PREFIX = 'bilanVital_';
    
    // Sauvegarder des données
    function saveData(key, data) {
        try {
            // Sérialiser les données
            const serializedData = JSON.stringify(data);
            
            // Sauvegarder dans le localStorage
            localStorage.setItem(PREFIX + key, serializedData);
            
            return true;
        } catch (error) {
            console.error('Erreur lors de la sauvegarde des données:', error);
            return false;
        }
    }
    
    // Récupérer des données
    function getData(key) {
        try {
            // Récupérer les données depuis le localStorage
            const serializedData = localStorage.getItem(PREFIX + key);
            
            // Vérifier si les données existent
            if (!serializedData) {
                return null;
            }
            
            // Désérialiser les données
            return JSON.parse(serializedData);
        } catch (error) {
            console.error('Erreur lors de la récupération des données:', error);
            return null;
        }
    }
    
    // Supprimer des données
    function removeData(key) {
        try {
            // Supprimer les données du localStorage
            localStorage.removeItem(PREFIX + key);
            
            return true;
        } catch (error) {
            console.error('Erreur lors de la suppression des données:', error);
            return false;
        }
    }
    
    // Vérifier si des données existent
    function hasData(key) {
        return localStorage.getItem(PREFIX + key) !== null;
    }
    
    // Effacer toutes les données de l'application
    function clearAllData() {
        try {
            // Récupérer toutes les clés du localStorage
            const keys = Object.keys(localStorage);
            
            // Filtrer les clés qui appartiennent à l'application
            const appKeys = keys.filter(key => key.startsWith(PREFIX));
            
            // Supprimer chaque clé
            appKeys.forEach(key => localStorage.removeItem(key));
            
            return true;
        } catch (error) {
            console.error('Erreur lors de la suppression de toutes les données:', error);
            return false;
        }
    }
    
    // Interface publique
    return {
        saveData,
        getData,
        removeData,
        hasData,
        clearAllData,
        // Alias pour compatibilité
        save: saveData,
        get: getData,
        remove: removeData,
        has: hasData,
        clear: clearAllData
    };
})();

// Export global pour compatibilité avec app.js
window.storage = Storage;
window.Storage = Storage;
