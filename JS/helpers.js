/**
 * Utilitaires et fonctions helpers pour l'application Bilan Vital
 */

// Constantes globales en SCREAMING_SNAKE_CASE
const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const PASSWORD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
const DAYS_OF_WEEK = ['Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi', 'Samedi', 'Dimanche'];
const DATE_FORMAT_OPTIONS = {
    LONG: { 
        weekday: 'long', 
        year: 'numeric', 
        month: 'long', 
        day: 'numeric', 
        hour: '2-digit', 
        minute: '2-digit' 
    },
    MEDIUM: { 
        year: 'numeric', 
        month: 'long', 
        day: 'numeric' 
    },
    SHORT: { 
        year: 'numeric', 
        month: '2-digit', 
        day: '2-digit' 
    }
};
const UUID_TEMPLATE = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx';
const LOCALE = 'fr-FR';

const helpers = (function() {
    /**
     * Génère un identifiant unique
     * @returns {string} UUID v4
     */
    function generateUUID() {
        return UUID_TEMPLATE.replace(/[xy]/g, function(c) {
            const r = Math.random() * 16 | 0;
            const v = c === 'x' ? r : (r & 0x3 | 0x8);
            return v.toString(16);
        });
    }
    
    /**
     * Formate une date pour l'affichage
     * @param {string|Date} date - Date à formater
     * @param {string} format - Format de sortie (long, medium, short)
     * @returns {string} Date formatée
     */
    function formatDate(date, format = 'medium') {
        if (!date) return '';
        
        const dateObj = date instanceof Date ? date : new Date(date);
        
        // Vérifier si la date est valide
        if (isNaN(dateObj.getTime())) {
            return '';
        }
        
        // Options de formatage selon le format demandé
        let options;
        
        switch (format) {
            case 'long':
                options = DATE_FORMAT_OPTIONS.LONG;
                break;
            case 'short':
                options = DATE_FORMAT_OPTIONS.SHORT;
                break;
            case 'medium':
            default:
                options = DATE_FORMAT_OPTIONS.MEDIUM;
                break;
        }
        
        return dateObj.toLocaleDateString(LOCALE, options);
    }
    
    /**
     * Formate une durée en minutes sous forme lisible
     * @param {number} minutes - Durée en minutes
     * @returns {string} Durée formatée
     */
    function formatDuration(minutes) {
        if (typeof minutes !== 'number' || minutes < 0) {
            return '';
        }
        
        if (minutes < 60) {
            return `${minutes} minute${minutes > 1 ? 's' : ''}`;
        }
        
        const hours = Math.floor(minutes / 60);
        const remainingMinutes = minutes % 60;
        
        if (remainingMinutes === 0) {
            return `${hours} heure${hours > 1 ? 's' : ''}`;
        }
        
        return `${hours} heure${hours > 1 ? 's' : ''} ${remainingMinutes} minute${remainingMinutes > 1 ? 's' : ''}`;
    }
    
    /**
     * Tronque un texte à une longueur maximale
     * @param {string} text - Texte à tronquer
     * @param {number} maxLength - Longueur maximale
     * @returns {string} Texte tronqué
     */
    function truncateText(text, maxLength) {
        if (!text || typeof text !== 'string') {
            return '';
        }
        
        if (text.length <= maxLength) {
            return text;
        }
        
        return text.substring(0, maxLength) + '...';
    }
    
    /**
     * Vérifie si un objet est vide
     * @param {Object} obj - Objet à vérifier
     * @returns {boolean} Vrai si l'objet est vide
     */
    function isEmptyObject(obj) {
        if (!obj || typeof obj !== 'object') {
            return true;
        }
        
        return Object.keys(obj).length === 0;
    }
    
    /**
     * Mélange aléatoirement un tableau (algorithme de Fisher-Yates)
     * @param {Array} array - Tableau à mélanger
     * @returns {Array} Tableau mélangé
     */
    function shuffleArray(array) {
        if (!Array.isArray(array)) {
            return [];
        }
        
        const shuffled = [...array];
        
        for (let i = shuffled.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
        }
        
        return shuffled;
    }
    
    /**
     * Débogage: affiche un message dans la console si le mode debug est activé
     * @param {string} message - Message à afficher
     * @param {*} data - Données à logger
     */
    function debug(message, data) {
        if (window.app && window.app.config && window.app.config.debug) {
            console.log(`[DEBUG] ${message}`, data);
        }
    }
    
    /**
     * Calcule le pourcentage d'une valeur par rapport à un total
     * @param {number} value - Valeur
     * @param {number} total - Total
     * @returns {number} Pourcentage
     */
    function calculatePercentage(value, total) {
        if (typeof value !== 'number' || typeof total !== 'number' || total === 0) {
            return 0;
        }
        
        return (value / total) * 100;
    }
    
    /**
     * Arrondit un nombre à un nombre spécifié de décimales
     * @param {number} value - Valeur à arrondir
     * @param {number} decimals - Nombre de décimales
     * @returns {number} Valeur arrondie
     */
    function roundNumber(value, decimals = 2) {
        if (typeof value !== 'number') {
            return 0;
        }
        
        const factor = Math.pow(10, decimals);
        return Math.round(value * factor) / factor;
    }
    
    /**
     * Calcule la moyenne d'un tableau de nombres
     * @param {Array<number>} numbers - Tableau de nombres
     * @returns {number} Moyenne
     */
    function calculateAverage(numbers) {
        if (!Array.isArray(numbers) || numbers.length === 0) {
            return 0;
        }
        
        const sum = numbers.reduce((acc, val) => acc + (typeof val === 'number' ? val : 0), 0);
        return sum / numbers.length;
    }
    
    /**
     * Calcule l'âge à partir d'une date de naissance
     * @param {string|Date} birthDate - Date de naissance
     * @returns {number} Âge en années
     */
    function calculateAge(birthDate) {
        if (!birthDate) {
            return 0;
        }
        
        const birth = birthDate instanceof Date ? birthDate : new Date(birthDate);
        
        // Vérifier si la date est valide
        if (isNaN(birth.getTime())) {
            return 0;
        }
        
        const today = new Date();
        let age = today.getFullYear() - birth.getFullYear();
        const monthDiff = today.getMonth() - birth.getMonth();
        
        if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birth.getDate())) {
            age--;
        }
        
        return age;
    }
    
    /**
     * Convertit une chaîne en slug (pour les URLs)
     * @param {string} text - Texte à convertir
     * @returns {string} Slug
     */
    function slugify(text) {
        if (!text || typeof text !== 'string') {
            return '';
        }
        
        return text
            .toLowerCase()
            .replace(/[àáâäæãåā]/g, 'a')
            .replace(/[çćč]/g, 'c')
            .replace(/[èéêëēėę]/g, 'e')
            .replace(/[îïíīįì]/g, 'i')
            .replace(/[ôöòóœøōõ]/g, 'o')
            .replace(/[ûüùúū]/g, 'u')
            .replace(/[ÿ]/g, 'y')
            .replace(/[ñń]/g, 'n')
            .replace(/[šś]/g, 's')
            .replace(/[žźż]/g, 'z')
            .replace(/[^a-z0-9]/g, '-')
            .replace(/-+/g, '-')
            .replace(/^-|-$/g, '');
    }
    
    /**
     * Valide une adresse email
     * @param {string} email - Email à valider
     * @returns {boolean} Vrai si l'email est valide
     */
    function validateEmail(email) {
        if (!email || typeof email !== 'string') {
            return false;
        }
        
        return EMAIL_REGEX.test(email);
    }
    
    /**
     * Valide un mot de passe (doit contenir au moins 8 caractères, une majuscule, 
     * une minuscule, un chiffre et un caractère spécial)
     * @param {string} password - Mot de passe à valider
     * @returns {boolean} Vrai si le mot de passe est valide
     */
    function validatePassword(password) {
        if (!password || typeof password !== 'string') {
            return false;
        }
        
        return PASSWORD_REGEX.test(password);
    }
    
    /**
     * Échappe les caractères HTML pour éviter les injections XSS
     * @param {string} html - Chaîne à échapper
     * @returns {string} Chaîne échappée
     */
    function escapeHtml(html) {
        if (!html || typeof html !== 'string') {
            return '';
        }
        
        return html
            .replace(/&/g, '&amp;')
            .replace(/</g, '&lt;')
            .replace(/>/g, '&gt;')
            .replace(/"/g, '&quot;')
            .replace(/'/g, '&#039;');
    }
    
    /**
     * Génère un nombre aléatoire entre min et max (inclus)
     * @param {number} min - Valeur minimale
     * @param {number} max - Valeur maximale
     * @returns {number} Nombre aléatoire
     */
    function getRandomNumber(min, max) {
        if (typeof min !== 'number' || typeof max !== 'number') {
            return 0;
        }
        
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }
    
    /**
     * Vérifie si la date est aujourd'hui
     * @param {string|Date} date - Date à vérifier
     * @returns {boolean} Vrai si la date est aujourd'hui
     */
    function isToday(date) {
        if (!date) {
            return false;
        }
        
        const dateObj = date instanceof Date ? date : new Date(date);
        
        // Vérifier si la date est valide
        if (isNaN(dateObj.getTime())) {
            return false;
        }
        
        const today = new Date();
        
        return dateObj.getDate() === today.getDate() &&
            dateObj.getMonth() === today.getMonth() &&
            dateObj.getFullYear() === today.getFullYear();
    }
    
    /**
     * Obtient le jour de la semaine pour une date (0 = lundi, 6 = dimanche)
     * @param {string|Date} date - Date 
     * @returns {number} Jour de la semaine (0-6)
     */
    function getDayOfWeek(date) {
        if (!date) {
            return null;
        }
        
        const dateObj = date instanceof Date ? date : new Date(date);
        
        // Vérifier si la date est valide
        if (isNaN(dateObj.getTime())) {
            return null;
        }
        
        // getDay() retourne 0 pour dimanche, 1 pour lundi, etc.
        // On transforme pour avoir 0 pour lundi, 6 pour dimanche
        let day = dateObj.getDay();
        return day === 0 ? 6 : day - 1;
    }
    
    /**
     * Obtient la date de début de la semaine courante (lundi)
     * @returns {Date} Lundi de la semaine courante
     */
    function getStartOfWeek() {
        const today = new Date();
        const day = today.getDay(); // 0 = dimanche, 1 = lundi, etc.
        
        // Calculer la différence pour arriver à lundi
        // Si on est dimanche (0), on recule de 6 jours
        // Si on est lundi (1), on recule de 0 jour, etc.
        const diff = day === 0 ? 6 : day - 1;
        
        const monday = new Date(today);
        monday.setDate(today.getDate() - diff);
        monday.setHours(0, 0, 0, 0);
        
        return monday;
    }
    
    /**
     * Détermine si deux dates sont dans la même semaine
     * @param {string|Date} date1 - Première date
     * @param {string|Date} date2 - Deuxième date
     * @returns {boolean} Vrai si les dates sont dans la même semaine
     */
    function isSameWeek(date1, date2) {
        if (!date1 || !date2) {
            return false;
        }
        
        const d1 = date1 instanceof Date ? date1 : new Date(date1);
        const d2 = date2 instanceof Date ? date2 : new Date(date2);
        
        // Vérifier si les dates sont valides
        if (isNaN(d1.getTime()) || isNaN(d2.getTime())) {
            return false;
        }
        
        // Obtenir le début de semaine pour chaque date
        const startOfWeek1 = new Date(d1);
        const day1 = d1.getDay();
        const diff1 = day1 === 0 ? 6 : day1 - 1;
        startOfWeek1.setDate(d1.getDate() - diff1);
        startOfWeek1.setHours(0, 0, 0, 0);
        
        const startOfWeek2 = new Date(d2);
        const day2 = d2.getDay();
        const diff2 = day2 === 0 ? 6 : day2 - 1;
        startOfWeek2.setDate(d2.getDate() - diff2);
        startOfWeek2.setHours(0, 0, 0, 0);
        
        // Comparer les débuts de semaine
        return startOfWeek1.getTime() === startOfWeek2.getTime();
    }
    
    // API publique
    return {
        generateUUID,
        formatDate,
        formatDuration,
        truncateText,
        isEmptyObject,
        shuffleArray,
        debug,
        calculatePercentage,
        roundNumber,
        calculateAverage,
        calculateAge,
        slugify,
        validateEmail,
        validatePassword,
        escapeHtml,
        getRandomNumber,
        isToday,
        getDayOfWeek,
        getStartOfWeek,
        isSameWeek
    };
})();

// Export du module
window.helpers = helpers;
