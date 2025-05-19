// tests.js - Module simplifié pour la passation des tests
const Tests = (function() {
    // Variables privées
    let currentTest = null;
    let currentQuestionIndex = 0;
    let userAnswers = [];
    
    // Fonction pour démarrer un test
    function startTest(testId) {
        try {
            // Trouver le test dans les données
            currentTest = findTestById(testId);
            
            if (!currentTest) {
                throw new Error(`Test avec l'ID ${testId} non trouvé`);
            }
            
            // Réinitialiser les variables
            currentQuestionIndex = 0;
            userAnswers = Array(currentTest.questions.length).fill(null);
            
            // Afficher la première question
            displayCurrentQuestion();
            
            // Afficher la section de test
            showSection('test-content');
            
            // Mettre à jour le titre du test
            document.getElementById('test-title').textContent = currentTest.name;
            
            // Mettre à jour le nombre total de questions
            document.getElementById('total-questions').textContent = currentTest.questions.length;
        } catch (error) {
            console.error('Erreur lors du démarrage du test:', error);
            alert(`Impossible de démarrer ce test: ${error.message}`);
        }
    }
    
    // Fonction pour trouver un test par son ID
    function findTestById(testId) {
        for (const category of testsData.categories) {
            const test = category.tests.find(test => test.id === testId);
            if (test) {
                return test;
            }
        }
        return null;
    }
    
    // Fonction pour afficher la question actuelle
    function displayCurrentQuestion() {
        try {
            if (!currentTest) {
                throw new Error('Aucun test en cours');
            }
            
            const questionContainer = document.getElementById('question-container');
            const currentQuestion = currentTest.questions[currentQuestionIndex];
            
            // Mettre à jour l'indicateur de progression
            document.getElementById('current-question').textContent = currentQuestionIndex + 1;
            
            // Mettre à jour la barre de progression
            const progressPercentage = ((currentQuestionIndex + 1) / currentTest.questions.length) * 100;
            document.querySelector('.progress-fill').style.width = `${progressPercentage}%`;
            
            // Préparer le contenu HTML de la question
            let questionHtml = '';
            
            questionHtml += `<div class="question">
                <h3>${currentQuestion.text}</h3>
            `;
            
            // Générer les options de réponse en fonction du type de question
            switch (currentQuestion.type) {
                case 'multiple-choice':
                    questionHtml += `<div class="options multiple-choice">`;
                    currentQuestion.options.forEach((option, index) => {
                        const isChecked = userAnswers[currentQuestionIndex] === index ? 'checked' : '';
                        questionHtml += `
                            <div class="option">
                                <input type="radio" id="option-${index}" name="question-${currentQuestionIndex}" value="${index}" ${isChecked}>
                                <label for="option-${index}">${option.text}</label>
                            </div>
                        `;
                    });
                    questionHtml += `</div>`;
                    break;
                    
                case 'likert':
                    questionHtml += `<div class="options likert-scale">`;
                    for (let i = 1; i <= 5; i++) {
                        const isChecked = userAnswers[currentQuestionIndex] === i ? 'checked' : '';
                        questionHtml += `
                            <div class="option">
                                <input type="radio" id="likert-${i}" name="question-${currentQuestionIndex}" value="${i}" ${isChecked}>
                                <label for="likert-${i}">${i}</label>
                            </div>
                        `;
                    }
                    questionHtml += `
                        <div class="likert-labels">
                            <span>Pas du tout d'accord</span>
                            <span>Tout à fait d'accord</span>
                        </div>
                    </div>`;
                    break;
                    
                case 'slider':
                    const sliderValue = userAnswers[currentQuestionIndex] !== null ? userAnswers[currentQuestionIndex] : 50;
                    questionHtml += `
                        <div class="options slider">
                            <input type="range" id="slider" name="question-${currentQuestionIndex}" min="0" max="100" value="${sliderValue}">
                            <div class="slider-labels">
                                <span>${currentQuestion.minLabel || 'Minimum'}</span>
                                <span>${currentQuestion.maxLabel || 'Maximum'}</span>
                            </div>
                        </div>
                    `;
                    break;
                    
                default:
                    questionHtml += `<p class="error">Type de question non pris en charge: ${currentQuestion.type}</p>`;
            }
            
            questionHtml += `</div>`;
            
            // Mettre à jour le conteneur
            questionContainer.innerHTML = questionHtml;
            
            // Ajouter les écouteurs d'événements pour les réponses
            addAnswerEventListeners();
            
            // Gérer l'état des boutons de navigation
            updateNavigationButtons();
        } catch (error) {
            console.error('Erreur lors de l\'affichage de la question:', error);
            document.getElementById('question-container').innerHTML = `
                <div class="error-message">
                    <p>Impossible d'afficher cette question. Erreur: ${error.message}</p>
                </div>
            `;
        }
    }
    
    // Fonction pour ajouter les écouteurs d'événements aux éléments de réponse
    function addAnswerEventListeners() {
        try {
            const currentQuestion = currentTest.questions[currentQuestionIndex];
            
            switch (currentQuestion.type) {
                case 'multiple-choice':
                case 'likert':
                    // Pour les boutons radio
                    document.querySelectorAll(`input[name="question-${currentQuestionIndex}"]`).forEach(radio => {
                        radio.addEventListener('change', function() {
                            userAnswers[currentQuestionIndex] = parseInt(this.value);
                            updateNavigationButtons();
                        });
                    });
                    break;
                    
                case 'slider':
                    // Pour les sliders
                    const slider = document.querySelector(`input[name="question-${currentQuestionIndex}"]`);
                    slider.addEventListener('input', function() {
                        userAnswers[currentQuestionIndex] = parseInt(this.value);
                    });
                    break;
            }
        } catch (error) {
            console.error('Erreur lors de l\'ajout des écouteurs d\'événements:', error);
        }
    }
    
    // Fonction pour mettre à jour l'état des boutons de navigation
    function updateNavigationButtons() {
        const prevButton = document.getElementById('prev-question');
        const nextButton = document.getElementById('next-question');
        
        // Désactiver le bouton précédent sur la première question
        prevButton.disabled = currentQuestionIndex === 0;
        
        // Changer le texte du bouton suivant sur la dernière question
        if (currentQuestionIndex === currentTest.questions.length - 1) {
            nextButton.textContent = 'Terminer';
        } else {
            nextButton.textContent = 'Suivant';
        }
    }
    
    // Fonction pour passer à la question suivante
    function nextQuestion() {
        try {
            // Vérifier si l'utilisateur a répondu à la question actuelle
            if (userAnswers[currentQuestionIndex] === null) {
                alert('Veuillez répondre à la question avant de continuer.');
                return;
            }
            
            // Vérifier si c'est la dernière question
            if (currentQuestionIndex === currentTest.questions.length - 1) {
                // Terminer le test
                finishTest();
                return;
            }
            
            // Passer à la question suivante
            currentQuestionIndex++;
            displayCurrentQuestion();
        } catch (error) {
            console.error('Erreur lors du passage à la question suivante:', error);
        }
    }
    
    // Fonction pour revenir à la question précédente
    function previousQuestion() {
        try {
            if (currentQuestionIndex > 0) {
                currentQuestionIndex--;
                displayCurrentQuestion();
            }
        } catch (error) {
            console.error('Erreur lors du retour à la question précédente:', error);
        }
    }
    
    // Fonction pour terminer le test
    function finishTest() {
        try {
            // Calculer les scores
            const scores = calculateScores();
            
            // Sauvegarder les résultats
            saveTestResults(scores);
            
            // Afficher les résultats
            showTestResults(scores);
        } catch (error) {
            console.error('Erreur lors de la finalisation du test:', error);
            alert(`Une erreur est survenue lors de la finalisation du test: ${error.message}`);
        }
    }
    
    // Fonction pour calculer les scores du test
    function calculateScores() {
        try {
            // Calcul simplifié pour la démonstration
            let totalScore = 0;
            let maxPossibleScore = 0;
            
            // Calculer le score en fonction du type de question
            currentTest.questions.forEach((question, index) => {
                const answer = userAnswers[index];
                
                switch (question.type) {
                    case 'multiple-choice':
                        // Pour les QCM, utiliser la valeur de score de l'option sélectionnée
                        const selectedOption = question.options[answer];
                        if (selectedOption && typeof selectedOption.score === 'number') {
                            totalScore += selectedOption.score;
                            maxPossibleScore += question.maxScore || 5;
                        }
                        break;
                        
                    case 'likert':
                        // Pour les échelles de Likert, utiliser directement la valeur
                        totalScore += answer;
                        maxPossibleScore += 5; // Échelle de 1 à 5
                        break;
                        
                    case 'slider':
                        // Pour les sliders, normaliser entre 0 et 5
                        totalScore += (answer / 100) * 5;
                        maxPossibleScore += 5;
                        break;
                }
            });
            
            // Normaliser le score global sur 100
            const normalizedScore = Math.round((totalScore / maxPossibleScore) * 100);
            
            return {
                testId: currentTest.id,
                testName: currentTest.name,
                dateCompleted: new Date(),
                answers: [...userAnswers],
                globalScore: normalizedScore,
                maxScore: 100
            };
        } catch (error) {
            console.error('Erreur lors du calcul des scores:', error);
            throw error;
        }
    }
    
    // Fonction pour sauvegarder les résultats du test
    function saveTestResults(scores) {
        try {
            // Récupérer les résultats existants
            let testResults = [];
            
            try {
                const savedResults = localStorage.getItem('bilanVital_testResults');
                if (savedResults) {
                    testResults = JSON.parse(savedResults);
                }
            } catch (e) {
                console.warn('Erreur lors de la récupération des résultats précédents:', e);
            }
            
            // Ajouter le nouveau résultat
            testResults.push(scores);
            
            // Sauvegarder dans le localStorage
            localStorage.setItem('bilanVital_testResults', JSON.stringify(testResults));
            
            console.log('Résultats du test sauvegardés avec succès');
        } catch (error) {
            console.error('Erreur lors de la sauvegarde des résultats:', error);
            throw error;
        }
    }
    
    // Fonction pour afficher les résultats du test
    function showTestResults(scores) {
        try {
            // Créer un élément modal pour afficher les résultats
            const modal = document.createElement('div');
            modal.className = 'results-modal';
            
            // Contenu du modal
            modal.innerHTML = `
                <div class="results-content">
                    <h2>Résultats du test: ${scores.testName}</h2>
                    
                    <div class="result-score">
                        <div class="score-circle large">
                            <span>${scores.globalScore}</span>
                        </div>
                        <p>Votre score global</p>
                    </div>
                    
                    <div class="result-interpretation">
                        <h3>Interprétation</h3>
                        <p>${getScoreInterpretation(scores.globalScore)}</p>
                    </div>
                    
                    <div class="result-actions">
                        <button id="view-bilan" class="btn-primary">Voir mon bilan complet</button>
                        <button id="return-home" class="btn-secondary">Retour à l'accueil</button>
                    </div>
                </div>
            `;
            
            // Ajouter le modal au body
            document.body.appendChild(modal);
            
            // Ajouter les écouteurs d'événements
            document.getElementById('view-bilan').addEventListener('click', function() {
                modal.remove();
                // Reload le bilan avant de l'afficher
                if (typeof Bilan !== 'undefined' && typeof Bilan.loadUserData === 'function') {
                    Bilan.loadUserData();
                }
                showSection('bilan');
            });
            
            document.getElementById('return-home').addEventListener('click', function() {
                modal.remove();
                showSection('welcome');
            });
        } catch (error) {
            console.error('Erreur lors de l\'affichage des résultats:', error);
            alert(`Une erreur est survenue lors de l'affichage des résultats: ${error.message}`);
            showSection('welcome');
        }
    }
    
    // Fonction utilitaire pour obtenir l'interprétation d'un score
    function getScoreInterpretation(score) {
        if (score >= 90) {
            return "Excellent ! Vos résultats sont très encourageants.";
        } else if (score >= 75) {
            return "Très bien ! Vous êtes sur la bonne voie.";
        } else if (score >= 60) {
            return "Bien. Quelques améliorations sont possibles.";
        } else if (score >= 40) {
            return "Moyen. Des efforts ciblés pourraient améliorer significativement vos résultats.";
        } else {
            return "Ce domaine nécessite une attention particulière. Suivez nos recommandations pour progresser.";
        }
    }
    
    // Interface publique
    return {
        startTest,
        nextQuestion,
        previousQuestion
    };
})();
