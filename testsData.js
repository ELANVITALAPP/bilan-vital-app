// testsData.js - Données des tests complètes
// Utiliser une structure globale au lieu d'import/export
const testsData = {
    categories: [
        {
            id: "cat1",
            name: "Stress, Alimentation et Sommeil",
            description: "Évaluez votre niveau de stress, vos habitudes alimentaires et la qualité de votre sommeil.",
            tests: [
                {
                    id: "stress",
                    name: "Niveau de stress",
                    description: "Évaluez votre niveau de stress actuel et identifiez vos principaux facteurs de stress.",
                    duration: "5-7",
                    questions: [
                        {
                            text: "À quelle fréquence vous sentez-vous nerveux(se) ou stressé(e) ?",
                            type: "likert"
                        },
                        {
                            text: "Avez-vous des difficultés à vous détendre ?",
                            type: "likert"
                        },
                        {
                            text: "À quelle fréquence vous sentez-vous irritable ou impatient(e) ?",
                            type: "likert"
                        },
                        {
                            text: "Ressentez-vous des tensions musculaires (cou, épaules, dos) ?",
                            type: "likert"
                        },
                        {
                            text: "Avez-vous des difficultés à vous concentrer en raison du stress ?",
                            type: "likert"
                        }
                    ]
                },
                {
                    id: "sleep",
                    name: "Qualité du sommeil",
                    description: "Évaluez la qualité de votre sommeil et identifiez d'éventuels problèmes.",
                    duration: "3-5",
                    questions: [
                        {
                            text: "Combien d'heures dormez-vous en moyenne par nuit ?",
                            type: "multiple-choice",
                            options: [
                                { text: "Moins de 5 heures", score: 1 },
                                { text: "5-6 heures", score: 2 },
                                { text: "6-7 heures", score: 3 },
                                { text: "7-8 heures", score: 4 },
                                { text: "Plus de 8 heures", score: 5 }
                            ],
                            maxScore: 5
                        },
                        {
                            text: "Combien de temps mettez-vous généralement à vous endormir ?",
                            type: "multiple-choice",
                            options: [
                                { text: "Moins de 15 minutes", score: 5 },
                                { text: "15-30 minutes", score: 4 },
                                { text: "30-45 minutes", score: 3 },
                                { text: "45-60 minutes", score: 2 },
                                { text: "Plus de 60 minutes", score: 1 }
                            ],
                            maxScore: 5
                        },
                        {
                            text: "À quelle fréquence vous réveillez-vous pendant la nuit ?",
                            type: "likert"
                        },
                        {
                            text: "À quel point vous sentez-vous reposé(e) au réveil ?",
                            type: "slider",
                            minLabel: "Pas du tout reposé(e)",
                            maxLabel: "Parfaitement reposé(e)"
                        },
                        {
                            text: "À quelle fréquence vous sentez-vous somnolent(e) pendant la journée ?",
                            type: "likert"
                        }
                    ]
                },
                {
                    id: "alimentation",
                    name: "Habitudes alimentaires",
                    description: "Évaluez vos habitudes alimentaires et identifiez des pistes d'amélioration.",
                    duration: "4-6",
                    questions: [
                        {
                            text: "Combien de portions de fruits et légumes consommez-vous par jour ?",
                            type: "multiple-choice",
                            options: [
                                { text: "Moins d'une portion", score: 1 },
                                { text: "1-2 portions", score: 2 },
                                { text: "3-4 portions", score: 3 },
                                { text: "5-6 portions", score: 4 },
                                { text: "Plus de 6 portions", score: 5 }
                            ],
                            maxScore: 5
                        },
                        {
                            text: "À quelle fréquence consommez-vous des aliments transformés ou des fast-foods ?",
                            type: "multiple-choice",
                            options: [
                                { text: "Quotidiennement", score: 1 },
                                { text: "4-6 fois par semaine", score: 2 },
                                { text: "2-3 fois par semaine", score: 3 },
                                { text: "Une fois par semaine", score: 4 },
                                { text: "Rarement ou jamais", score: 5 }
                            ],
                            maxScore: 5
                        },
                        {
                            text: "Prenez-vous le temps de bien mâcher vos aliments ?",
                            type: "likert"
                        },
                        {
                            text: "À quelle fréquence prenez-vous vos repas devant un écran ?",
                            type: "likert"
                        },
                        {
                            text: "À quel point êtes-vous attentif(ve) à votre sensation de faim et de satiété ?",
                            type: "slider",
                            minLabel: "Jamais attentif(ve)",
                            maxLabel: "Toujours attentif(ve)"
                        }
                    ]
                }
            ]
        },
        {
            id: "cat2",
            name: "Personnalité et Santé",
            description: "Découvrez les aspects de votre personnalité qui influencent votre bien-être.",
            tests: [
                {
                    id: "personality",
                    name: "Traits de personnalité",
                    description: "Identifiez vos principaux traits de personnalité et leur impact sur votre bien-être.",
                    duration: "8-10",
                    questions: [
                        {
                            text: "Je préfère les activités sociales aux moments de solitude.",
                            type: "slider",
                            minLabel: "Pas du tout d'accord",
                            maxLabel: "Tout à fait d'accord"
                        },
                        {
                            text: "Je suis généralement optimiste face aux situations difficiles.",
                            type: "likert"
                        },
                        {
                            text: "J'ai tendance à planifier à l'avance plutôt qu'à improviser.",
                            type: "likert"
                        },
                        {
                            text: "Je me sens souvent submergé(e) par mes émotions.",
                            type: "likert"
                        },
                        {
                            text: "Je suis ouvert(e) aux nouvelles expériences et au changement.",
                            type: "likert"
                        }
                    ]
                },
                {
                    id: "mindfulness",
                    name: "Présence et Pleine Conscience",
                    description: "Évaluez votre niveau de pleine conscience et votre capacité à vivre le moment présent.",
                    duration: "5-7",
                    questions: [
                        {
                            text: "Je remarque facilement les sensations physiques comme le vent dans mes cheveux ou le soleil sur mon visage.",
                            type: "likert"
                        },
                        {
                            text: "Je fais attention à mes émotions sans me laisser submerger par elles.",
                            type: "likert"
                        },
                        {
                            text: "Je réalise souvent des actions en pilote automatique sans vraiment y prêter attention.",
                            type: "likert"
                        },
                        {
                            text: "Je peux facilement mettre des mots sur mes sentiments.",
                            type: "likert"
                        },
                        {
                            text: "Je reste concentré(e) sur le moment présent plutôt que de penser au passé ou au futur.",
                            type: "slider",
                            minLabel: "Jamais",
                            maxLabel: "Toujours"
                        }
                    ]
                }
            ]
        },
        {
            id: "cat3",
            name: "Tests Physiques",
            description: "Évaluez votre condition physique à travers des tests simples.",
            tests: [
                {
                    id: "flexibility",
                    name: "Flexibilité",
                    description: "Évaluez votre flexibilité corporelle à travers des exercices simples.",
                    duration: "10-15",
                    questions: [
                        {
                            text: "Comment évaluez-vous votre flexibilité générale ?",
                            type: "slider",
                            minLabel: "Très rigide",
                            maxLabel: "Très flexible"
                        },
                        {
                            text: "Pouvez-vous toucher vos orteils en gardant les jambes tendues ?",
                            type: "multiple-choice",
                            options: [
                                { text: "Pas du tout", score: 1 },
                                { text: "J'arrive à mes mollets", score: 2 },
                                { text: "J'arrive à mes chevilles", score: 3 },
                                { text: "Je touche à peine mes orteils", score: 4 },
                                { text: "Je peux aller plus loin que mes orteils", score: 5 }
                            ],
                            maxScore: 5
                        },
                        {
                            text: "Éprouvez-vous des difficultés pour vous pencher sur le côté ?",
                            type: "likert"
                        },
                        {
                            text: "Comment évaluez-vous la souplesse de votre cou ?",
                            type: "slider",
                            minLabel: "Très limité",
                            maxLabel: "Très souple"
                        },
                        {
                            text: "Ressentez-vous des tensions ou des douleurs lors des étirements ?",
                            type: "likert"
                        }
                    ]
                },
                {
                    id: "balance",
                    name: "Équilibre",
                    description: "Évaluez votre équilibre corporel à travers des exercices simples.",
                    duration: "8-10",
                    questions: [
                        {
                            text: "Comment évaluez-vous votre équilibre général ?",
                            type: "slider",
                            minLabel: "Très instable",
                            maxLabel: "Très stable"
                        },
                        {
                            text: "Combien de temps pouvez-vous tenir en équilibre sur un pied ?",
                            type: "multiple-choice",
                            options: [
                                { text: "Moins de 10 secondes", score: 1 },
                                { text: "10-20 secondes", score: 2 },
                                { text: "20-30 secondes", score: 3 },
                                { text: "30-60 secondes", score: 4 },
                                { text: "Plus d'une minute", score: 5 }
                            ],
                            maxScore: 5
                        },
                        {
                            text: "Vous sentez-vous parfois instable lors de vos déplacements ?",
                            type: "likert"
                        },
                        {
                            text: "Avez-vous des difficultés à vous déplacer sur des surfaces inégales ?",
                            type: "likert"
                        },
                        {
                            text: "Comment évaluez-vous votre capacité à changer rapidement de direction ?",
                            type: "slider",
                            minLabel: "Très difficile",
                            maxLabel: "Très facile"
                        }
                    ]
                },
                {
                    id: "endurance",
                    name: "Endurance cardiovasculaire",
                    description: "Évaluez votre endurance cardiovasculaire.",
                    duration: "10-15",
                    questions: [
                        {
                            text: "Comment évaluez-vous votre niveau d'endurance actuel ?",
                            type: "slider",
                            minLabel: "Très faible",
                            maxLabel: "Très élevé"
                        },
                        {
                            text: "À quelle fréquence pratiquez-vous une activité cardiovasculaire (marche rapide, course, natation, etc.) ?",
                            type: "multiple-choice",
                            options: [
                                { text: "Jamais", score: 1 },
                                { text: "1 fois par mois", score: 2 },
                                { text: "1 fois par semaine", score: 3 },
                                { text: "2-3 fois par semaine", score: 4 },
                                { text: "4 fois ou plus par semaine", score: 5 }
                            ],
                            maxScore: 5
                        },
                        {
                            text: "Vous essoufflez-vous rapidement dans les escaliers ?",
                            type: "likert"
                        },
                        {
                            text: "Comment évaluez-vous votre récupération après un effort physique ?",
                            type: "slider",
                            minLabel: "Très lente",
                            maxLabel: "Très rapide"
                        },
                        {
                            text: "Ressentez-vous des douleurs thoraciques lors d'efforts physiques ?",
                            type: "likert"
                        }
                    ]
                }
            ]
        }
    ]
};
