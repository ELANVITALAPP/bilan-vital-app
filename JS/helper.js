// helpers.js - Fonctions utilitaires simplifiées
const Helpers = (function() {
    // Fonction pour formater une date
    function formatDate(date) {
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
    }
    
    // Fonction pour générer un ID unique
    function generateId(prefix = '') {
        return `${prefix}${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    }
    
    // Fonction pour limiter une valeur à une plage
    function clamp(value, min, max) {
        return Math.min(Math.max(value, min), max);
    }
    
    // Fonction pour obtenir une couleur en fonction d'un score
    function getScoreColor(score) {
        if (score < 40) {
            return 'score-low';
        } else if (score < 70) {
            return 'score-medium';
        } else {
            return 'score-high';
        }
    }
    
    // Fonction pour obtenir un intervalle de dates
    function getDateRange(days) {
        const end = new Date();
        const start = new Date();
        start.setDate(start.getDate() - days);
        
        return {
            start,
            end
        };
    }
    
    // Fonction pour calculer la moyenne d'un tableau de nombres
    function average(numbers) {
        if (!Array.isArray(numbers) || numbers.length === 0) {
            return 0;
        }
        
        const sum = numbers.reduce((total, num) => total + num, 0);
        return Math.round(sum / numbers.length);
    }
    
    // Interface publique
    return {
        formatDate,
        generateId,
        clamp,
        getScoreColor,
        getDateRange,
        average
    };
})();
