/**
 * Module de gestion des tests pour l'application Bilan Vital
 * Gère l'affichage, la passation et l'évaluation des tests
 */

const testsModule = (function() {
    // Dépendances
    const testsData = window.testsData || {}; // Défini dans testsData.js
    const userData = window.userData || {}; // Défini dans userData.js
    const helpers = window.helpers || {}; // Défini dans helpers.js
    const charts = window.charts || {}; // Défini dans charts.js
    
    // Variables de l'état du test en cours
    let currentTest = null;
    let currentQuestion = 0;
    let testStartTime = null;
    let testAnswers = [];
    let testTimerInterval = null;
    
    /**
     * Initialise le module de tests
     * Doit être appelé après le chargement de la page
     */
    function initialize() {
        // Écouter les événements de navigation pour nettoyer l'état si nécessaire
        document.addEventListener('navigation:change', handleNavigationChange);
    }
    
    /**
     * Gère les changements de navigation pour réinitialiser l'état du test si nécessaire
     * @param {Event} event - Événement de navigation
     */
    function handleNavigationChange(event) {
        // Nettoyer le timer et l'état du test en cours si on quitte un test
        if (currentTest && (!event.detail || !event.detail.path.includes('test/'))) {
            cleanupTestState();
        }
    }
    
    /**
     * Nettoie l'état du test en cours
     */
    function cleanupTestState() {
        clearInterval(testTimerInterval);
        testTimerInterval = null;
        currentTest = null;
        currentQuestion = 0;
        testStartTime = null;
        testAnswers = [];
    }
    
    /**
     * Charge et affiche une catégorie de tests
     * @param {string} categoryId - ID de la catégorie à afficher
     * @returns {boolean} Succès du chargement
     */
    function loadCategory(categoryId) {
        try {
            // Récupérer les informations de la catégorie
            const category = testsData.getCategoryById(categoryId);
            if (!category) {
                console.error(`Catégorie non trouvée: ${categoryId}`);
                return false;
            }
            
            // Récupérer les tests de cette catégorie
            const tests = testsData.getTestsByCategoryId(categoryId);
            
            // Construire le HTML pour l'affichage
            const categoryContainer = document.getElementById('categoryContainer');
            if (!categoryContainer) {
                console.error('Conteneur de catégorie non trouvé');
                return false;
            }
            
            // Créer l'en-tête de la catégorie
            const categoryHeader = document.createElement('div');
            categoryHeader.className = 'categoryHeader';
            categoryHeader.innerHTML = `
                <h1>${category.name}</h1>
                <p class="categoryDescription">${category.description}</p>
            `;
            
            // Créer la liste des tests
            const testsList = document.createElement('div');
            testsList.className = 'testsList';
            
            // Ajouter chaque test à la liste
            tests.forEach(test => {
                const testCard = createTestCard(test);
                testsList.appendChild(testCard);
            });
            
            // Assembler tout dans le conteneur
            categoryContainer.innerHTML = '';
            categoryContainer.appendChild(categoryHeader);
            categoryContainer.appendChild(testsList);
            
            return true;
        } catch (error) {
            console.error('Erreur lors du chargement de la catégorie:', error);
            return false;
        }
    }
    
    /**
     * Crée un élément HTML pour représenter un test
     * @param {Object} test - Informations sur le test
     * @returns {HTMLElement} Élément représentant le test
     */
    function createTestCard(test) {
        const testCard = document.createElement('div');
        testCard.className = 'testCard';
        testCard.setAttribute('data-test-id', test.id);
        
        // Ajouter une classe spécifique si le test est un test physique
        if (test.isPhysical) {
            testCard.classList.add('physicalTest');
        }
        
        // Contenu de la carte
        testCard.innerHTML = `
            <h3 class="testTitle">${test.name}</h3>
            <p class="testDescription">${test.description}</p>
            <div class="testMetadata">
                <span class="testDuration"><i class="icon-clock"></i> ${test.duration}</span>
                <span class="testDifficulty">
                    ${createDifficultyStars(test.difficulty)}
                </span>
            </div>
            <button class="btn startTestBtn">Commencer le test</button>
        `;
        
        // Ajouter l'écouteur d'événement pour démarrer le test
        const startButton = testCard.querySelector('.startTestBtn');
        startButton.addEventListener('click', () => {
            startTest(test.id);
        });
        
        return testCard;
    }
    
    /**
     * Crée une représentation visuelle de la difficulté
     * @param {number} difficulty - Niveau de difficulté (1-3)
     * @returns {string} HTML représentant la difficulté
     */
    function createDifficultyStars(difficulty) {
        const MAX_DIFFICULTY = 3;
        let starsHTML = '';
        
        for (let i = 1; i <= MAX_DIFFICULTY; i++) {
            if (i <= difficulty) {
                starsHTML += '<i class="icon-star-filled"></i>';
            } else {
                starsHTML += '<i class="icon-star-empty"></i>';
            }
        }
        
        return starsHTML;
    }
    
    /**
     * Démarre un test
     * @param {string} testId - ID du test à démarrer
     * @returns {boolean} Succès du démarrage
     */
    function startTest(testId) {
        try {
            // Récupérer les informations du test
            const test = testsData.getTestById(testId);
            if (!test) {
                console.error(`Test non trouvé: ${testId}`);
                return false;
            }
            
            // Initialiser l'état du test
            currentTest = test;
            currentQuestion = 0;
            testStartTime = new Date();
            testAnswers = Array(test.questions.length).fill(null);
            
            // Afficher la première question
            displayQuestion(currentQuestion);
            
            return true;
        } catch (error) {
            console.error('Erreur lors du démarrage du test:', error);
            return false;
        }
    }
    
    /**
     * Affiche une question du test
     * @param {number} questionIndex - Index de la question à afficher
     */
    function displayQuestion(questionIndex) {
        try {
            if (!currentTest || !currentTest.questions || questionIndex >= currentTest.questions.length) {
                console.error('Question invalide ou test non initialisé');
                return;
            }
            
            const question = currentTest.questions[questionIndex];
            const testContainer = document.getElementById('testContainer');
            
            if (!testContainer) {
                console.error('Conteneur de test non trouvé');
                return;
            }
            
            // Déterminer si c'est la première, une intermédiaire ou la dernière question
            const isFirstQuestion = questionIndex === 0;
            const isLastQuestion = questionIndex === currentTest.questions.length - 1;
            
            // Créer la structure de la question
            const questionContainer = document.createElement('div');
            questionContainer.className = 'questionContainer';
            questionContainer.setAttribute('data-question-index', questionIndex);
            
            // Ajouter la barre de progression
            const progressPercentage = ((questionIndex + 1) / currentTest.questions.length) * 100;
            questionContainer.innerHTML = `
                <div class="testHeader">
                    <h2>${currentTest.name}</h2>
                    <div class="progressBarContainer">
                        <div class="progressBar" style="width: ${progressPercentage}%"></div>
                    </div>
                    <div class="questionCount">Question ${questionIndex + 1}/${currentTest.questions.length}</div>
                </div>
                <div class="questionContent">
                    <p class="questionText">${question.text}</p>
                    <div class="questionInput" id="questionInput-${questionIndex}"></div>
                </div>
                <div class="questionControls">
                    ${!isFirstQuestion ? '<button class="btn btnSecondary prevQuestionBtn">Précédent</button>' : ''}
                    <button class="btn btnPrimary ${isLastQuestion ? 'finishTestBtn' : 'nextQuestionBtn'}">${isLastQuestion ? 'Terminer' : 'Suivant'}</button>
                </div>
            `;
            
            // Remplacer le contenu actuel par la nouvelle question
            testContainer.innerHTML = '';
            testContainer.appendChild(questionContainer);
            
            // Ajouter les entrées spécifiques au type de question
            const inputContainer = document.getElementById(`questionInput-${questionIndex}`);
            addQuestionInputs(inputContainer, question, questionIndex);
            
            // Remplir avec la réponse existante si disponible
            if (testAnswers[questionIndex] !== null) {
                setQuestionValue(inputContainer, question, testAnswers[questionIndex]);
            }
            
            // Ajouter les écouteurs d'événements pour les boutons
            const prevButton = testContainer.querySelector('.prevQuestionBtn');
            if (prevButton) {
                prevButton.addEventListener('click', () => {
                    saveCurrentAnswer();
                    displayQuestion(questionIndex - 1);
                });
            }
            
            const nextButton = testContainer.querySelector('.nextQuestionBtn');
            if (nextButton) {
                nextButton.addEventListener('click', () => {
                    if (saveCurrentAnswer()) {
                        displayQuestion(questionIndex + 1);
                    }
                });
            }
            
            const finishButton = testContainer.querySelector('.finishTestBtn');
            if (finishButton) {
                finishButton.addEventListener('click', () => {
                    if (saveCurrentAnswer()) {
                        finishTest();
                    }
                });
            }
            
            // Si c'est un test physique avec chronomètre, initialiser le timer
            if (currentTest.isPhysical && currentTest.timerDuration && isFirstQuestion) {
                initializeTestTimer();
            }
        } catch (error) {
            console.error('Erreur lors de l\'affichage de la question:', error);
        }
    }
    
    /**
     * Ajoute les éléments d'interface pour la saisie de réponse selon le type de question
     * @param {HTMLElement} container - Conteneur où ajouter les éléments
     * @param {Object} question - Données de la question
     * @param {number} index - Index de la question
     */
    function addQuestionInputs(container, question, index) {
        if (!container) return;
        
        switch (question.type) {
            case 'radio':
                // Boutons radio
                const radioGroup = document.createElement('div');
                radioGroup.className = 'radioGroup';
                
                question.options.forEach((option, optIndex) => {
                    const radioItem = document.createElement('div');
                    radioItem.className = 'radioItem';
                    radioItem.innerHTML = `
                        <input type="radio" id="option-${index}-${optIndex}" name="question-${index}" value="${option.value}">
                        <label for="option-${index}-${optIndex}">${option.text}</label>
                    `;
                    radioGroup.appendChild(radioItem);
                });
                
                container.appendChild(radioGroup);
                break;
                
            case 'checkbox':
                // Cases à cocher
                const checkboxGroup = document.createElement('div');
                checkboxGroup.className = 'checkboxGroup';
                
                question.options.forEach((option, optIndex) => {
                    const checkboxItem = document.createElement('div');
                    checkboxItem.className = 'checkboxItem';
                    checkboxItem.innerHTML = `
                        <input type="checkbox" id="option-${index}-${optIndex}" name="question-${index}" value="${option.value}">
                        <label for="option-${index}-${optIndex}">${option.text}</label>
                    `;
                    checkboxGroup.appendChild(checkboxItem);
                });
                
                container.appendChild(checkboxGroup);
                break;
                
            case 'slider':
                // Slider
                const sliderContainer = document.createElement('div');
                sliderContainer.className = 'sliderContainer';
                sliderContainer.innerHTML = `
                    <input type="range" id="slider-${index}" min="${question.min || 0}" max="${question.max || 10}" step="${question.step || 1}" value="${question.defaultValue || ((question.min || 0) + (question.max || 10)) / 2}">
                    <div class="sliderLabels">
                        <span class="sliderMinLabel">${question.minLabel || question.min || 0}</span>
                        <span class="sliderValue" id="sliderValue-${index}">${question.defaultValue || ((question.min || 0) + (question.max || 10)) / 2}</span>
                        <span class="sliderMaxLabel">${question.maxLabel || question.max || 10}</span>
                    </div>
                `;
                
                container.appendChild(sliderContainer);
                
                // Ajouter l'écouteur pour mettre à jour la valeur affichée
                setTimeout(() => {
                    const slider = document.getElementById(`slider-${index}`);
                    const sliderValue = document.getElementById(`sliderValue-${index}`);
                    
                    if (slider && sliderValue) {
                        slider.addEventListener('input', () => {
                            sliderValue.textContent = slider.value;
                        });
                    }
                }, 0);
                break;
                
            case 'number':
                // Entrée numérique
                const numberContainer = document.createElement('div');
                numberContainer.className = 'numberContainer';
                numberContainer.innerHTML = `
                    <input type="number" id="number-${index}" min="${question.min || 0}" max="${question.max || 100}" step="${question.step || 1}" value="${question.defaultValue || ''}">
                    ${question.unit ? `<span class="numberUnit">${question.unit}</span>` : ''}
                `;
                
                container.appendChild(numberContainer);
                break;
                
            case 'text':
                // Zone de texte
                const textContainer = document.createElement('div');
                textContainer.className = 'textContainer';
                textContainer.innerHTML = `
                    <textarea id="text-${index}" rows="${question.rows || 4}" placeholder="${question.placeholder || 'Votre réponse...'}"></textarea>
                `;
                
                container.appendChild(textContainer);
                break;
                
            case 'timer':
                // Affichage du chronomètre
                const timerContainer = document.createElement('div');
                timerContainer.className = 'timerContainer';
                timerContainer.innerHTML = `
                    <div class="timer" id="testTimer">
                        <span class="timerValue">00:00</span>
                        <button class="btn btnPrimary timerBtn" id="timerControlBtn">Démarrer</button>
                        <button class="btn btnSecondary timerBtn" id="timerResetBtn">Réinitialiser</button>
                    </div>
                `;
                
                container.appendChild(timerContainer);
                break;
                
            default:
                console.error(`Type de question non pris en charge: ${question.type}`);
                break;
        }
    }
    
    /**
     * Initialise le chronomètre pour les tests physiques
     */
    function initializeTestTimer() {
        if (!currentTest.timerDuration) return;
        
        const timerContainer = document.querySelector('.timerContainer');
        if (!timerContainer) return;
        
        const timerValue = timerContainer.querySelector('.timerValue');
        const startButton = document.getElementById('timerControlBtn');
        const resetButton = document.getElementById('timerResetBtn');
        
        let timerRunning = false;
        let timerSeconds = 0;
        
        // Fonction pour mettre à jour l'affichage du chronomètre
        function updateTimerDisplay() {
            const minutes = Math.floor(timerSeconds / 60);
            const seconds = timerSeconds % 60;
            timerValue.textContent = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
        }
        
        // Fonction pour démarrer/pauser le chronomètre
        function toggleTimer() {
            if (timerRunning) {
                clearInterval(testTimerInterval);
                startButton.textContent = 'Reprendre';
            } else {
                testTimerInterval = setInterval(() => {
                    timerSeconds++;
                    updateTimerDisplay();
                    
                    // Arrêter automatiquement après la durée spécifiée
                    if (timerSeconds >= currentTest.timerDuration) {
                        clearInterval(testTimerInterval);
                        timerRunning = false;
                        startButton.textContent = 'Terminé';
                        startButton.disabled = true;
                    }
                }, 1000);
                startButton.textContent = 'Pause';
            }
            
            timerRunning = !timerRunning;
        }
        
        // Fonction pour réinitialiser le chronomètre
        function resetTimer() {
            clearInterval(testTimerInterval);
            timerSeconds = 0;
            updateTimerDisplay();
            timerRunning = false;
            startButton.textContent = 'Démarrer';
            startButton.disabled = false;
        }
        
        // Ajouter les écouteurs d'événements
        startButton.addEventListener('click', toggleTimer);
        resetButton.addEventListener('click', resetTimer);
        
        // Initialiser l'affichage
        updateTimerDisplay();
    }
    
    /**
     * Sauvegarde la réponse à la question actuelle
     * @returns {boolean} Valide si la réponse est complète
     */
    function saveCurrentAnswer() {
        try {
            if (!currentTest) return false;
            
            const questionIndex = currentQuestion;
            const question = currentTest.questions[questionIndex];
            const inputContainer = document.getElementById(`questionInput-${questionIndex}`);
            
            if (!question || !inputContainer) return false;
            
            // Récupérer la valeur en fonction du type de question
            let value;
            
            switch (question.type) {
                case 'radio':
                    const selectedRadio = inputContainer.querySelector('input[type="radio"]:checked');
                    value = selectedRadio ? selectedRadio.value : null;
                    break;
                    
                case 'checkbox':
                    const selectedCheckboxes = inputContainer.querySelectorAll('input[type="checkbox"]:checked');
                    value = Array.from(selectedCheckboxes).map(checkbox => checkbox.value);
                    break;
                    
                case 'slider':
                    const slider = document.getElementById(`slider-${questionIndex}`);
                    value = slider ? parseFloat(slider.value) : null;
                    break;
                    
                case 'number':
                    const numberInput = document.getElementById(`number-${questionIndex}`);
                    value = numberInput && numberInput.value !== '' ? parseFloat(numberInput.value) : null;
                    break;
                    
                case 'text':
                    const textInput = document.getElementById(`text-${questionIndex}`);
                    value = textInput ? textInput.value : null;
                    break;
                    
                case 'timer':
                    // Pour le timer, on prend juste le temps écoulé
                    const timerValue = document.querySelector('.timerValue');
                    if (timerValue) {
                        const [minutes, seconds] = timerValue.textContent.split(':').map(Number);
                        value = minutes * 60 + seconds;
                    } else {
                        value = 0;
                    }
                    break;
                    
                default:
                    console.error(`Type de question non pris en charge: ${question.type}`);
                    value = null;
                    break;
            }
            
            // Valider la réponse
            if (value === null) {
                // Afficher un message d'erreur
                const errorMessage = document.createElement('p');
                errorMessage.className = 'errorMessage';
                errorMessage.textContent = 'Veuillez répondre à cette question avant de continuer';
                
                // Supprimer les erreurs existantes avant d'en ajouter une nouvelle
                const existingErrors = inputContainer.querySelectorAll('.errorMessage');
                existingErrors.forEach(error => error.remove());
                
                inputContainer.appendChild(errorMessage);
                return false;
            }
            
            // Enregistrer la réponse
            testAnswers[questionIndex] = value;
            return true;
        } catch (error) {
            console.error('Erreur lors de la sauvegarde de la réponse:', error);
            return false;
        }
    }
    
    /**
     * Prérempli un champ de question avec une valeur existante
     * @param {HTMLElement} container - Conteneur de la question
     * @param {Object} question - Données de la question
     * @param {*} value - Valeur à définir
     */
    function setQuestionValue(container, question, value) {
        if (!container || value === null) return;
        
        const index = parseInt(container.id.split('-').pop());
        
        switch (question.type) {
            case 'radio':
                const radios = container.querySelectorAll('input[type="radio"]');
                radios.forEach(radio => {
                    if (radio.value == value) { // Comparaison non stricte intentionnelle
                        radio.checked = true;
                    }
                });
                break;
                
            case 'checkbox':
                const checkboxes = container.querySelectorAll('input[type="checkbox"]');
                checkboxes.forEach(checkbox => {
                    if (value.includes(checkbox.value)) {
                        checkbox.checked = true;
                    }
                });
                break;
                
            case 'slider':
                const slider = document.getElementById(`slider-${index}`);
                const sliderValue = document.getElementById(`sliderValue-${index}`);
                
                if (slider && sliderValue) {
                    slider.value = value;
                    sliderValue.textContent = value;
                }
                break;
                
            case 'number':
                const numberInput = document.getElementById(`number-${index}`);
                if (numberInput) {
                    numberInput.value = value;
                }
                break;
                
            case 'text':
                const textInput = document.getElementById(`text-${index}`);
                if (textInput) {
                    textInput.value = value;
                }
                break;
                
            default:
                break;
        }
    }
    
    /**
     * Termine le test et affiche les résultats
     */
    function finishTest() {
        try {
            if (!currentTest) return;
            
            // Calculer la durée du test
            const testEndTime = new Date();
            const testDuration = Math.floor((testEndTime - testStartTime) / 1000);
            
            // Évaluer les résultats
            evaluateTest(currentTest, testAnswers, testDuration).then(testResults => {
                // Sauvegarder les résultats
                userData.saveTestResult(currentTest.id, testResults)
                    .then(() => {
                        // Afficher les résultats
                        displayTestResults(testResults);
                    })
                    .catch(error => {
                        console.error('Erreur lors de la sauvegarde des résultats:', error);
                        // Afficher quand même les résultats en cas d'erreur
                        displayTestResults(testResults);
                    });
            }).catch(error => {
                console.error('Erreur lors de l\'évaluation du test:', error);
            });
            
            // Nettoyer l'état du test
            cleanupTestState();
        } catch (error) {
            console.error('Erreur lors de la finalisation du test:', error);
        }
    }
    
    /**
     * Évalue les réponses au test et calcule le score
     * @param {Object} test - Données du test
     * @param {Array} answers - Réponses de l'utilisateur
     * @param {number} duration - Durée du test en secondes
     * @returns {Object} Résultats calculés
     */
    async function evaluateTest(test, answers, duration) {
        let results = {
            testId: test.id,
            completedAt: new Date().toISOString(),
            durationSeconds: duration,
            answers: answers.map((answer, index) => {
                return {
                    questionId: test.questions[index].id,
                    answer: answer,
                    timeToAnswer: 0 // Nous n'avons pas mesuré le temps par question
                };
            }),
            scores: {
                global: 0,
                components: {}
            },
            interpretation: '',
            recommendationIds: []
        };
        
        try {
            // Calculer le score en fonction de la méthode d'évaluation du test
            switch (test.scoring.method) {
                case 'sum':
                    // Simple somme des valeurs
                    let total = 0;
                    
                    answers.forEach((answer, index) => {
                        if (answer !== null) {
                            // Pour les réponses à choix multiples, prendre la valeur numérique
                            if (Array.isArray(answer)) {
                                // Si la réponse est un tableau (cases à cocher), additionner les valeurs
                                answer.forEach(val => {
                                    total += parseFloat(val);
                                });
                            } else {
                                // Sinon, simplement ajouter la valeur
                                total += parseFloat(answer);
                            }
                        }
                    });
                    
                    results.scores.global = total;
                    break;
                    
                case 'table':
                    // Déterminer le score à partir d'une table (par âge/sexe)
                    const userProfile = await userData.getUserProfile();
                    const age = userProfile.demographics.age;
                    const gender = userProfile.demographics.gender;
                    
                    // Si on n'a pas de données démographiques, utiliser une valeur par défaut
                    if (!age || !gender) {
                        results.scores.global = 3; // Valeur moyenne par défaut
                        break;
                    }
                    
                    // Déterminer la tranche d'âge
                    const ageRanges = Object.keys(test.scoring.tables[gender]);
                    let userAgeRange = '';
                    
                    for (const range of ageRanges) {
                        const [min, max] = range.split('-').map(Number);
                        if (age >= min && age <= max) {
                            userAgeRange = range;
                            break;
                        }
                    }
                    
                    // Si on n'a pas trouvé de tranche d'âge correspondante, utiliser la dernière
                    if (!userAgeRange) {
                        userAgeRange = ageRanges[ageRanges.length - 1];
                    }
                    
                    // Trouver le score dans la table
                    const scoreTable = test.scoring.tables[gender][userAgeRange];
                    const rawScore = answers[0]; // Pour les tests avec tables, on prend généralement la première réponse
                    
                    for (const entry of scoreTable) {
                        if (entry.min && entry.max) {
                            if (rawScore >= entry.min && rawScore <= entry.max) {
                                results.scores.global = entry.score;
                                break;
                            }
                        } else if (entry.min) {
                            if (rawScore >= entry.min) {
                                results.scores.global = entry.score;
                                break;
                            }
                        } else if (entry.max) {
                            if (rawScore <= entry.max) {
                                results.scores.global = entry.score;
                                break;
                            }
                        }
                    }
                    break;
                
                default:
                    console.error(`Méthode d'évaluation non prise en charge: ${test.scoring.method}`);
                    break;
            }
            
            // Trouver l'interprétation en fonction du score
            for (const range of test.scoring.ranges) {
                if (results.scores.global >= range.min && results.scores.global <= range.max) {
                    results.interpretation = range.label;
                    results.interpretationDescription = range.description;
                    results.interpretationColor = range.color;
                    break;
                }
            }
            
            // Ajouter les recommandations
            const scoreRangeKey = test.scoring.method === 'sum' 
                ? `${test.scoring.ranges.find(range => results.scores.global >= range.min && results.scores.global <= range.max).min}-${test.scoring.ranges.find(range => results.scores.global >= range.min && results.scores.global <= range.max).max}`
                : `score-${results.scores.global}`;
            
            results.recommendations = test.scoring.recommendations[scoreRangeKey] || [];
            
        } catch (error) {
            console.error('Erreur lors de l\'évaluation du test:', error);
        }
        
        return results;
    }
    
    /**
     * Affiche les résultats du test
     * @param {Object} results - Résultats du test
     */
    function displayTestResults(results) {
        try {
            const testContainer = document.getElementById('testContainer');
            if (!testContainer) return;
            
            // Récupérer les informations du test
            const test = testsData.getTestById(results.testId);
            if (!test) return;
            
            // Créer le conteneur des résultats
            const resultsContainer = document.createElement('div');
            resultsContainer.className = 'testResultsContainer';
            
            // Ajouter l'animation de félicitation
            resultsContainer.innerHTML = `
                <div class="testResultsAnimation">
                    <div class="confetti"></div>
                    <h2>Test terminé!</h2>
                </div>
            `;
            
            // Créer la section du score global
            const scoreSection = document.createElement('div');
            scoreSection.className = 'testScoreSection';
            
            // Déterminer la classe de couleur en fonction du score
            let scoreColorClass = '';
            if (results.interpretationColor) {
                scoreColorClass = `color${results.interpretationColor.replace('#', '')}`;
            }
            
            scoreSection.innerHTML = `
                <div class="scoreVisualization ${scoreColorClass}">
                    <div class="scoreValue">${results.scores.global}</div>
                    <div class="scoreLabel">${results.interpretation}</div>
                </div>
                <div class="scoreExplanation">
                    <p>${results.interpretationDescription}</p>
                </div>
            `;
            
            // Créer la section des recommandations
            const recommendationsSection = document.createElement('div');
            recommendationsSection.className = 'testRecommendationsSection';
            recommendationsSection.innerHTML = `
                <h3>Recommandations personnalisées</h3>
                <ul class="recommendationsList">
                    ${results.recommendations.map(rec => `<li>${rec}</li>`).join('')}
                </ul>
                <div class="nextSteps">
                    <button class="btn btnPrimary" id="backToCategoryBtn">Retour aux tests</button>
                    <button class="btn btnSecondary" id="viewBilanBtn">Voir mon bilan complet</button>
                </div>
            `;
            
            // Assembler les sections
            resultsContainer.appendChild(scoreSection);
            resultsContainer.appendChild(recommendationsSection);
            
            // Remplacer le contenu actuel
            testContainer.innerHTML = '';
            testContainer.appendChild(resultsContainer);
            
            // Ajouter les écouteurs d'événements pour les boutons
            document.getElementById('backToCategoryBtn').addEventListener('click', () => {
                window.navigation.navigateToCategory(test.categoryId);
            });
            
            document.getElementById('viewBilanBtn').addEventListener('click', () => {
                window.navigation.navigateToFeature('bilan');
            });
            
            // Initialiser l'animation de confetti
            setTimeout(() => {
                const confettiElement = document.querySelector('.confetti');
                if (confettiElement) {
                    // Simple animation CSS, on pourrait utiliser une bibliothèque pour plus de sophistication
                    confettiElement.classList.add('active');
                }
            }, 300);
            
        } catch (error) {
            console.error('Erreur lors de l\'affichage des résultats:', error);
        }
    }
    
    // API publique
    return {
        initialize,
        loadCategory,
        startTest,
        cleanupTestState
    };
})();

// Initialisation au chargement du document
document.addEventListener('DOMContentLoaded', function() {
    testsModule.initialize();
});

// Export du module pour utilisation dans d'autres fichiers
if (typeof module !== 'undefined' && module.exports) {
    module.exports = testsModule;
}
