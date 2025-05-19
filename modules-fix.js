// modules-fix.js
// Ce fichier corrige les problèmes d'importation de modules

// Créer les objets globaux pour remplacer les imports
window.Helpers = {
    formatDate: function(date) {
        if (!(date instanceof Date)) {
            date = new Date(date);
        }
        
        const options = { 
            year: 'numeric', 
            month: 'long', 
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        };
        
        return date.toLocaleDateString('fr-FR', options);
    },
    
    generateId: function(prefix = '') {
        return `${prefix}${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    },
    
    clamp: function(value, min, max) {
        return Math.min(Math.max(value, min), max);
    },
    
    getScoreColor: function(score) {
        if (score < 40) {
            return 'score-low';
        } else if (score < 70) {
            return 'score-medium';
        } else {
            return 'score-high';
        }
    },
    
    getDateRange: function(days) {
        const end = new Date();
        const start = new Date();
        start.setDate(start.getDate() - days);
        
        return {
            start,
            end
        };
    },
    
    average: function(numbers) {
        if (!Array.isArray(numbers) || numbers.length === 0) {
            return 0;
        }
        
        const sum = numbers.reduce((total, num) => total + num, 0);
        return Math.round(sum / numbers.length);
    }
};

window.Storage = {
    // Préfixe pour toutes les clés de stockage
    PREFIX: 'bilanVital_',
    
    // Sauvegarder des données
    saveData: function(key, data) {
        try {
            // Sérialiser les données
            const serializedData = JSON.stringify(data);
            
            // Sauvegarder dans le localStorage
            localStorage.setItem(this.PREFIX + key, serializedData);
            
            return true;
        } catch (error) {
            console.error('Erreur lors de la sauvegarde des données:', error);
            return false;
        }
    },
    
    // Récupérer des données
    getData: function(key) {
        try {
            // Récupérer les données depuis le localStorage
            const serializedData = localStorage.getItem(this.PREFIX + key);
            
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
    },
    
    // Supprimer des données
    removeData: function(key) {
        try {
            // Supprimer les données du localStorage
            localStorage.removeItem(this.PREFIX + key);
            
            return true;
        } catch (error) {
            console.error('Erreur lors de la suppression des données:', error);
            return false;
        }
    },
    
    // Vérifier si des données existent
    hasData: function(key) {
        return localStorage.getItem(this.PREFIX + key) !== null;
    },
    
    // Effacer toutes les données de l'application
    clearAllData: function() {
        try {
            // Récupérer toutes les clés du localStorage
            const keys = Object.keys(localStorage);
            
            // Filtrer les clés qui appartiennent à l'application
            const appKeys = keys.filter(key => key.startsWith(this.PREFIX));
            
            // Supprimer chaque clé
            appKeys.forEach(key => localStorage.removeItem(key));
            
            return true;
        } catch (error) {
            console.error('Erreur lors de la suppression de toutes les données:', error);
            return false;
        }
    }
};

// Déclarer tous les autres objets qui pourraient être importés
window.Charts = {};
window.userDataModule = {};
window.testsModule = {};
window.bilanModule = {};
window.plannerModule = {};
window.todaySessionModule = {};

// Ajouter d'autres objets selon les besoins
