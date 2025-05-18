/**
 * Module de gestion des graphiques de l'application Bilan Vital
 * Utilise des fonctions personnalisées pour générer les visualisations
 */

const charts = (function() {
    // Configuration des couleurs - constante globale en SCREAMING_SNAKE_CASE
    const COLORS = {
        PRIMARY: '#00813F',
        SECONDARY: '#007F5F',
        TERTIARY: '#00A36C',
        LIGHT_GRAY: '#f0f0f0',
        MEDIUM_GRAY: '#d0d0d0',
        DARK_GRAY: '#606060',
        WHITE: '#ffffff',
        TRANSPARENT: 'rgba(0, 0, 0, 0)'
    };
    
    // Constantes pour les types de graphiques
    const CHART_TYPES = {
        DONUT: 'donut',
        PROGRESS_BAR: 'progressBar',
        RADAR: 'radar',
        LINE: 'line',
        MULTI_LINE: 'multiLine',
        BAR: 'bar'
    };
    
    // Paramètres communs pour les graphiques
    const CHART_PARAMS = {
        DEFAULT_MAX_VALUE: 10,
        RADAR_LEVELS: 5,
        LINE_STEPS: 5,
        BAR_STEPS: 5,
        MAX_X_LABELS: 7
    };
    
    // Stockage des instances de graphiques - variable en camelCase car elle change
    const chartInstances = {};
    
    /**
     * Crée un graphique en anneau (donut)
     * @param {string} elementId - ID de l'élément où créer le graphique
     * @param {number} value - Valeur à afficher (0-10)
     * @param {number} maxValue - Valeur maximale
     * @param {string} color - Couleur du graphique
     * @returns {Object} Instance du graphique
     */
    function createDonutChart(elementId, value, maxValue = CHART_PARAMS.DEFAULT_MAX_VALUE, color = COLORS.PRIMARY) {
        const container = document.getElementById(elementId);
        if (!container) return null;
        
        // Nettoyer le contenu existant
        container.innerHTML = '';
        
        // Calculer le pourcentage
        const percentage = (value / maxValue) * 100;
        
        // Créer un canvas pour le graphique
        const canvas = document.createElement('canvas');
        canvas.width = container.clientWidth;
        canvas.height = container.clientHeight;
        container.appendChild(canvas);
        
        // Créer un élément pour afficher la valeur au centre
        const valueDisplay = document.createElement('div');
        valueDisplay.className = 'chart-value-display';
        valueDisplay.textContent = value.toFixed(1);
        container.appendChild(valueDisplay);
        
        // Obtenir le contexte de dessin
        const ctx = canvas.getContext('2d');
        
        // Dessiner l'arrière-plan (cercle complet gris)
        drawCircle(ctx, canvas.width / 2, canvas.height / 2, canvas.width / 2.5, 0, 2 * Math.PI, COLORS.LIGHT_GRAY);
        
        // Dessiner la partie remplie (arc coloré)
        const startAngle = -0.5 * Math.PI; // Commencer en haut
        const endAngle = startAngle + (percentage / 100) * (2 * Math.PI);
        drawCircle(ctx, canvas.width / 2, canvas.height / 2, canvas.width / 2.5, startAngle, endAngle, color);
        
        // Dessiner le trou intérieur (pour créer l'effet donut)
        drawCircle(ctx, canvas.width / 2, canvas.height / 2, canvas.width / 5, 0, 2 * Math.PI, COLORS.WHITE);
        
        // Stocker l'instance du graphique
        chartInstances[elementId] = {
            type: CHART_TYPES.DONUT,
            value: value,
            maxValue: maxValue,
            color: color,
            percentage: percentage
        };
        
        return chartInstances[elementId];
    }
    
    /**
     * Dessine un cercle ou un arc de cercle
     * @param {CanvasRenderingContext2D} ctx - Contexte de dessin
     * @param {number} x - Coordonnée X du centre
     * @param {number} y - Coordonnée Y du centre
     * @param {number} radius - Rayon du cercle
     * @param {number} startAngle - Angle de début
     * @param {number} endAngle - Angle de fin
     * @param {string} color - Couleur de remplissage
     */
    function drawCircle(ctx, x, y, radius, startAngle, endAngle, color) {
        ctx.beginPath();
        ctx.arc(x, y, radius, startAngle, endAngle);
        
        // Si c'est un cercle complet, on le remplit simplement
        if (endAngle - startAngle >= 2 * Math.PI) {
            ctx.fillStyle = color;
            ctx.fill();
        } else {
            // Sinon, on dessine un secteur en traçant des lignes vers le centre
            ctx.lineTo(x, y);
            ctx.closePath();
            ctx.fillStyle = color;
            ctx.fill();
        }
    }
    
    /**
     * Crée une barre de progression
     * @param {string} elementId - ID de l'élément où créer la barre
     * @param {number} value - Valeur entre 0 et 1
     * @param {string} color - Couleur de la barre
     * @returns {Object} Instance de la barre
     */
    function createProgressBar(elementId, value, color = COLORS.PRIMARY) {
        const container = document.getElementById(elementId);
        if (!container) return null;
        
        // Nettoyer le contenu existant
        container.innerHTML = '';
        
        // Créer la structure de la barre de progression
        const progressBarContainer = document.createElement('div');
        progressBarContainer.className = 'progress-bar-container';
        
        const progressBar = document.createElement('div');
        progressBar.className = 'progress-bar';
        progressBar.style.width = `${value * 100}%`;
        progressBar.style.backgroundColor = color;
        
        // Ajouter au DOM
        progressBarContainer.appendChild(progressBar);
        container.appendChild(progressBarContainer);
        
        // Stocker l'instance
        chartInstances[elementId] = {
            type: CHART_TYPES.PROGRESS_BAR,
            value: value,
            color: color
        };
        
        return chartInstances[elementId];
    }
    
    /**
     * Met à jour une barre de progression existante
     * @param {string} elementId - ID de l'élément à mettre à jour
     * @param {number} value - Nouvelle valeur entre 0 et 1
     * @returns {Object} Instance mise à jour
     */
    function updateProgressBar(elementId, value) {
        const container = document.getElementById(elementId);
        if (!container) return null;
        
        const progressBar = container.querySelector('.progress-bar');
        if (!progressBar) return null;
        
        // Mettre à jour la largeur
        progressBar.style.width = `${value * 100}%`;
        
        // Mettre à jour l'instance
        if (chartInstances[elementId]) {
            chartInstances[elementId].value = value;
        }
        
        return chartInstances[elementId];
    }
    
    /**
     * Crée un graphique en radar
     * @param {string} elementId - ID de l'élément où créer le graphique
     * @param {Object} data - Données pour le graphique radar (format {categoryName: score})
     * @returns {Object} Instance du graphique
     */
    function createRadarChart(elementId, data) {
        const container = document.getElementById(elementId);
        if (!container) return null;
        
        // Nettoyer le contenu existant
        container.innerHTML = '';
        
        // Créer un canvas pour le graphique
        const canvas = document.createElement('canvas');
        canvas.width = container.clientWidth;
        canvas.height = container.clientHeight;
        container.appendChild(canvas);
        
        // Obtenir le contexte de dessin
        const ctx = canvas.getContext('2d');
        
        // Extraire les catégories et les valeurs
        const categories = Object.keys(data);
        const values = categories.map(cat => data[cat].score || 0);
        const maxValue = CHART_PARAMS.DEFAULT_MAX_VALUE; // Valeur maximale (échelle 0-10)
        
        // Paramètres du radar
        const centerX = canvas.width / 2;
        const centerY = canvas.height / 2;
        const radius = Math.min(centerX, centerY) * 0.8;
        const angleStep = (2 * Math.PI) / categories.length;
        
        // Dessiner les axes et cercles concentriques
        drawRadarGrid(ctx, centerX, centerY, radius, categories.length, maxValue);
        
        // Dessiner les labels des catégories
        drawRadarLabels(ctx, centerX, centerY, radius, categories, angleStep);
        
        // Dessiner le polygone des données
        drawRadarData(ctx, centerX, centerY, radius, values, angleStep, maxValue);
        
        // Stocker l'instance du graphique
        chartInstances[elementId] = {
            type: CHART_TYPES.RADAR,
            categories: categories,
            values: values,
            maxValue: maxValue
        };
        
        return chartInstances[elementId];
    }
    
    /**
     * Dessine la grille d'un graphique radar
     * @param {CanvasRenderingContext2D} ctx - Contexte de dessin
     * @param {number} centerX - Coordonnée X du centre
     * @param {number} centerY - Coordonnée Y du centre
     * @param {number} radius - Rayon du radar
     * @param {number} segments - Nombre de segments (catégories)
     * @param {number} maxValue - Valeur maximale
     */
    function drawRadarGrid(ctx, centerX, centerY, radius, segments, maxValue) {
        // Dessiner les cercles concentriques
        const levels = CHART_PARAMS.RADAR_LEVELS; // Nombre de niveaux
        
        for (let i = 1; i <= levels; i++) {
            const levelRadius = (radius * i) / levels;
            
            ctx.beginPath();
            ctx.arc(centerX, centerY, levelRadius, 0, 2 * Math.PI);
            ctx.strokeStyle = COLORS.MEDIUM_GRAY;
            ctx.lineWidth = 1;
            ctx.stroke();
        }
        
        // Dessiner les axes
        const angleStep = (2 * Math.PI) / segments;
        
        for (let i = 0; i < segments; i++) {
            const angle = i * angleStep;
            
            ctx.beginPath();
            ctx.moveTo(centerX, centerY);
            ctx.lineTo(
                centerX + radius * Math.cos(angle),
                centerY + radius * Math.sin(angle)
            );
            ctx.strokeStyle = COLORS.MEDIUM_GRAY;
            ctx.lineWidth = 1;
            ctx.stroke();
        }
    }
    
    /**
     * Dessine les labels d'un graphique radar
     * @param {CanvasRenderingContext2D} ctx - Contexte de dessin
     * @param {number} centerX - Coordonnée X du centre
     * @param {number} centerY - Coordonnée Y du centre
     * @param {number} radius - Rayon du radar
     * @param {Array} categories - Tableau des catégories
     * @param {number} angleStep - Pas angulaire entre chaque catégorie
     */
    function drawRadarLabels(ctx, centerX, centerY, radius, categories, angleStep) {
        ctx.fillStyle = COLORS.DARK_GRAY;
        ctx.font = '12px Arial';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        
        for (let i = 0; i < categories.length; i++) {
            const angle = i * angleStep;
            
            // Calculer la position du label (un peu plus loin que le rayon)
            const labelX = centerX + (radius + 20) * Math.cos(angle);
            const labelY = centerY + (radius + 20) * Math.sin(angle);
            
            // Pour une lisibilité optimale, ajuster les alignements selon la position
            if (angle === 0) {
                ctx.textAlign = 'left';
                ctx.textBaseline = 'middle';
            } else if (angle === Math.PI) {
                ctx.textAlign = 'right';
                ctx.textBaseline = 'middle';
            } else if (angle < Math.PI) {
                ctx.textAlign = 'center';
                ctx.textBaseline = 'top';
            } else {
                ctx.textAlign = 'center';
                ctx.textBaseline = 'bottom';
            }
            
            ctx.fillText(categories[i], labelX, labelY);
        }
        
        // Réinitialiser les alignements
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
    }
    
    /**
     * Dessine les données d'un graphique radar
     * @param {CanvasRenderingContext2D} ctx - Contexte de dessin
     * @param {number} centerX - Coordonnée X du centre
     * @param {number} centerY - Coordonnée Y du centre
     * @param {number} radius - Rayon du radar
     * @param {Array} values - Tableau des valeurs
     * @param {number} angleStep - Pas angulaire entre chaque catégorie
     * @param {number} maxValue - Valeur maximale
     */
    function drawRadarData(ctx, centerX, centerY, radius, values, angleStep, maxValue) {
        ctx.beginPath();
        
        for (let i = 0; i < values.length; i++) {
            const angle = i * angleStep;
            const valueRadius = (radius * values[i]) / maxValue;
            
            const x = centerX + valueRadius * Math.cos(angle);
            const y = centerY + valueRadius * Math.sin(angle);
            
            if (i === 0) {
                ctx.moveTo(x, y);
            } else {
                ctx.lineTo(x, y);
            }
        }
        
        // Fermer le polygone
        const firstAngle = 0;
        const firstValueRadius = (radius * values[0]) / maxValue;
        ctx.lineTo(
            centerX + firstValueRadius * Math.cos(firstAngle),
            centerY + firstValueRadius * Math.sin(firstAngle)
        );
        
        // Remplir avec une couleur semi-transparente
        ctx.fillStyle = `${COLORS.PRIMARY}40`; // 40 = 25% opacity
        ctx.fill();
        
        // Dessiner le contour
        ctx.strokeStyle = COLORS.PRIMARY;
        ctx.lineWidth = 2;
        ctx.stroke();
        
        // Dessiner les points
        for (let i = 0; i < values.length; i++) {
            const angle = i * angleStep;
            const valueRadius = (radius * values[i]) / maxValue;
            
            const x = centerX + valueRadius * Math.cos(angle);
            const y = centerY + valueRadius * Math.sin(angle);
            
            ctx.beginPath();
            ctx.arc(x, y, 4, 0, 2 * Math.PI);
            ctx.fillStyle = COLORS.PRIMARY;
            ctx.fill();
            ctx.strokeStyle = COLORS.WHITE;
            ctx.lineWidth = 1;
            ctx.stroke();
        }
    }
    
    /**
     * Crée un graphique linéaire
     * @param {string} elementId - ID de l'élément où créer le graphique
     * @param {Array} data - Données pour le graphique (format [{date: string, score: number}])
     * @returns {Object} Instance du graphique
     */
    function createLineChart(elementId, data) {
        const container = document.getElementById(elementId);
        if (!container || !data || data.length === 0) return null;
        
        // Nettoyer le contenu existant
        container.innerHTML = '';
        
        // Créer un canvas pour le graphique
        const canvas = document.createElement('canvas');
        canvas.width = container.clientWidth;
        canvas.height = container.clientHeight;
        container.appendChild(canvas);
        
        // Obtenir le contexte de dessin
        const ctx = canvas.getContext('2d');
        
        // Trier les données par date
        const sortedData = [...data].sort((a, b) => {
            return new Date(a.date) - new Date(b.date);
        });
        
        // Extraire les dates et les scores
        const dates = sortedData.map(item => item.date);
        const scores = sortedData.map(item => item.score);
        
        // Déterminer les valeurs minimales et maximales
        const minScore = Math.min(...scores);
        const maxScore = Math.max(...scores);
        
        // Paramètres du graphique
        const padding = {
            top: 20,
            right: 30,
            bottom: 40,
            left: 50
        };
        
        const chartWidth = canvas.width - padding.left - padding.right;
        const chartHeight = canvas.height - padding.top - padding.bottom;
        
        // Dessiner les axes
        drawLineChartAxes(ctx, padding, chartWidth, chartHeight, dates, minScore, maxScore);
        
        // Dessiner la ligne
        drawLineChartData(ctx, padding, chartWidth, chartHeight, sortedData, minScore, maxScore);
        
        // Stocker l'instance du graphique
        chartInstances[elementId] = {
            type: CHART_TYPES.LINE,
            data: sortedData,
            minValue: minScore,
            maxValue: maxScore
        };
        
        return chartInstances[elementId];
    }
    
    /**
     * Dessine les axes d'un graphique linéaire
     * @param {CanvasRenderingContext2D} ctx - Contexte de dessin
     * @param {Object} padding - Marges du graphique
     * @param {number} width - Largeur du graphique
     * @param {number} height - Hauteur du graphique
     * @param {Array} dates - Tableau des dates
     * @param {number} minValue - Valeur minimale
     * @param {number} maxValue - Valeur maximale
     */
    function drawLineChartAxes(ctx, padding, width, height, dates, minValue, maxValue) {
        // Dessiner l'axe X
        ctx.beginPath();
        ctx.moveTo(padding.left, padding.top + height);
        ctx.lineTo(padding.left + width, padding.top + height);
        ctx.strokeStyle = COLORS.DARK_GRAY;
        ctx.lineWidth = 1;
        ctx.stroke();
        
        // Dessiner l'axe Y
        ctx.beginPath();
        ctx.moveTo(padding.left, padding.top);
        ctx.lineTo(padding.left, padding.top + height);
        ctx.stroke();
        
        // Dessiner les graduations et labels de l'axe X
        ctx.fillStyle = COLORS.DARK_GRAY;
        ctx.font = '10px Arial';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'top';
        
        // On va afficher un maximum de 7 dates sur l'axe X pour éviter l'encombrement
        const stepX = Math.max(1, Math.ceil(dates.length / CHART_PARAMS.MAX_X_LABELS));
        
        for (let i = 0; i < dates.length; i += stepX) {
            const x = padding.left + (i / (dates.length - 1)) * width;
            
            // Graduation
            ctx.beginPath();
            ctx.moveTo(x, padding.top + height);
            ctx.lineTo(x, padding.top + height + 5);
            ctx.stroke();
            
            // Label (date formatée)
            const formattedDate = formatDate(dates[i]);
            ctx.fillText(formattedDate, x, padding.top + height + 10);
        }
        
        // Dessiner les graduations et labels de l'axe Y
        ctx.textAlign = 'right';
        ctx.textBaseline = 'middle';
        
        const steps = CHART_PARAMS.LINE_STEPS; // Nombre de graduations
        const valueRange = maxValue - minValue;
        const stepValue = valueRange / steps;
        
        for (let i = 0; i <= steps; i++) {
            const value = minValue + i * stepValue;
            const y = padding.top + height - (i / steps) * height;
            
            // Ligne horizontale
            ctx.beginPath();
            ctx.moveTo(padding.left, y);
            ctx.lineTo(padding.left - 5, y);
            ctx.stroke();
            
            // Ligne de grille en pointillés
            ctx.beginPath();
            ctx.moveTo(padding.left, y);
            ctx.lineTo(padding.left + width, y);
            ctx.setLineDash([5, 5]);
            ctx.strokeStyle = COLORS.MEDIUM_GRAY;
            ctx.stroke();
            ctx.setLineDash([]);
            ctx.strokeStyle = COLORS.DARK_GRAY;
            
            // Label
            ctx.fillText(value.toFixed(1), padding.left - 10, y);
        }
    }
    
    /**
     * Dessine les données d'un graphique linéaire
     * @param {CanvasRenderingContext2D} ctx - Contexte de dessin
     * @param {Object} padding - Marges du graphique
     * @param {number} width - Largeur du graphique
     * @param {number} height - Hauteur du graphique
     * @param {Array} data - Données du graphique
     * @param {number} minValue - Valeur minimale
     * @param {number} maxValue - Valeur maximale
     */
    function drawLineChartData(ctx, padding, width, height, data, minValue, maxValue) {
        const valueRange = maxValue - minValue;
        
        // Dessiner la ligne
        ctx.beginPath();
        
        for (let i = 0; i < data.length; i++) {
            const x = padding.left + (i / (data.length - 1)) * width;
            const y = padding.top + height - ((data[i].score - minValue) / valueRange) * height;
            
            if (i === 0) {
                ctx.moveTo(x, y);
            } else {
                ctx.lineTo(x, y);
            }
        }
        
        ctx.strokeStyle = COLORS.PRIMARY;
        ctx.lineWidth = 2;
        ctx.stroke();
        
        // Dessiner les points
        for (let i = 0; i < data.length; i++) {
            const x = padding.left + (i / (data.length - 1)) * width;
            const y = padding.top + height - ((data[i].score - minValue) / valueRange) * height;
            
            ctx.beginPath();
            ctx.arc(x, y, 4, 0, 2 * Math.PI);
            ctx.fillStyle = COLORS.PRIMARY;
            ctx.fill();
            ctx.strokeStyle = COLORS.WHITE;
            ctx.lineWidth = 1;
            ctx.stroke();
        }
    }
    
    // Les autres fonctions restent en camelCase car ce sont des fonctions
    
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
            month: 'short'
        });
    }
    
    // API publique
    return {
        createDonutChart,
        createProgressBar,
        updateProgressBar,
        createRadarChart,
        createLineChart,
        createMultiLineChart,
        updateMultiLineChart,
        createBarChart,
        updateBarChart
    };
})();

// Export du module
window.charts = charts;

// Initialisation au chargement du document
document.addEventListener('DOMContentLoaded', function() {
    console.log('Module charts initialisé');
});
