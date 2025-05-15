/**
 * Module de recommandation quotidienne pour l'application Bilan Vital
 * Gère l'évaluation de l'état du jour et les recommandations de séances adaptées
 */

const todaySessionModule = (function() {
    // Dépendances
    const testsData = window.testsData || {}; // Défini dans testsData.js
    const userData = window.userData || {}; // Défini dans userData.js
    const helpers = window.helpers || {}; // Défini dans helpers.js
    
    // Constantes globales
    const ACTIVITY_TYPES = [
        { id: 'pilates', name: 'Pilates', icon: 'pilates', color: '#00813F' },
        { id: 'cardio', name: 'Cardio', icon: 'cardio', color: '#3A9D6E' },
        { id: 'equilibre', name: 'Équilibre', icon: 'equilibre', color: '#4C9C63' },
        { id: 'etirements', name: 'Étirements', icon: 'etirements', color: '#68A154' },
        { id: 'chaise', name: 'Sur chaise', icon: 'chaise', color: '#64A066' },
        { id: 'relaxation', name: 'Relaxation', icon: 'relaxation', color: '#5A9367' }
    ];
    
    // Profils d'état
    const PROFILES = [
        {
            id: 'low-low',
            name: 'Récupération',
            description: 'Lorsque votre énergie physique et mentale est basse, privilégiez la récupération.',
            icon: 'recovery',
            color: '#5A9367',
            recommendation: 'Séance de récupération, relaxation, étirements doux.',
            activityTypes: ['etirements', 'chaise', 'relaxation'],
            intensity: 'Faible',
            duration: [10, 20]
        },
        {
            id: 'low-high',
            name: 'Technique',
            description: 'Profitez de votre bonne concentration pour travailler la technique.',
            icon: 'technique',
            color: '#4C9C63',
            recommendation: 'Séance technique, concentration, précision.',
            activityTypes: ['pilates', 'equilibre'],
            intensity: 'Modérée',
            duration: [20, 30]
        },
        {
            id: 'high-low',
            name: 'Énergie',
            description: 'Utilisez votre énergie physique pour améliorer votre humeur.',
            icon: 'energy',
            color: '#3A9D6E',
            recommendation: 'Séance simple à intensité modérée.',
            activityTypes: ['cardio', 'pilates'],
            intensity: 'Modérée',
            duration: [20, 30]
        },
        {
            id: 'high-high',
            name: 'Performance',
            description: 'C\'est le moment idéal pour vous challenger !',
            icon: 'performance',
            color: '#00813F',
            recommendation: 'Séance intensive, défis, nouveautés.',
            activityTypes: ['pilates', 'cardio', 'equilibre'],
            intensity: 'Élevée',
            duration: [30, 45]
        }
    ];
    
    // État du module
    let currentDailyState = null;
    let recommendedSessions = [];
    
    /**
     * Initialise le module
     * Doit être appelé lors du chargement de la page
     */
    function initialize() {
        // Écouter les événements de navigation
        document.addEventListener('navigation:change', handleNavigationChange);
    }
    
    /**
     * Gère les changements de navigation
     * @param {Event} event - Événement de navigation
     */
    function handleNavigationChange(event) {
        // Charger l'évaluation existante lorsqu'on arrive sur la fonctionnalité
        if (event.detail && event.detail.path === 'feature/todaySession') {
            loadExistingEvaluation();
        }
    }
    
    /**
     * Charge l'évaluation existante du jour
     */
    async function loadExistingEvaluation() {
        try {
            // Récupérer l'état du jour
            const dailyState = await userData.getDailyState();
            
            // Vérifier si un état existe pour aujourd'hui
            if (dailyState) {
                currentDailyState = dailyState;
                displayExistingEvaluation();
            } else {
                // Si pas d'évaluation pour aujourd'hui, afficher le formulaire
                displayEvaluationForm();
            }
        } catch (error) {
            console.error('Erreur lors du chargement de l\'évaluation existante:', error);
            displayEvaluationForm();
        }
    }
    
    /**
     * Affiche le formulaire d'évaluation de l'état du jour
     */
    function displayEvaluationForm() {
        const container = document.getElementById('todaySessionContainer');
        if (!container) {
            console.error('Conteneur de séance quotidienne non trouvé');
            return;
        }
        
        container.innerHTML = `
            <div class="todaySessionHeader">
                <h1>Quelle séance aujourd'hui?</h1>
                <p class="todaySessionDescription">
                    Évaluez votre état physique et mental du jour pour obtenir une recommandation personnalisée.
                </p>
            </div>
            
            <form id="dailyEvaluationForm">
                <div class="formSection physicalSection">
                    <h2>État physique</h2>
                    <p>Évaluez votre état physique actuel.</p>
                    
                    <div class="evaluationQuestion">
                        <label for="energyLevel">Niveau d'énergie</label>
                        <div class="sliderContainer">
                            <input type="range" id="energyLevel" min="1" max="5" value="3" class="physicalInput">
                            <div class="sliderLabels">
                                <span>Très faible</span>
                                <span>Faible</span>
                                <span>Moyen</span>
                                <span>Bon</span>
                                <span>Excellent</span>
                            </div>
                        </div>
                    </div>
                    
                    <div class="evaluationQuestion">
                        <label for="painLevel">Douleurs ou inconfort</label>
                        <div class="sliderContainer">
                            <input type="range" id="painLevel" min="1" max="5" value="1" class="physicalInput reverse">
                            <div class="sliderLabels">
                                <span>Aucune</span>
                                <span>Légère</span>
                                <span>Modérée</span>
                                <span>Importante</span>
                                <span>Sévère</span>
                            </div>
                        </div>
                    </div>
                    
                    <div class="evaluationQuestion">
                        <label for="flexibilityLevel">Souplesse ressentie</label>
                        <div class="sliderContainer">
                            <input type="range" id="flexibilityLevel" min="1" max="5" value="3" class="physicalInput">
                            <div class="sliderLabels">
                                <span>Très raide</span>
                                <span>Raide</span>
                                <span>Moyenne</span>
                                <span>Bonne</span>
                                <span>Excellente</span>
                            </div>
                        </div>
                    </div>
                    
                    <div class="evaluationQuestion">
                        <label for="recoveryLevel">Récupération</label>
                        <div class="sliderContainer">
                            <input type="range" id="recoveryLevel" min="1" max="5" value="3" class="physicalInput">
                            <div class="sliderLabels">
                                <span>Médiocre</span>
                                <span>Limitée</span>
                                <span>Moyenne</span>
                                <span>Bonne</span>
                                <span>Complète</span>
                            </div>
                        </div>
                    </div>
                    
                    <div class="evaluationQuestion">
                        <label for="sleepQuality">Qualité du sommeil</label>
                        <div class="sliderContainer">
                            <input type="range" id="sleepQuality" min="1" max="5" value="3" class="physicalInput">
                            <div class="sliderLabels">
                                <span>Très mauvaise</span>
                                <span>Mauvaise</span>
                                <span>Moyenne</span>
                                <span>Bonne</span>
                                <span>Excellente</span>
                            </div>
                        </div>
                    </div>
                </div>
                
                <div class="formSection mentalSection">
                    <h2>État mental</h2>
                    <p>Évaluez votre état mental actuel.</p>
                    
                    <div class="evaluationQuestion">
                        <label for="moodLevel">Humeur</label>
                        <div class="sliderContainer">
                            <input type="range" id="moodLevel" min="1" max="5" value="3" class="mentalInput">
                            <div class="sliderLabels">
                                <span>Très basse</span>
                                <span>Basse</span>
                                <span>Moyenne</span>
                                <span>Bonne</span>
                                <span>Excellente</span>
                            </div>
                        </div>
                    </div>
                    
                    <div class="evaluationQuestion">
                        <label for="stressLevel">Niveau de stress</label>
                        <div class="sliderContainer">
                            <input type="range" id="stressLevel" min="1" max="5" value="3" class="mentalInput reverse">
                            <div class="sliderLabels">
                                <span>Aucun</span>
                                <span>Léger</span>
                                <span>Modéré</span>
                                <span>Élevé</span>
                                <span>Très élevé</span>
                            </div>
                        </div>
                    </div>
                    
                    <div class="evaluationQuestion">
                        <label for="motivationLevel">Motivation</label>
                        <div class="sliderContainer">
                            <input type="range" id="motivationLevel" min="1" max="5" value="3" class="mentalInput">
                            <div class="sliderLabels">
                                <span>Très faible</span>
                                <span>Faible</span>
                                <span>Moyenne</span>
                                <span>Bonne</span>
                                <span>Excellente</span>
                            </div>
                        </div>
                    </div>
                    
                    <div class="evaluationQuestion">
                        <label for="focusLevel">Concentration</label>
                        <div class="sliderContainer">
                            <input type="range" id="focusLevel" min="1" max="5" value="3" class="mentalInput">
                            <div class="sliderLabels">
                                <span>Très faible</span>
                                <span>Faible</span>
                                <span>Moyenne</span>
                                <span>Bonne</span>
                                <span>Excellente</span>
                            </div>
                        </div>
                    </div>
                    
                    <div class="evaluationQuestion">
                        <label for="clarityLevel">Clarté mentale</label>
                        <div class="sliderContainer">
                            <input type="range" id="clarityLevel" min="1" max="5" value="3" class="mentalInput">
                            <div class="sliderLabels">
                                <span>Très faible</span>
                                <span>Faible</span>
                                <span>Moyenne</span>
                                <span>Bonne</span>
                                <span>Excellente</span>
                            </div>
                        </div>
                    </div>
                </div>
                
                <div class="formActions">
                    <button type="submit" class="btn btnPrimary">Obtenir ma recommandation</button>
                    <button type="reset" class="btn btnSecondary">Réinitialiser</button>
                </div>
            </form>
        `;
        
        // Ajouter les écouteurs d'événements
        const form = document.getElementById('dailyEvaluationForm');
        form.addEventListener('submit', handleEvaluationSubmit);
        
        // Ajouter des écouteurs pour mettre à jour visuellement les valeurs des sliders
        const sliders = document.querySelectorAll('input[type="range"]');
        sliders.forEach(slider => {
            // Ajouter des marqueurs de valeur sous le slider
            const container = slider.parentElement;
            
            // Mettre à jour la position initiale
            updateSliderVisual(slider);
            
            // Ajouter l'écouteur pour les changements
            slider.addEventListener('input', () => {
                updateSliderVisual(slider);
            });
        });
    }
    
    /**
     * Met à jour l'affichage visuel d'un slider
     * @param {HTMLElement} slider - Élément du slider
     */
    function updateSliderVisual(slider) {
        const value = slider.value;
        const min = slider.min || 1;
        const max = slider.max || 5;
        const percentage = ((value - min) / (max - min)) * 100;
        
        // Appliquer un dégradé pour visualiser la valeur
        slider.style.background = `linear-gradient(to right, var(--color-secondary) 0%, var(--color-secondary) ${percentage}%, #e0e0e0 ${percentage}%, #e0e0e0 100%)`;
    }
    
    /**
     * Gère la soumission du formulaire d'évaluation
     * @param {Event} event - Événement de soumission
     */
    async function handleEvaluationSubmit(event) {
        event.preventDefault();
        
        // Récupérer les valeurs des inputs physiques
        const physicalInputs = document.querySelectorAll('.physicalInput');
        let physicalScore = 0;
        
        physicalInputs.forEach(input => {
            let value = parseInt(input.value);
            
            // Inverser la valeur pour les échelles inversées (ex: douleur)
            if (input.classList.contains('reverse')) {
                value = 6 - value; // 1->5, 2->4, 3->3, 4->2, 5->1
            }
            
            physicalScore += value;
        });
        
        // Calculer le score physique moyen (1-5)
        physicalScore = physicalScore / physicalInputs.length;
        
        // Récupérer les valeurs des inputs mentaux
        const mentalInputs = document.querySelectorAll('.mentalInput');
        let mentalScore = 0;
        
        mentalInputs.forEach(input => {
            let value = parseInt(input.value);
            
            // Inverser la valeur pour les échelles inversées (ex: stress)
            if (input.classList.contains('reverse')) {
                value = 6 - value;
            }
            
            mentalScore += value;
        });
        
        // Calculer le score mental moyen (1-5)
        mentalScore = mentalScore / mentalInputs.length;
        
        // Créer l'objet d'état quotidien
        const dailyState = {
            date: new Date().toISOString(),
            physicalScore,
            mentalScore,
            physicalDetails: {
                energy: parseInt(document.getElementById('energyLevel').value),
                pain: 6 - parseInt(document.getElementById('painLevel').value), // Inverser
                flexibility: parseInt(document.getElementById('flexibilityLevel').value),
                recovery: parseInt(document.getElementById('recoveryLevel').value),
                sleep: parseInt(document.getElementById('sleepQuality').value)
            },
            mentalDetails: {
                mood: parseInt(document.getElementById('moodLevel').value),
                stress: 6 - parseInt(document.getElementById('stressLevel').value), // Inverser
                motivation: parseInt(document.getElementById('motivationLevel').value),
                focus: parseInt(document.getElementById('focusLevel').value),
                clarity: parseInt(document.getElementById('clarityLevel').value)
            }
        };
        
        // Déterminer le profil et les recommandations
        const profile = determineProfile(physicalScore, mentalScore);
        dailyState.profile = profile.id;
        
        // Générer des recommandations de séances
        const recommendations = generateRecommendations(profile, dailyState);
        dailyState.recommendedActivityTypes = recommendations.map(r => r.type);
        
        // Sauvegarder l'état quotidien
        try {
            currentDailyState = await userData.saveDailyState(dailyState);
            recommendedSessions = recommendations;
            
            // Afficher les résultats
            displayEvaluationResults(profile, recommendations);
        } catch (error) {
            console.error('Erreur lors de la sauvegarde de l\'état quotidien:', error);
            alert('Une erreur est survenue lors de la sauvegarde de l\'évaluation.');
        }
    }
    
    /**
     * Détermine le profil correspondant aux scores
     * @param {number} physicalScore - Score physique (1-5)
     * @param {number} mentalScore - Score mental (1-5)
     * @returns {Object} Profil correspondant
     */
    function determineProfile(physicalScore, mentalScore) {
        // Déterminer si les scores sont bas ou élevés (seuil à 3)
        const physicalLow = physicalScore < 3;
        const mentalLow = mentalScore < 3;
        
        // Déterminer le profil en fonction des combinaisons
        if (physicalLow && mentalLow) {
            return PROFILES.find(p => p.id === 'low-low');
        } else if (physicalLow && !mentalLow) {
            return PROFILES.find(p => p.id === 'low-high');
        } else if (!physicalLow && mentalLow) {
            return PROFILES.find(p => p.id === 'high-low');
        } else {
            return PROFILES.find(p => p.id === 'high-high');
        }
    }
    
    /**
     * Génère des recommandations de séances basées sur le profil
     * @param {Object} profile - Profil déterminé
     * @param {Object} dailyState - État quotidien
     * @returns {Array} Recommandations de séances
     */
    function generateRecommendations(profile, dailyState) {
        // Déterminer les types d'activités recommandés
        const activityTypes = profile.activityTypes;
        
        // Récupérer des informations sur ces types d'activités
        const activities = ACTIVITY_TYPES.filter(type => activityTypes.includes(type.id));
        
        // Générer des recommandations
        const recommendations = [];
        
        activities.forEach(activity => {
            // Déterminer la durée (dans la plage du profil)
            const minDuration = profile.duration[0];
            const maxDuration = profile.duration[1];
            const duration = minDuration + Math.floor(Math.random() * (maxDuration - minDuration + 1));
            
            // Créer la recommandation
            recommendations.push({
                type: activity.id,
                name: activity.name,
                icon: activity.icon,
                color: activity.color,
                title: generateSessionTitle(activity.id, profile.intensity),
                description: generateSessionDescription(activity.id, profile.intensity, dailyState),
                intensity: profile.intensity,
                duration: duration,
                benefits: generateSessionBenefits(activity.id, profile)
            });
        });
        
        return recommendations;
    }
    
    /**
     * Génère un titre pour une séance recommandée
     * @param {string} activityType - Type d'activité
     * @param {string} intensity - Intensité de la séance
     * @returns {string} Titre de la séance
     */
    function generateSessionTitle(activityType, intensity) {
        // Titres pour les différentes combinaisons
        const SESSION_TITLES = {
            pilates: {
                'Faible': 'Pilates doux et relaxant',
                'Modérée': 'Pilates équilibré',
                'Élevée': 'Pilates dynamique'
            },
            cardio: {
                'Faible': 'Cardio en douceur',
                'Modérée': 'Cardio progressif',
                'Élevée': 'Cardio intense'
            },
            equilibre: {
                'Faible': 'Équilibre fondamental',
                'Modérée': 'Équilibre intermédiaire',
                'Élevée': 'Équilibre avancé'
            },
            etirements: {
                'Faible': 'Étirements restaurateurs',
                'Modérée': 'Étirements complets',
                'Élevée': 'Étirements dynamiques'
            },
            chaise: {
                'Faible': 'Pilates sur chaise relaxant',
                'Modérée': 'Pilates sur chaise tonique',
                'Élevée': 'Pilates sur chaise avancé'
            },
            relaxation: {
                'Faible': 'Relaxation profonde',
                'Modérée': 'Relaxation et respiration',
                'Élevée': 'Méditation active'
            }
        };
        
        // Retourner le titre correspondant
        return SESSION_TITLES[activityType][intensity] || `Séance de ${activityType}`;
    }
    
    /**
     * Génère une description pour une séance recommandée
     * @param {string} activityType - Type d'activité
     * @param {string} intensity - Intensité de la séance
     * @param {Object} dailyState - État quotidien
     * @returns {string} Description de la séance
     */
    function generateSessionDescription(activityType, intensity, dailyState) {
        // Descriptions pour les différentes combinaisons
        const SESSION_DESCRIPTIONS = {
            pilates: {
                'Faible': 'Une séance douce pour détendre le corps tout en maintenant l\'engagement du corps central.',
                'Modérée': 'Une séance équilibrée qui renforce les muscles profonds et améliore la posture.',
                'Élevée': 'Une séance dynamique qui défie votre force et votre contrôle.'
            },
            cardio: {
                'Faible': 'Une séance douce pour stimuler la circulation sans fatigue excessive.',
                'Modérée': 'Une séance progressive qui alterne efforts et récupération.',
                'Élevée': 'Une séance intense pour développer votre endurance et votre puissance.'
            },
            equilibre: {
                'Faible': 'Des exercices de base pour renforcer la stabilité et la proprioception.',
                'Modérée': 'Des exercices variés pour développer l\'équilibre dans différentes positions.',
                'Élevée': 'Des défis d\'équilibre avancés qui intègrent force et coordination.'
            },
            etirements: {
                'Faible': 'Des étirements doux et prolongés pour détendre les muscles tendus.',
                'Modérée': 'Un ensemble complet d\'étirements pour améliorer la mobilité générale.',
                'Élevée': 'Des étirements dynamiques qui combinent souplesse et renforcement.'
            },
            chaise: {
                'Faible': 'Une séance accessible qui mobilise le corps en douceur avec le soutien d\'une chaise.',
                'Modérée': 'Des exercices variés sur chaise pour tonifier les muscles sans impact.',
                'Élevée': 'Des mouvements avancés sur chaise qui défient stabilité et force.'
            },
            relaxation: {
                'Faible': 'Une séance de relaxation profonde pour diminuer le stress et favoriser la récupération.',
                'Modérée': 'Une pratique de respiration consciente et de détente musculaire progressive.',
                'Élevée': 'Une méditation active qui intègre mouvement doux et pleine conscience.'
            }
        };
        
        // Personnaliser en fonction de l'état quotidien
        let personalization = '';
        
        if (dailyState.physicalDetails) {
            if (dailyState.physicalDetails.pain < 3) {
                personalization += ' Adaptée pour minimiser l\'inconfort.';
            }
            if (dailyState.physicalDetails.energy < 3) {
                personalization += ' Conçue pour préserver votre énergie.';
            }
            if (dailyState.physicalDetails.sleep < 3) {
                personalization += ' Idéale après une nuit de sommeil difficile.';
            }
        }
        
        if (dailyState.mentalDetails) {
            if (dailyState.mentalDetails.stress < 3) {
                personalization += ' Aide à réduire le stress.';
            }
            if (dailyState.mentalDetails.mood < 3) {
                personalization += ' Stimule la production d\'endorphines pour améliorer l\'humeur.';
            }
        }
        
        // Retourner la description
        return SESSION_DESCRIPTIONS[activityType][intensity] + personalization;
    }
    
    /**
     * Génère une liste de bénéfices pour une séance recommandée
     * @param {string} activityType - Type d'activité
     * @param {Object} profile - Profil déterminé
     * @returns {Array} Liste des bénéfices
     */
    function generateSessionBenefits(activityType, profile) {
        // Bénéfices spécifiques par type d'activité
        const ACTIVITY_BENEFITS = {
            pilates: [
                'Renforce les muscles profonds',
                'Améliore la posture',
                'Développe la conscience corporelle',
                'Augmente la stabilité du tronc'
            ],
            cardio: [
                'Améliore l\'endurance cardiovasculaire',
                'Stimule le métabolisme',
                'Améliore la circulation sanguine',
                'Libère des endorphines'
            ],
            equilibre: [
                'Développe la proprioception',
                'Renforce les muscles stabilisateurs',
                'Améliore la coordination',
                'Prévient les risques de chute'
            ],
            etirements: [
                'Augmente l\'amplitude de mouvement',
                'Réduit les tensions musculaires',
                'Améliore la circulation',
                'Favorise la relaxation'
            ],
            chaise: [
                'Accessible même en cas de mobilité réduite',
                'Renforce en douceur',
                'Améliore la posture assise',
                'Développe l\'équilibre du haut du corps'
            ],
            relaxation: [
                'Réduit le niveau de stress',
                'Abaisse la tension artérielle',
                'Améliore la qualité du sommeil',
                'Favorise la clarté mentale'
            ]
        };
        
        // Bénéfices spécifiques par profil
        const PROFILE_BENEFITS = {
            'low-low': [
                'Favorise la récupération',
                'Respecte votre niveau d\'énergie'
            ],
            'low-high': [
                'Canalise votre concentration',
                'Sollicite l\'esprit sans épuiser le corps'
            ],
            'high-low': [
                'Utilise votre énergie physique',
                'Stimule l\'humeur et la motivation'
            ],
            'high-high': [
                'Maximise votre potentiel du jour',
                'Offre un défi stimulant'
            ]
        };
        
        // Sélectionner aléatoirement 2 bénéfices spécifiques à l'activité
        const activityBenefits = ACTIVITY_BENEFITS[activityType] || [];
        shuffle(activityBenefits);
        const selectedActivityBenefits = activityBenefits.slice(0, 2);
        
        // Sélectionner 1 bénéfice spécifique au profil
        const selectedProfileBenefits = PROFILE_BENEFITS[profile.id] || [];
        shuffle(selectedProfileBenefits);
        const selectedProfileBenefit = selectedProfileBenefits.slice(0, 1);
        
        // Combiner les bénéfices
        return [...selectedActivityBenefits, ...selectedProfileBenefit];
    }
    
    /**
     * Mélange aléatoirement un tableau (algorithme de Fisher-Yates)
     * @param {Array} array - Tableau à mélanger
     */
    function shuffle(array) {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
        return array;
    }
    
    /**
     * Affiche les résultats de l'évaluation quotidienne
     * @param {Object} profile - Profil déterminé
     * @param {Array} recommendations - Recommandations de séances
     */
    function displayEvaluationResults(profile, recommendations) {
        const container = document.getElementById('todaySessionContainer');
        if (!container) return;
        
        container.innerHTML = `
            <div class="todaySessionHeader">
                <h1>Votre recommandation du jour</h1>
                <p class="todaySessionDescription">
                    Basée sur votre évaluation du ${new Date().toLocaleDateString('fr-FR')}.
                </p>
            </div>
            
            <div class="evaluationResults">
                <div class="profileCard" style="border-color: ${profile.color}">
                    <div class="profileIcon" style="background-color: ${profile.color}">
                        <i class="icon-${profile.icon}"></i>
                    </div>
                    <div class="profileInfo">
                        <h2 class="profileName">${profile.name}</h2>
                        <p class="profileDescription">${profile.description}</p>
                        <div class="profileRecommendation">${profile.recommendation}</div>
                    </div>
                </div>
                
                <div class="scoresVisualization">
                    <div class="scoreContainer">
                        <h3>État physique</h3>
                        <div class="scoreCircle" style="background: conic-gradient(var(--color-primary) 0%, var(--color-primary) ${currentDailyState.physicalScore * 20}%, #f0f0f0 ${currentDailyState.physicalScore * 20}%, #f0f0f0 100%)">
                            <div class="scoreValue">${currentDailyState.physicalScore.toFixed(1)}</div>
                        </div>
                    </div>
                    <div class="scoreContainer">
                        <h3>État mental</h3>
                        <div class="scoreCircle" style="background: conic-gradient(var(--color-secondary) 0%, var(--color-secondary) ${currentDailyState.mentalScore * 20}%, #f0f0f0 ${currentDailyState.mentalScore * 20}%, #f0f0f0 100%)">
                            <div class="scoreValue">${currentDailyState.mentalScore.toFixed(1)}</div>
                        </div>
                    </div>
                </div>
                
                <div class="recommendedSessions">
                    <h2>Séances recommandées</h2>
                    <p>Ces séances sont particulièrement adaptées à votre état du jour.</p>
                    
                    <div class="sessionsContainer">
                        ${recommendations.map((session, index) => `
                            <div class="sessionCard" style="border-left-color: ${session.color}">
                                <div class="sessionIcon" style="background-color: ${session.color}">
                                    <i class="icon-${session.icon}"></i>
                                </div>
                                <div class="sessionInfo">
                                    <h3 class="sessionTitle">${session.title}</h3>
                                    <p class="sessionDescription">${session.description}</p>
                                    <div class="sessionMetadata">
                                        <span class="sessionDuration">${session.duration} min</span>
                                        <span class="sessionIntensity">Intensité ${session.intensity}</span>
                                    </div>
                                    <div class="sessionBenefits">
                                        <h4>Bénéfices</h4>
                                        <ul>
                                            ${session.benefits.map(benefit => `<li>${benefit}</li>`).join('')}
                                        </ul>
                                    </div>
                                    <button class="btn btnPrimary startSessionBtn" data-session-index="${index}">
                                        Commencer cette séance
                                    </button>
                                </div>
                            </div>
                        `).join('')}
                    </div>
                </div>
                
                <div class="dailyActions">
                    <button class="btn btnOutline" id="reevaluateBtn">Réévaluer mon état</button>
                    <button class="btn btnSecondary" id="weeklyPlanBtn">Voir mon planning hebdomadaire</button>
                </div>
            </div>
        `;
        
        // Ajouter les écouteurs d'événements
        document.querySelectorAll('.startSessionBtn').forEach(button => {
            button.addEventListener('click', () => {
                const sessionIndex = parseInt(button.getAttribute('data-session-index'));
                startRecommendedSession(sessionIndex);
            });
        });
        
        document.getElementById('reevaluateBtn').addEventListener('click', displayEvaluationForm);
        document.getElementById('weeklyPlanBtn').addEventListener('click', () => {
            window.navigation.navigateToFeature('planner');
        });
    }
    
    /**
     * Affiche l'évaluation existante du jour
     */
    function displayExistingEvaluation() {
        if (!currentDailyState) return;
        
        // Récupérer le profil correspondant
        const profile = PROFILES.find(p => p.id === currentDailyState.profile) || PROFILES[0];
        
        // Récupérer ou générer les recommandations
        let recommendations = recommendedSessions;
        
        if (!recommendations || recommendations.length === 0) {
            recommendations = generateRecommendations(profile, currentDailyState);
            recommendedSessions = recommendations;
        }
        
        // Afficher les résultats
        displayEvaluationResults(profile, recommendations);
    }
    
    /**
     * Démarre une séance recommandée
     * @param {number} sessionIndex - Index de la séance dans le tableau de recommandations
     */
    function startRecommendedSession(sessionIndex) {
        if (!recommendedSessions || sessionIndex >= recommendedSessions.length) return;
        
        const session = recommendedSessions[sessionIndex];
        
        // Dans une implémentation réelle, on redirigerait vers la page de la séance
        // Pour l'exemple, on affiche juste un message
        alert(`Démarrage de la séance "${session.title}". Cette fonctionnalité sera disponible prochainement.`);
    }
    
    // API publique
    return {
        initialize,
        loadExistingEvaluation,
        displayEvaluationForm
    };
})();

// Initialisation au chargement du document
document.addEventListener('DOMContentLoaded', function() {
    todaySessionModule.initialize();
});

// Export du module pour utilisation dans d'autres fichiers
if (typeof module !== 'undefined' && module.exports) {
    module.exports = todaySessionModule;
}
