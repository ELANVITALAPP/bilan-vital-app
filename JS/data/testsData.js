// tests-data.js - Données des tests simplifiées
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
                }
            ]
        }
    ]
};
