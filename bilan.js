// bilan.js - Exemple de mise à jour pour éliminer les imports/exports
// Utiliser une structure globale (IIFE) au lieu de modules ES6

const Bilan = (function() {
    // Variables privées
    let userResults = [];
    
    // Fonction pour charger les données utilisateur
    function loadUserData() {
        try {
            // Utiliser l'objet Storage global au lieu d'import
            const savedResults = Storage.getData('testResults');
            
            if (!savedResults || !Array.isArray(savedResults) || savedResults.length === 0) {
                displayNoDataMessage();
                return;
            }
            
            userResults = savedResults;
            
            // Afficher les données
            displayVitalScore();
            displayCategoryScores();
            displayTestHistory();
            
        } catch (error) {
            console.error('Erreur lors du chargement des données utilisateur:', error);
            displayErrorMessage(error);
        }
    }
    
    // Fonction pour afficher un message d'absence de données
    function displayNoDataMessage() {
        // VitalScore
        document.getElementById('vital-score-value').textContent = '--';
        
        // Scores par catégorie
        document.getElementById('category-scores-container').innerHTML = `
            <p class="no-data">Complétez au moins un test pour voir vos scores par catégorie.</p>
        `;
        
        // Historique des tests
        document.getElementById('test-history-container').innerHTML = `
            <p class="no-data">Aucun test complété pour le moment.</p>
        `;
    }
    
    // Fonction pour afficher un message d'erreur
    function displayErrorMessage(error) {
        console.error('Erreur dans le bilan:', error);
        
        // VitalScore
        document.getElementById('vital-score-value').textContent = '--';
        
        // Scores par catégorie
        document.getElementById('category-scores-container').innerHTML = `
            <p class="error-message">Une erreur est survenue lors du chargement des données.</p>
        `;
        
        // Historique des tests
        document.getElementById('test-history-container').innerHTML = `
            <p class="error-message">Une erreur est survenue lors du chargement de l'historique.</p>
        `;
    }
    
    // Fonction pour afficher le VitalScore
    function displayVitalScore() {
        try {
            // Calculer le score moyen
            let totalScore = 0;
            userResults.forEach(result => {
                totalScore += result.globalScore;
            });
            
            const averageScore = Math.round(totalScore / userResults.length);
            
            // Afficher le score
            document.getElementById('vital-score-value').textContent = averageScore;
            
            // Ajouter une classe en fonction du score
            const scoreElement = document.getElementById('vital-score-value').parentElement;
            
            // Supprimer les classes précédentes
            scoreElement.classList.remove('score-low', 'score-medium', 'score-high');
            
            // Ajouter la nouvelle classe en utilisant la fonction helper
            if (averageScore < 40) {
                scoreElement.classList.add('score-low');
            } else if (averageScore < 70) {
                scoreElement.classList.add('score-medium');
            } else {
                scoreElement.classList.add('score-high');
            }
        } catch (error) {
            console.error('Erreur lors de l\'affichage du VitalScore:', error);
            document.getElementById('vital-score-value').textContent = '--';
        }
    }
    
    // Fonction pour afficher les scores par catégorie
    function displayCategoryScores() {
        try {
            // Regrouper les résultats par catégorie
            const categoryTests = groupTestsByCategory();
            
            // Vérifier s'il y a des résultats
            if (Object.keys(categoryTests).length === 0) {
                document.getElementById('category-scores-container').innerHTML = `
                    <p class="no-data">Complétez au moins un test pour voir vos scores par catégorie.</p>
                `;
                return;
            }
            
            // Créer le contenu HTML
            let html = '';
            
            // Parcourir chaque catégorie
            for (const categoryName in categoryTests) {
                const tests = categoryTests[categoryName];
                
                // Calculer le score moyen pour cette catégorie
                let totalScore = 0;
                tests.forEach(test => {
                    totalScore += test.globalScore;
                });
                const averageScore = Math.round(totalScore / tests.length);
                
                // Déterminer la classe de couleur
                let colorClass = '';
                if (averageScore < 40) {
                    colorClass = 'score-low';
                } else if (averageScore < 70) {
                    colorClass = 'score-medium';
                } else {
                    colorClass = 'score-high';
                }
                
                // Créer l'élément de catégorie
                html += `
                    <div class="category-score">
                        <h4>${categoryName}</h4>
                        <div class="score-bar">
                            <div class="score-fill ${colorClass}" style="width: ${averageScore}%"></div>
                            <span class="score-value">${averageScore}</span>
                        </div>
                    </div>
                `;
            }
            
            // Mettre à jour le conteneur
            document.getElementById('category-scores-container').innerHTML = html;
        } catch (error) {
            console.error('Erreur lors de l\'affichage des scores par catégorie:', error);
            document.getElementById('category-scores-container').innerHTML = `
                <p class="error-message">Une erreur est survenue lors du chargement des scores par catégorie.</p>
            `;
        }
    }
    
    // Fonction pour afficher l'historique des tests
    function displayTestHistory() {
        try {
            // Trier les résultats par date (du plus récent au plus ancien)
            const sortedResults = [...userResults].sort((a, b) => {
                return new Date(b.dateCompleted) - new Date(a.dateCompleted);
            });
            
            // Créer le contenu HTML
            let html = '<div class="test-history-list">';
            
            sortedResults.forEach(result => {
                // Formater la date en utilisant l'helper
                const date = new Date(result.dateCompleted);
                const formattedDate = Helpers.formatDate(date);
                
                // Déterminer la classe de couleur
                let colorClass = '';
                if (result.globalScore < 40) {
                    colorClass = 'score-low';
                } else if (result.globalScore < 70) {
                    colorClass = 'score-medium';
                } else {
                    colorClass = 'score-high';
                }
                
                // Créer l'élément d'historique
                html += `
                    <div class="history-item">
                        <div class="history-info">
                            <h4>${result.testName}</h4>
                            <span class="history-date">${formattedDate}</span>
                        </div>
                        <div class="history-score ${colorClass}">
                            <span>${result.globalScore}</span>
                        </div>
                    </div>
                `;
            });
            
            html += '</div>';
            
            // Mettre à jour le conteneur
            document.getElementById('test-history-container').innerHTML = html;
        } catch (error) {
            console.error('Erreur lors de l\'affichage de l\'historique des tests:', error);
            document.getElementById('test-history-container').innerHTML = `
                <p class="error-message">Une erreur est survenue lors du chargement de l'historique des tests.</p>
            `;
        }
    }
    
    // Fonction utilitaire pour regrouper les tests par catégorie
    function groupTestsByCategory() {
        const categoryTests = {};
        
        // Parcourir tous les résultats de test
        userResults.forEach(result => {
            // Trouver la catégorie du test
            let categoryName = "Non catégorisé";
            
            // Parcourir les catégories pour trouver le test
            if (testsData && testsData.categories) {
                for (const category of testsData.categories) {
                    const test = category.tests.find(test => test.id === result.testId);
                    if (test) {
                        categoryName = category.name;
                        break;
                    }
                }
            }
            
            // Créer la catégorie si elle n'existe pas
            if (!categoryTests[categoryName]) {
                categoryTests[categoryName] = [];
            }
            
            // Ajouter le résultat à la catégorie
            categoryTests[categoryName].push(result);
        });
        
        return categoryTests;
    }
    
    // Interface publique
    return {
        loadUserData: loadUserData
    };
})();
