// bilan.js - Module simplifié pour le bilan récapitulatif
const Bilan = (function() {
    // Fonction pour charger les données utilisateur
    function loadUserData() {
        try {
            // Récupérer les résultats des tests depuis le localStorage
            const savedResults = localStorage.getItem('bilanVital_testResults');
            
            if (!savedResults) {
                displayNoDataMessage();
                return;
            }
            
            const testResults = JSON.parse(savedResults);
            
            if (!testResults || testResults.length === 0) {
                displayNoDataMessage();
                return;
            }
            
            // Afficher les données
            displayVitalScore(testResults);
            displayCategoryScores(testResults);
            displayTestHistory(testResults);
            
        } catch (error) {
            console.error('Erreur lors du chargement des données utilisateur:', error);
            displayErrorMessage();
        }
    }
    
    // Fonction pour afficher un message d'absence de données
    function displayNoDataMessage() {
        // VitalScore
        const scoreElement = document.getElementById('vital-score-value');
        if (scoreElement) {
            scoreElement.textContent = '--';
        }
        
        // Scores par catégorie
        const categoryContainer = document.getElementById('category-scores-container');
        if (categoryContainer) {
            categoryContainer.innerHTML = `
                <p class="no-data">Complétez au moins un test pour voir vos scores par catégorie.</p>
            `;
        }
        
        // Historique des tests
        const historyContainer = document.getElementById('test-history-container');
        if (historyContainer) {
            historyContainer.innerHTML = `
                <p class="no-data">Aucun test complété pour le moment.</p>
            `;
        }
    }
    
    // Fonction pour afficher un message d'erreur
    function displayErrorMessage() {
        // VitalScore
        const scoreElement = document.getElementById('vital-score-value');
        if (scoreElement) {
            scoreElement.textContent = '--';
        }
        
        // Scores par catégorie
        const categoryContainer = document.getElementById('category-scores-container');
        if (categoryContainer) {
            categoryContainer.innerHTML = `
                <p class="error-message">Une erreur est survenue lors du chargement des données.</p>
            `;
        }
        
        // Historique des tests
        const historyContainer = document.getElementById('test-history-container');
        if (historyContainer) {
            historyContainer.innerHTML = `
                <p class="error-message">Une erreur est survenue lors du chargement de l'historique.</p>
            `;
        }
    }
    
    // Fonction pour afficher le VitalScore
    function displayVitalScore(testResults) {
        try {
            // Calculer le score moyen - compatible avec les deux formats
            let totalScore = 0;
            let validResults = 0;
            
            testResults.forEach(result => {
                let score = 0;
                
                // Nouveau format (tests physiques)
                if (result.score && typeof result.score.percentage !== 'undefined') {
                    score = result.score.percentage;
                }
                // Ancien format
                else if (result.globalScore) {
                    score = result.globalScore;
                }
                
                if (score > 0) {
                    totalScore += score;
                    validResults++;
                }
            });
            
            const averageScore = validResults > 0 ? Math.round(totalScore / validResults) : 0;
            
            // Afficher le score
            const scoreElement = document.getElementById('vital-score-value');
            if (scoreElement) {
                scoreElement.textContent = averageScore;
                
                // Ajouter une classe en fonction du score
                const scoreContainer = scoreElement.parentElement;
                if (scoreContainer) {
                    // Supprimer les classes précédentes
                    scoreContainer.classList.remove('score-low', 'score-medium', 'score-high');
                    
                    // Ajouter la nouvelle classe
                    if (averageScore < 40) {
                        scoreContainer.classList.add('score-low');
                    } else if (averageScore < 70) {
                        scoreContainer.classList.add('score-medium');
                    } else {
                        scoreContainer.classList.add('score-high');
                    }
                }
            }
        } catch (error) {
            console.error('Erreur lors de l\'affichage du VitalScore:', error);
            const scoreElement = document.getElementById('vital-score-value');
            if (scoreElement) {
                scoreElement.textContent = '--';
            }
        }
    }
    
    // Fonction pour afficher les scores par catégorie
    function displayCategoryScores(testResults) {
        try {
            // Regrouper les résultats par catégorie
            const categoryTests = groupTestsByCategory(testResults);
            
            const container = document.getElementById('category-scores-container');
            if (!container) return;
            
            // Vérifier s'il y a des résultats
            if (Object.keys(categoryTests).length === 0) {
                container.innerHTML = `
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
                let validTests = 0;
                
                tests.forEach(test => {
                    let score = 0;
                    
                    // Nouveau format
                    if (test.score && typeof test.score.percentage !== 'undefined') {
                        score = test.score.percentage;
                    }
                    // Ancien format
                    else if (test.globalScore) {
                        score = test.globalScore;
                    }
                    
                    if (score > 0) {
                        totalScore += score;
                        validTests++;
                    }
                });
                
                const averageScore = validTests > 0 ? Math.round(totalScore / validTests) : 0;
                
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
            container.innerHTML = html;
        } catch (error) {
            console.error('Erreur lors de l\'affichage des scores par catégorie:', error);
            const container = document.getElementById('category-scores-container');
            if (container) {
                container.innerHTML = `
                    <p class="error-message">Une erreur est survenue lors du chargement des scores par catégorie.</p>
                `;
            }
        }
    }
    
    // Fonction pour afficher l'historique des tests
    function displayTestHistory(testResults) {
        try {
            // Trier les résultats par date (du plus récent au plus ancien)
            const sortedResults = [...testResults].sort((a, b) => {
                const dateA = new Date(a.dateCompleted || a.date || 0);
                const dateB = new Date(b.dateCompleted || b.date || 0);
                return dateB - dateA;
            });
            
            const container = document.getElementById('test-history-container');
            if (!container) return;
            
            // Créer le contenu HTML
            let html = '<div class="test-history-list">';
            
            sortedResults.forEach(result => {
                // Formater la date - compatible avec les deux formats
                const dateValue = result.dateCompleted || result.date || new Date().toISOString();
                const date = new Date(dateValue);
                const formattedDate = `${date.toLocaleDateString('fr-FR')} ${date.toLocaleTimeString('fr-FR')}`;
                
                // Obtenir le score - compatible avec les deux formats
                let score = 0;
                if (result.score && typeof result.score.percentage !== 'undefined') {
                    score = result.score.percentage;
                } else if (result.globalScore) {
                    score = result.globalScore;
                }
                
                // Obtenir le nom du test
                const testName = result.testName || findTestName(result.testId) || 'Test inconnu';
                
                // Déterminer la classe de couleur
                let colorClass = '';
                if (score < 40) {
                    colorClass = 'score-low';
                } else if (score < 70) {
                    colorClass = 'score-medium';
                } else {
                    colorClass = 'score-high';
                }
                
                // Créer l'élément d'historique
                html += `
                    <div class="history-item">
                        <div class="history-info">
                            <h4>${testName}</h4>
                            <span class="history-date">${formattedDate}</span>
                        </div>
                        <div class="history-score ${colorClass}">
                            <span>${score}%</span>
                        </div>
                    </div>
                `;
            });
            
            html += '</div>';
            
            // Mettre à jour le conteneur
            container.innerHTML = html;
        } catch (error) {
            console.error('Erreur lors de l\'affichage de l\'historique des tests:', error);
            const container = document.getElementById('test-history-container');
            if (container) {
                container.innerHTML = `
                    <p class="error-message">Une erreur est survenue lors du chargement de l'historique des tests.</p>
                `;
            }
        }
    }
    
    // Fonction utilitaire pour trouver le nom d'un test par son ID
    function findTestName(testId) {
        if (!testId || !testsData || !testsData.categories) return null;
        
        for (const category of testsData.categories) {
            for (const test of category.tests) {
                if (test.id === testId) {
                    return test.name;
                }
            }
        }
        
        return null;
    }
    
    // Fonction utilitaire pour regrouper les tests par catégorie
    function groupTestsByCategory(testResults) {
        const categoryTests = {};
        
        // Parcourir tous les résultats de test
        testResults.forEach(result => {
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
        loadUserData
    };
})();

// Export global pour compatibilité
window.Bilan = Bilan;
