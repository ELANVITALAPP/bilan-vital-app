/**
 * Module de planification hebdomadaire pour l'application Bilan Vital
 * Gère la création, l'affichage et la modification du plan d'activités hebdomadaire
 */

const plannerModule = (function() {
    // Constantes globales
    const DAYS_OF_WEEK = ['Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi', 'Samedi', 'Dimanche'];
    
    const ACTIVITY_TYPES = [
        { id: 'pilates', name: 'Pilates', icon: 'pilates', color: '#00813F' },
        { id: 'cardio', name: 'Cardio', icon: 'cardio', color: '#3A9D6E' },
        { id: 'equilibre', name: 'Équilibre', icon: 'equilibre', color: '#4C9C63' },
        { id: 'etirements', name: 'Étirements', icon: 'etirements', color: '#68A154' },
        { id: 'chaise', name: 'Sur chaise', icon: 'chaise', color: '#64A066' }
    ];
    
    const INTENSITY_LEVELS = {
        LOW: 'Faible',
        MODERATE: 'Modérée',
        HIGH: 'Élevée'
    };
    
    const PLAN_FEATURES = {
        BILAN: 'bilan',
        PLANNER: 'planner',
        TODAY_SESSION: 'todaySession'
    };
    
    const ADHERENCE_MESSAGES = {
        EXCELLENT: 'Excellente adhérence ! Continuez comme ça !',
        VERY_GOOD: 'Très bonne adhérence. Vous êtes sur la bonne voie !',
        GOOD: 'Bonne adhérence. Essayez de maintenir ou d\'améliorer ce rythme.',
        FAIR: 'Continuez vos efforts ! Chaque séance compte.',
        POOR: 'N\'abandonnez pas ! Même une courte séance est bénéfique.'
    };
    
    // Dépendances
    const testsData = window.testsData || {}; // Défini dans testsData.js
    const userData = window.userData || {}; // Défini dans userData.js
    const helpers = window.helpers || {}; // Défini dans helpers.js
    
    // État du module
    let currentWeeklyPlan = null;
    let selectedDays = [];
    let selectedObjectives = [];
    let selectedConstraints = [];
    
    /**
     * Initialise le module de planification
     * Doit être appelé lors du chargement de la page
     */
    function initialize() {
        // Écouter les événements de navigation pour charger le plan si nécessaire
        document.addEventListener('navigation:change', handleNavigationChange);
    }
    
    /**
     * Gère les changements de navigation
     * @param {Event} event - Événement de navigation
     */
    function handleNavigationChange(event) {
        // Charger le plan existant lorsqu'on arrive sur la fonctionnalité
        if (event.detail && event.detail.path === 'feature/planner') {
            loadExistingPlan();
        }
    }
    
    /**
     * Charge le plan hebdomadaire existant
     */
    async function loadExistingPlan() {
        try {
            // Récupérer le plan existant
            const plan = await userData.getWeeklyPlan();
            
            // Vérifier si le plan est toujours actif
            if (plan && userData.isWeeklyPlanActive(plan)) {
                currentWeeklyPlan = plan;
                displayExistingPlan();
            } else {
                // Si pas de plan actif, afficher le formulaire de création
                displayPlannerForm();
            }
        } catch (error) {
            console.error('Erreur lors du chargement du plan existant:', error);
            displayPlannerForm();
        }
    }
    
    /**
     * Affiche le formulaire de création de plan hebdomadaire
     */
    function displayPlannerForm() {
        const plannerContainer = document.getElementById('plannerContainer');
        if (!plannerContainer) {
            console.error('Conteneur du planificateur non trouvé');
            return;
        }
        
        plannerContainer.innerHTML = `
            <div class="plannerHeader">
                <h1>Planifier ma semaine</h1>
                <p class="plannerDescription">
                    Créez votre plan d'activités personnalisé en fonction de vos disponibilités et objectifs.
                </p>
            </div>
            
            <form id="plannerForm">
                <div class="formSection">
                    <h2>Jours disponibles</h2>
                    <p>Sélectionnez les jours où vous êtes disponible pour pratiquer une activité.</p>
                    <div class="daysSelector">
                        ${DAYS_OF_WEEK.map((day, index) => `
                            <div class="dayCheckbox">
                                <input type="checkbox" id="day-${index}" name="days" value="${index}">
                                <label for="day-${index}">${day}</label>
                            </div>
                        `).join('')}
                    </div>
                </div>
                
                <div class="formSection">
                    <h2>Objectifs de la semaine</h2>
                    <p>Sélectionnez jusqu'à 3 objectifs pour cette semaine.</p>
                    <div class="objectivesSelector">
                        <div class="objectiveCheckbox">
                            <input type="checkbox" id="obj-force" name="objectives" value="force">
                            <label for="obj-force">Améliorer ma force</label>
                        </div>
                        <div class="objectiveCheckbox">
                            <input type="checkbox" id="obj-souplesse" name="objectives" value="souplesse">
                            <label for="obj-souplesse">Augmenter ma souplesse</label>
                        </div>
                        <div class="objectiveCheckbox">
                            <input type="checkbox" id="obj-equilibre" name="objectives" value="equilibre">
                            <label for="obj-equilibre">Travailler mon équilibre</label>
                        </div>
                        <div class="objectiveCheckbox">
                            <input type="checkbox" id="obj-cardio" name="objectives" value="cardio">
                            <label for="obj-cardio">Améliorer mon endurance</label>
                        </div>
                        <div class="objectiveCheckbox">
                            <input type="checkbox" id="obj-stress" name="objectives" value="stress">
                            <label for="obj-stress">Réduire mon stress</label>
                        </div>
                        <div class="objectiveCheckbox">
                            <input type="checkbox" id="obj-sommeil" name="objectives" value="sommeil">
                            <label for="obj-sommeil">Améliorer mon sommeil</label>
                        </div>
                    </div>
                </div>
                
                <div class="formSection">
                    <h2>Contraintes particulières</h2>
                    <p>Indiquez vos contraintes pour adapter le programme.</p>
                    <div class="constraintsSelector">
                        <div class="constraintCheckbox">
                            <input type="checkbox" id="constraint-time" name="constraints" value="time">
                            <label for="constraint-time">Temps limité (15-20 min max par séance)</label>
                        </div>
                        <div class="constraintCheckbox">
                            <input type="checkbox" id="constraint-noise" name="constraints" value="noise">
                            <label for="constraint-noise">Environnement calme nécessaire</label>
                        </div>
                        <div class="constraintCheckbox">
                            <input type="checkbox" id="constraint-mobility" name="constraints" value="mobility">
                            <label for="constraint-mobility">Mobilité réduite</label>
                        </div>
                        <div class="constraintCheckbox">
                            <input type="checkbox" id="constraint-joints" name="constraints" value="joints">
                            <label for="constraint-joints">Problèmes articulaires</label>
                        </div>
                        <div class="constraintCheckbox">
                            <input type="checkbox" id="constraint-morning" name="constraints" value="morning">
                            <label for="constraint-morning">Préférence pour le matin</label>
                        </div>
                        <div class="constraintCheckbox">
                            <input type="checkbox" id="constraint-evening" name="constraints" value="evening">
                            <label for="constraint-evening">Préférence pour le soir</label>
                        </div>
                    </div>
                </div>
                
                <div class="formActions">
                    <button type="submit" class="btn btnPrimary">Générer mon planning</button>
                    <button type="button" class="btn btnSecondary" id="resetFormBtn">Réinitialiser</button>
                </div>
            </form>
        `;
        
        // Ajouter les écouteurs d'événements
        const form = document.getElementById('plannerForm');
        const resetButton = document.getElementById('resetFormBtn');
        
        form.addEventListener('submit', handleFormSubmit);
        resetButton.addEventListener('click', () => form.reset());
        
        // Ajouter l'écouteur pour la limite de 3 objectifs
        const objectiveCheckboxes = document.querySelectorAll('input[name="objectives"]');
        objectiveCheckboxes.forEach(checkbox => {
            checkbox.addEventListener('change', () => {
                const checked = document.querySelectorAll('input[name="objectives"]:checked');
                
                if (checked.length > 3) {
                    checkbox.checked = false;
                    alert('Veuillez sélectionner au maximum 3 objectifs.');
                }
            });
        });
    }
    
    /**
     * Gère la soumission du formulaire de planification
     * @param {Event} event - Événement de soumission
     */
    async function handleFormSubmit(event) {
        event.preventDefault();
        
        // Récupérer les jours sélectionnés
        selectedDays = Array.from(document.querySelectorAll('input[name="days"]:checked'))
            .map(input => parseInt(input.value));
        
        // Récupérer les objectifs sélectionnés
        selectedObjectives = Array.from(document.querySelectorAll('input[name="objectives"]:checked'))
            .map(input => input.value);
        
        // Récupérer les contraintes sélectionnées
        selectedConstraints = Array.from(document.querySelectorAll('input[name="constraints"]:checked'))
            .map(input => input.value);
        
        // Vérifier qu'au moins un jour est sélectionné
        if (selectedDays.length === 0) {
            alert('Veuillez sélectionner au moins un jour disponible.');
            return;
        }
        
        // Générer le plan hebdomadaire
        try {
            const generatedPlan = generateWeeklyPlan();
            
            // Afficher le plan généré
            displayGeneratedPlan(generatedPlan);
            
            // Stocker temporairement le plan (sera sauvegardé définitivement après confirmation)
            currentWeeklyPlan = generatedPlan;
        } catch (error) {
            console.error('Erreur lors de la génération du plan:', error);
            alert('Une erreur est survenue lors de la génération du plan. Veuillez réessayer.');
        }
    }
    
    /**
     * Génère un plan hebdomadaire basé sur les sélections de l'utilisateur
     * @returns {Object} Plan hebdomadaire généré
     */
    function generateWeeklyPlan() {
        // Cette fonction utiliserait un algorithme plus sophistiqué dans une implémentation réelle
        // Elle analyserait les résultats des tests, les préférences utilisateur, etc.
        
        // Plan à générer
        const plan = {
            startDate: new Date().toISOString(),
            lastUpdated: new Date().toISOString(),
            availableDays: selectedDays,
            weeklyGoals: selectedObjectives,
            constraints: selectedConstraints,
            plannedSessions: []
        };
        
        // Associer des activités aux jours sélectionnés
        selectedDays.forEach(dayIndex => {
            // Déterminer le type d'activité pour ce jour
            const activityType = determineActivityType(dayIndex, selectedObjectives, selectedConstraints);
            
            // Déterminer la durée et l'intensité
            const duration = determineSessionDuration(selectedConstraints);
            const intensity = determineSessionIntensity(selectedConstraints);
            
            // Ajouter la séance au plan
            plan.plannedSessions.push({
                day: dayIndex,
                dayName: DAYS_OF_WEEK[dayIndex],
                activityType: activityType.id,
                activityName: activityType.name,
                activityIcon: activityType.icon,
                activityColor: activityType.color,
                duration: duration,
                intensity: intensity,
                completed: false
            });
        });
        
        // Ajouter des métadonnées
        plan.sessionCount = plan.plannedSessions.length;
        plan.totalDuration = plan.plannedSessions.reduce((total, session) => total + session.duration, 0);
        
        return plan;
    }
    
    /**
     * Détermine le type d'activité pour un jour spécifique
     * @param {number} dayIndex - Index du jour
     * @param {Array} objectives - Objectifs sélectionnés
     * @param {Array} constraints - Contraintes sélectionnées
     * @returns {Object} Type d'activité
     */
    function determineActivityType(dayIndex, objectives, constraints) {
        // Cette fonction utiliserait une logique plus sophistiquée dans une implémentation réelle
        
        // Pour l'exemple, on utilise une logique simple basée sur les objectifs
        
        // Si l'utilisateur a des problèmes de mobilité, privilégier les séances sur chaise
        if (constraints.includes('mobility')) {
            return ACTIVITY_TYPES.find(type => type.id === 'chaise');
        }
        
        // Si l'objectif est l'équilibre, privilégier les séances d'équilibre
        if (objectives.includes('equilibre')) {
            return ACTIVITY_TYPES.find(type => type.id === 'equilibre');
        }
        
        // Si l'objectif est la souplesse, privilégier les séances d'étirements
        if (objectives.includes('souplesse')) {
            return ACTIVITY_TYPES.find(type => type.id === 'etirements');
        }
        
        // Si l'objectif est le cardio, privilégier les séances de cardio
        if (objectives.includes('cardio')) {
            return ACTIVITY_TYPES.find(type => type.id === 'cardio');
        }
        
        // Pour les autres objectifs, ou si plusieurs sont sélectionnés, alterner
        // entre pilates et d'autres types
        if (dayIndex % 2 === 0) {
            return ACTIVITY_TYPES.find(type => type.id === 'pilates');
        } else {
            // Choisir un type aléatoire différent de pilates
            const otherTypes = ACTIVITY_TYPES.filter(type => type.id !== 'pilates');
            const randomIndex = Math.floor(Math.random() * otherTypes.length);
            return otherTypes[randomIndex];
        }
    }
    
    /**
     * Détermine la durée de la séance en fonction des contraintes
     * @param {Array} constraints - Contraintes sélectionnées
     * @returns {number} Durée en minutes
     */
    function determineSessionDuration(constraints) {
        // Si l'utilisateur a des contraintes de temps, sessions courtes
        if (constraints.includes('time')) {
            return 15 + Math.floor(Math.random() * 6); // 15-20 minutes
        }
        
        // Sinon, durée standard
        return 20 + Math.floor(Math.random() * 16); // 20-35 minutes
    }
    
    /**
     * Détermine l'intensité de la séance en fonction des contraintes
     * @param {Array} constraints - Contraintes sélectionnées
     * @returns {string} Niveau d'intensité
     */
    function determineSessionIntensity(constraints) {
        // Si l'utilisateur a des problèmes articulaires, intensité faible
        if (constraints.includes('joints')) {
            return INTENSITY_LEVELS.LOW;
        }
        
        // Si l'utilisateur a des problèmes de mobilité, intensité faible
        if (constraints.includes('mobility')) {
            return INTENSITY_LEVELS.LOW;
        }
        
        // Sinon, intensité variable
        const intensities = [INTENSITY_LEVELS.LOW, INTENSITY_LEVELS.MODERATE, INTENSITY_LEVELS.HIGH];
        const weights = [0.3, 0.5, 0.2]; // 30% faible, 50% modérée, 20% élevée
        
        const random = Math.random();
        let sum = 0;
        
        for (let i = 0; i < intensities.length; i++) {
            sum += weights[i];
            if (random < sum) {
                return intensities[i];
            }
        }
        
        return INTENSITY_LEVELS.MODERATE; // Par défaut
    }
    
    /**
     * Affiche le plan hebdomadaire généré
     * @param {Object} plan - Plan hebdomadaire
     */
    function displayGeneratedPlan(plan) {
        const plannerContainer = document.getElementById('plannerContainer');
        if (!plannerContainer) return;
        
        plannerContainer.innerHTML = `
            <div class="plannerHeader">
                <h1>Votre plan hebdomadaire</h1>
                <p class="plannerDescription">
                    Voici votre plan d'activités personnalisé pour la semaine.
                </p>
            </div>
            
            <div class="plannerContent">
                <div class="planSummary">
                    <div class="summaryItem">
                        <div class="summaryValue">${plan.sessionCount}</div>
                        <div class="summaryLabel">Séances</div>
                    </div>
                    <div class="summaryItem">
                        <div class="summaryValue">${plan.totalDuration}</div>
                        <div class="summaryLabel">Minutes</div>
                    </div>
                    <div class="summaryItem">
                        <div class="summaryValue">${formatDateRange(plan.startDate, 7)}</div>
                        <div class="summaryLabel">Période</div>
                    </div>
                </div>
                
                <div class="weeklyCalendar">
                    ${DAYS_OF_WEEK.map((day, index) => {
                        const session = plan.plannedSessions.find(s => s.day === index);
                        
                        if (!session) {
                            return `
                                <div class="dayCard dayEmpty">
                                    <div class="dayName">${day}</div>
                                    <div class="dayContent empty">
                                        <p>Aucune activité prévue</p>
                                    </div>
                                </div>
                            `;
                        }
                        
                        return `
                            <div class="dayCard">
                                <div class="dayName">${day}</div>
                                <div class="dayContent">
                                    <div class="sessionCard" style="border-left-color: ${session.activityColor}">
                                        <div class="sessionIcon"><i class="icon-${session.activityIcon}"></i></div>
                                        <div class="sessionDetails">
                                            <div class="sessionTitle">${session.activityName}</div>
                                            <div class="sessionMetadata">
                                                <span class="sessionDuration">${session.duration} min</span>
                                                <span class="sessionIntensity">Intensité ${session.intensity}</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        `;
                    }).join('')}
                </div>
                
                <div class="planTips">
                    <h3>Conseils pour maximiser l'efficacité</h3>
                    <ul>
                        <li>Pratiquez à peu près à la même heure chaque jour pour créer une routine.</li>
                        <li>Hydratez-vous bien avant et après chaque séance.</li>
                        <li>Écoutez votre corps et adaptez l'intensité si nécessaire.</li>
                        <li>Utilisez la fonctionnalité "Quelle séance aujourd'hui?" pour affiner votre séance selon votre état du jour.</li>
                    </ul>
                </div>
                
                <div class="planActions">
                    <button class="btn btnPrimary" id="savePlanBtn">Adopter ce plan</button>
                    <button class="btn btnSecondary" id="customizePlanBtn">Personnaliser</button>
                    <button class="btn btnOutline" id="regeneratePlanBtn">Générer un autre plan</button>
                </div>
                
                <div class="reminderOption">
                    <div class="formCheck">
                        <input type="checkbox" id="enableReminders" checked>
                        <label for="enableReminders">Activer des rappels pour les séances</label>
                    </div>
                    <select id="reminderTime" ${!plan.plannedSessions.length ? 'disabled' : ''}>
                        <option value="day">Le jour même (matin)</option>
                        <option value="eveningBefore">La veille au soir</option>
                        <option value="hourBefore">1 heure avant</option>
                    </select>
                </div>
            </div>
        `;
        
        // Ajouter les écouteurs d'événements
        document.getElementById('savePlanBtn').addEventListener('click', saveWeeklyPlan);
        document.getElementById('customizePlanBtn').addEventListener('click', customizePlan);
        document.getElementById('regeneratePlanBtn').addEventListener('click', regeneratePlan);
    }
    
    /**
     * Affiche un plan hebdomadaire existant
     */
    function displayExistingPlan() {
        if (!currentWeeklyPlan) return;
        
        const plannerContainer = document.getElementById('plannerContainer');
        if (!plannerContainer) return;
        
        plannerContainer.innerHTML = `
            <div class="plannerHeader">
                <h1>Votre plan hebdomadaire actif</h1>
                <p class="plannerDescription">
                    Voici votre plan d'activités pour la semaine du ${formatDate(currentWeeklyPlan.startDate)}.
                </p>
            </div>
            
            <div class="plannerContent">
                <div class="planSummary">
                    <div class="summaryItem">
                        <div class="summaryValue">${currentWeeklyPlan.sessionCount}</div>
                        <div class="summaryLabel">Séances</div>
                    </div>
                    <div class="summaryItem">
                        <div class="summaryValue">
                            ${currentWeeklyPlan.plannedSessions.filter(s => s.completed).length}/${currentWeeklyPlan.sessionCount}
                        </div>
                        <div class="summaryLabel">Réalisées</div>
                    </div>
                    <div class="summaryItem">
                        <div class="summaryValue">${currentWeeklyPlan.totalDuration}</div>
                        <div class="summaryLabel">Minutes</div>
                    </div>
                </div>
                
                <div class="weeklyCalendar">
                    ${DAYS_OF_WEEK.map((day, index) => {
                        const session = currentWeeklyPlan.plannedSessions.find(s => s.day === index);
                        
                        if (!session) {
                            return `
                                <div class="dayCard dayEmpty">
                                    <div class="dayName">${day}</div>
                                    <div class="dayContent empty">
                                        <p>Aucune activité prévue</p>
                                    </div>
                                </div>
                            `;
                        }
                        
                        const todayIndex = new Date().getDay() === 0 ? 6 : new Date().getDay() - 1;
                        const isPast = index < todayIndex;
                        const isToday = index === todayIndex;
                        const statusClass = session.completed ? 'completed' : isPast ? 'missed' : isToday ? 'today' : '';
                        
                        return `
                            <div class="dayCard ${statusClass}">
                                <div class="dayName">${day} ${isToday ? '(Aujourd\'hui)' : ''}</div>
                                <div class="dayContent">
                                    <div class="sessionCard" style="border-left-color: ${session.activityColor}">
                                        <div class="sessionIcon"><i class="icon-${session.activityIcon}"></i></div>
                                        <div class="sessionDetails">
                                            <div class="sessionTitle">${session.activityName}</div>
                                            <div class="sessionMetadata">
                                                <span class="sessionDuration">${session.duration} min</span>
                                                <span class="sessionIntensity">Intensité ${session.intensity}</span>
                                            </div>
                                        </div>
                                        ${session.completed ? 
                                            '<div class="sessionCompletedBadge"><i class="icon-check"></i></div>' : 
                                            !isPast ? 
                                                `<button class="btn btnSm btnOutline markCompletedBtn" data-day-index="${index}">
                                                    Marquer comme réalisée
                                                </button>` : 
                                                '<div class="sessionMissedBadge">Manquée</div>'
                                        }
                                    </div>
                                </div>
                            </div>
                        `;
                    }).join('')}
                </div>
                
                <div class="planAdherence">
                    <h3>Suivi d'adhérence</h3>
                    <div class="adherenceProgressContainer">
                        <div class="adherenceProgressBar">
                            <div class="adherenceProgressFill" style="width: ${calculateAdherenceRate() * 100}%"></div>
                        </div>
                        <div class="adherenceRate">${Math.round(calculateAdherenceRate() * 100)}%</div>
                    </div>
                    <p class="adherenceMessage">${getAdherenceMessage()}</p>
                </div>
                
                <div class="planActions">
                    <button class="btn btnPrimary" id="todaySessionBtn">Séance d'aujourd'hui</button>
                    <button class="btn btnSecondary" id="adjustPlanBtn">Ajuster mon plan</button>
                    <button class="btn btnOutline" id="createNewPlanBtn">Créer un nouveau plan</button>
                </div>
                
                <div class="exportOptions">
                    <button class="btn btnSecondary" id="exportCalendarBtn">
                        <i class="icon-calendar"></i> Exporter vers mon calendrier
                    </button>
                    <button class="btn btnOutline" id="printPlanBtn">
                        <i class="icon-print"></i> Imprimer
                    </button>
                </div>
            </div>
        `;
        
        // Ajouter les écouteurs d'événements
        document.getElementById('todaySessionBtn').addEventListener('click', navigateToTodaySession);
        document.getElementById('adjustPlanBtn').addEventListener('click', adjustPlan);
        document.getElementById('createNewPlanBtn').addEventListener('click', createNewPlan);
        document.getElementById('exportCalendarBtn').addEventListener('click', exportToCalendar);
        document.getElementById('printPlanBtn').addEventListener('click', printPlan);
        
        // Ajouter les écouteurs pour les boutons de marquage des séances
        document.querySelectorAll('.markCompletedBtn').forEach(button => {
            button.addEventListener('click', (event) => {
                const dayIndex = parseInt(event.target.getAttribute('data-day-index'));
                markSessionAsCompleted(dayIndex);
            });
        });
    }
    
    /**
     * Sauvegarde le plan hebdomadaire
     */
    async function saveWeeklyPlan() {
        try {
            // Récupérer les paramètres de rappel si activés
            const enableReminders = document.getElementById('enableReminders').checked;
            const reminderTime = document.getElementById('reminderTime').value;
            
            // Ajouter les paramètres au plan
            currentWeeklyPlan.reminders = {
                enabled: enableReminders,
                timing: reminderTime
            };
            
            // Sauvegarder le plan
            await userData.saveWeeklyPlan(currentWeeklyPlan);
            
            // Afficher le plan sauvegardé
            displayExistingPlan();
            
            // Configurer les rappels si activés
            if (enableReminders) {
                setupReminders(currentWeeklyPlan);
            }
            
            // Afficher un message de succès
            alert('Votre plan hebdomadaire a été sauvegardé avec succès.');
        } catch (error) {
            console.error('Erreur lors de la sauvegarde du plan:', error);
            alert('Une erreur est survenue lors de la sauvegarde du plan. Veuillez réessayer.');
        }
    }
    
    /**
     * Configure les rappels pour les séances du plan
     * @param {Object} plan - Plan hebdomadaire
     */
    function setupReminders(plan) {
        // Cette fonction serait implémentée pour configurer des rappels
        // dans le calendrier de l'utilisateur ou via des notifications
        
        // Pour l'exemple, on affiche juste un message
        console.log('Configuration des rappels pour le plan:', plan);
    }
    
    /**
     * Personnalise le plan généré
     */
    function customizePlan() {
        if (!currentWeeklyPlan) return;
        
        const plannerContainer = document.getElementById('plannerContainer');
        if (!plannerContainer) return;
        
        plannerContainer.innerHTML = `
            <div class="plannerHeader">
                <h1>Personnaliser votre plan</h1>
                <p class="plannerDescription">
                    Ajustez les séances selon vos préférences.
                </p>
            </div>
            
            <div class="plannerContent">
                <div class="customizeCalendar">
                    ${DAYS_OF_WEEK.map((day, index) => {
                        const session = currentWeeklyPlan.plannedSessions.find(s => s.day === index);
                        const hasSession = !!session;
                        
                        return `
                            <div class="dayCard ${hasSession ? '' : 'dayEmpty'}">
                                <div class="dayName">${day}</div>
                                <div class="dayContent ${hasSession ? '' : 'empty'}">
                                    ${hasSession ? `
                                        <div class="sessionEditCard" data-day-index="${index}">
                                            <div class="sessionTypeSelect">
                                                <label for="sessionType-${index}">Type</label>
                                                <select id="sessionType-${index}" class="sessionType">
                                                    ${ACTIVITY_TYPES.map(type => `
                                                        <option value="${type.id}" ${session.activityType === type.id ? 'selected' : ''}>
                                                            ${type.name}
                                                        </option>
                                                    `).join('')}
                                                </select>
                                            </div>
                                            
                                            <div class="sessionDurationSelect">
                                                <label for="sessionDuration-${index}">Durée (min)</label>
                                                <input type="number" id="sessionDuration-${index}" class="sessionDuration" 
                                                    value="${session.duration}" min="10" max="60" step="5">
                                            </div>
                                            
                                            <div class="sessionIntensitySelect">
                                                <label for="sessionIntensity-${index}">Intensité</label>
                                                <select id="sessionIntensity-${index}" class="sessionIntensity">
                                                    <option value="${INTENSITY_LEVELS.LOW}" ${session.intensity === INTENSITY_LEVELS.LOW ? 'selected' : ''}>
                                                        ${INTENSITY_LEVELS.LOW}
                                                    </option>
                                                    <option value="${INTENSITY_LEVELS.MODERATE}" ${session.intensity === INTENSITY_LEVELS.MODERATE ? 'selected' : ''}>
                                                        ${INTENSITY_LEVELS.MODERATE}
                                                    </option>
                                                    <option value="${INTENSITY_LEVELS.HIGH}" ${session.intensity === INTENSITY_LEVELS.HIGH ? 'selected' : ''}>
                                                        ${INTENSITY_LEVELS.HIGH}
                                                    </option>
                                                </select>
                                            </div>
                                            
                                            <button class="btn btnSm btnOutline removeSessionBtn" data-day-index="${index}">
                                                <i class="icon-trash"></i>
                                            </button>
                                        </div>
                                    ` : `
                                        <button class="btn btnOutline addSessionBtn" data-day-index="${index}">
                                            Ajouter une séance
                                        </button>
                                    `}
                                </div>
                            </div>
                        `;
                    }).join('')}
                </div>
                
                <div class="planActions">
                    <button class="btn btnPrimary" id="saveCustomPlanBtn">Enregistrer les modifications</button>
                    <button class="btn btnSecondary" id="cancelCustomizeBtn">Annuler</button>
                </div>
            </div>
        `;
        
        // Ajouter les écouteurs d'événements
        document.getElementById('saveCustomPlanBtn').addEventListener('click', saveCustomPlan);
        document.getElementById('cancelCustomizeBtn').addEventListener('click', () => {
            // Revenir à l'affichage du plan généré
            displayGeneratedPlan(currentWeeklyPlan);
        });
        
        // Ajouter les écouteurs pour les boutons d'ajout/suppression de séance
        document.querySelectorAll('.addSessionBtn').forEach(button => {
            button.addEventListener('click', (event) => {
                const dayIndex = parseInt(event.target.getAttribute('data-day-index'));
                addSessionToDay(dayIndex);
            });
        });
        
        document.querySelectorAll('.removeSessionBtn').forEach(button => {
            button.addEventListener('click', (event) => {
                const dayIndex = parseInt(event.target.getAttribute('data-day-index'));
                removeSessionFromDay(dayIndex);
            });
        });
    }
    
    /**
     * Ajoute une nouvelle séance à un jour du plan
     * @param {number} dayIndex - Index du jour
     */
    function addSessionToDay(dayIndex) {
        // Vérifier si le jour a déjà une séance
        const existingSession = currentWeeklyPlan.plannedSessions.find(s => s.day === dayIndex);
        if (existingSession) return;
        
        // Créer une nouvelle séance
        const newActivity = ACTIVITY_TYPES[0]; // Pilates par défaut
        const newSession = {
            day: dayIndex,
            dayName: DAYS_OF_WEEK[dayIndex],
            activityType: newActivity.id,
            activityName: newActivity.name,
            activityIcon: newActivity.icon,
            activityColor: newActivity.color,
            duration: 30,
            intensity: INTENSITY_LEVELS.MODERATE,
            completed: false
        };
        
        // Ajouter la séance au plan
        currentWeeklyPlan.plannedSessions.push(newSession);
        
        // Mettre à jour les métadonnées du plan
        currentWeeklyPlan.sessionCount = currentWeeklyPlan.plannedSessions.length;
        currentWeeklyPlan.totalDuration = currentWeeklyPlan.plannedSessions.reduce(
            (total, session) => total + session.duration, 0
        );
        
        // Rafraîchir l'affichage
        customizePlan();
    }
    
    /**
     * Supprime une séance d'un jour du plan
     * @param {number} dayIndex - Index du jour
     */
    function removeSessionFromDay(dayIndex) {
        // Filtrer la séance à supprimer
        currentWeeklyPlan.plannedSessions = currentWeeklyPlan.plannedSessions.filter(
            s => s.day !== dayIndex
        );
        
        // Mettre à jour les métadonnées du plan
        currentWeeklyPlan.sessionCount = currentWeeklyPlan.plannedSessions.length;
        currentWeeklyPlan.totalDuration = currentWeeklyPlan.plannedSessions.reduce(
            (total, session) => total + session.duration, 0
        );
        
        // Rafraîchir l'affichage
        customizePlan();
    }
    
    /**
     * Sauvegarde le plan personnalisé
     */
    function saveCustomPlan() {
        // Parcourir toutes les séances et mettre à jour leurs propriétés
        currentWeeklyPlan.plannedSessions.forEach(session => {
            const dayIndex = session.day;
            
            const typeSelect = document.getElementById(`sessionType-${dayIndex}`);
            const durInput = document.getElementById(`sessionDuration-${dayIndex}`);
            const intensitySelect = document.getElementById(`sessionIntensity-${dayIndex}`);
            
            if (typeSelect && durInput && intensitySelect) {
                // Mettre à jour le type d'activité
                const newActivityType = typeSelect.value;
                const activityInfo = ACTIVITY_TYPES.find(type => type.id === newActivityType);
                
                session.activityType = newActivityType;
                session.activityName = activityInfo.name;
                session.activityIcon = activityInfo.icon;
                session.activityColor = activityInfo.color;
                
                // Mettre à jour la durée
                session.duration = parseInt(durInput.value);
                
                // Mettre à jour l'intensité
                session.intensity = intensitySelect.value;
            }
        });
        
        // Mettre à jour les métadonnées du plan
        currentWeeklyPlan.totalDuration = currentWeeklyPlan.plannedSessions.reduce(
            (total, session) => total + session.duration, 0
        );
        
        // Afficher le plan mis à jour
        displayGeneratedPlan(currentWeeklyPlan);
    }
    
    /**
     * Génère un nouveau plan hebdomadaire
     */
    function regeneratePlan() {
        // Générer un nouveau plan avec les mêmes paramètres
        const newPlan = generateWeeklyPlan();
        
        // Afficher le nouveau plan
        displayGeneratedPlan(newPlan);
        
        // Mettre à jour le plan courant
        currentWeeklyPlan = newPlan;
    }
    
    /**
     * Marque une séance comme complétée
     * @param {number} dayIndex - Index du jour
     */
    async function markSessionAsCompleted(dayIndex) {
        if (!currentWeeklyPlan) return;
        
        // Trouver la séance correspondante
        const session = currentWeeklyPlan.plannedSessions.find(s => s.day === dayIndex);
        if (!session) return;
        
        // Marquer comme complétée
        session.completed = true;
        
        // Mettre à jour la date de dernière modification
        currentWeeklyPlan.lastUpdated = new Date().toISOString();
        
        // Sauvegarder le plan mis à jour
        try {
            await userData.saveWeeklyPlan(currentWeeklyPlan);
            
            // Rafraîchir l'affichage
            displayExistingPlan();
        } catch (error) {
            console.error('Erreur lors de la mise à jour du plan:', error);
            alert('Une erreur est survenue lors de la mise à jour du plan.');
        }
    }
    
    /**
     * Calcule le taux d'adhérence au plan
     * @returns {number} Taux d'adhérence (0-1)
     */
    function calculateAdherenceRate() {
        if (!currentWeeklyPlan || !currentWeeklyPlan.plannedSessions.length) return 0;
        
        // Calculer le jour actuel de la semaine (0 = lundi, 6 = dimanche)
        const today = new Date();
        const dayOfWeek = today.getDay() === 0 ? 6 : today.getDay() - 1;
        
        // Compter les séances passées ou du jour même
        const pastOrTodaySessions = currentWeeklyPlan.plannedSessions.filter(s => s.day <= dayOfWeek);
        if (!pastOrTodaySessions.length) return 1; // Aucune séance passée
        
        // Compter les séances complétées
        const completedSessions = pastOrTodaySessions.filter(s => s.completed);
        
        // Calculer le taux d'adhérence
        return completedSessions.length / pastOrTodaySessions.length;
    }
    
    /**
     * Retourne un message d'encouragement basé sur le taux d'adhérence
     * @returns {string} Message d'encouragement
     */
    function getAdherenceMessage() {
        const rate = calculateAdherenceRate();
        
        if (rate >= 0.9) {
            return ADHERENCE_MESSAGES.EXCELLENT;
        } else if (rate >= 0.7) {
            return ADHERENCE_MESSAGES.VERY_GOOD;
        } else if (rate >= 0.5) {
            return ADHERENCE_MESSAGES.GOOD;
        } else if (rate >= 0.3) {
            return ADHERENCE_MESSAGES.FAIR;
        } else {
            return ADHERENCE_MESSAGES.POOR;
        }
    }
    
    /**
     * Ajuste le plan hebdomadaire existant
     */
    function adjustPlan() {
        if (!currentWeeklyPlan) return;
        
        // Utiliser la même fonction que pour personnaliser un plan
        customizePlan();
    }
    
    /**
     * Crée un nouveau plan hebdomadaire
     */
    function createNewPlan() {
        // Afficher un message de confirmation
        if (confirm('Êtes-vous sûr de vouloir créer un nouveau plan ? Le plan actuel sera remplacé.')) {
            // Réinitialiser l'état
            currentWeeklyPlan = null;
            selectedDays = [];
            selectedObjectives = [];
            selectedConstraints = [];
            
            // Afficher le formulaire de création
            displayPlannerForm();
        }
    }
    
    /**
     * Navigue vers la fonctionnalité "Quelle séance aujourd'hui?"
     */
    function navigateToTodaySession() {
        window.navigation.navigateToFeature(PLAN_FEATURES.TODAY_SESSION);
    }
    
    /**
     * Exporte le plan vers le calendrier de l'utilisateur
     */
    function exportToCalendar() {
        // Cette fonction serait implémentée pour exporter le plan
        // vers Google Calendar, Apple Calendar, etc.
        
        // Pour l'exemple, on affiche juste un message
        alert('Export du plan vers le calendrier en cours de développement.');
    }
    
    /**
     * Imprime le plan hebdomadaire
     */
    function printPlan() {
        // Cette fonction serait implémentée pour formater le plan
        // pour l'impression
        
        // Pour l'exemple, on utilise la fonction d'impression du navigateur
        window.print();
    }
    
    /**
     * Formate une date pour l'affichage
     * @param {string} dateString - Date au format ISO
     * @returns {string} Date formatée
     */
    function formatDate(dateString) {
        if (!dateString) return '';
        
        const date = new Date(dateString);
        return date.toLocaleDateString('fr-FR', {
            day: 'numeric',
            month: 'long',
            year: 'numeric'
        });
    }
    
    /**
     * Formate une plage de dates pour l'affichage
     * @param {string} startDateString - Date de début au format ISO
     * @param {number} days - Nombre de jours dans la plage
     * @returns {string} Plage de dates formatée
     */
    function formatDateRange(startDateString, days) {
        if (!startDateString) return '';
        
        const startDate = new Date(startDateString);
        const endDate = new Date(startDate);
        endDate.setDate(startDate.getDate() + days - 1);
        
        return `${formatDate(startDate.toISOString())} au ${formatDate(endDate.toISOString())}`;
    }
    
    // API publique
    return {
        initialize,
        loadExistingPlan,
        displayPlannerForm
    };
})();

// Initialisation au chargement du document
document.addEventListener('DOMContentLoaded', function() {
    plannerModule.initialize();
});

// Export du module pour utilisation dans d'autres fichiers
if (typeof module !== 'undefined' && module.exports) {
    module.exports = plannerModule;
}
