// testsData.js - Version simplifiée contenant tous les tests originaux
const testsData = {
    categories: [
        {
            id: "stress-alim-sommeil",
            name: "Stress, Alimentation et Sommeil",
            icon: "zen-balance",
            description: "Évaluez votre niveau de stress, vos habitudes alimentaires et la qualité de votre sommeil",
            color: "#5A9367",
            tests: [
                {
                    id: "sommeil",
                    name: "Test de Sommeil",
                    description: "Évaluez la qualité de votre sommeil et identifiez d'éventuels troubles",
                    duration: "5-7",
                    difficulty: 1,
                    categoryId: "stress-alim-sommeil",
                    instructions: "Répondez aux questions suivantes en pensant à vos habitudes de sommeil des deux dernières semaines. Soyez le plus honnête possible.",
                    questions: [
                        {
                            id: "sommeil-1",
                            text: "Comment évalueriez-vous la qualité globale de votre sommeil ?",
                            type: "likert",
                            options: [
                                { value: 0, text: "Très bonne" },
                                { value: 1, text: "Plutôt bonne" },
                                { value: 2, text: "Plutôt mauvaise" },
                                { value: 3, text: "Très mauvaise" }
                            ]
                        },
                        {
                            id: "sommeil-2",
                            text: "Combien de temps mettez-vous généralement à vous endormir ?",
                            type: "likert",
                            options: [
                                { value: 0, text: "Moins de 15 minutes" },
                                { value: 1, text: "15-30 minutes" },
                                { value: 2, text: "31-60 minutes" },
                                { value: 3, text: "Plus de 60 minutes" }
                            ]
                        },
                        {
                            id: "sommeil-3",
                            text: "Quelle est la durée habituelle de votre sommeil par nuit ?",
                            type: "likert",
                            options: [
                                { value: 0, text: "Plus de 7 heures" },
                                { value: 1, text: "6-7 heures" },
                                { value: 2, text: "5-6 heures" },
                                { value: 3, text: "Moins de 5 heures" }
                            ]
                        },
                        {
                            id: "sommeil-4",
                            text: "À quelle fréquence vous réveillez-vous pendant la nuit ?",
                            type: "likert",
                            options: [
                                { value: 0, text: "Jamais ou rarement" },
                                { value: 1, text: "Moins d'une fois par semaine" },
                                { value: 2, text: "1-2 fois par semaine" },
                                { value: 3, text: "3 fois par semaine ou plus" }
                            ]
                        },
                        {
                            id: "sommeil-5",
                            text: "Vous sentez-vous reposé(e) au réveil ?",
                            type: "likert",
                            options: [
                                { value: 0, text: "Oui, presque toujours" },
                                { value: 1, text: "Souvent" },
                                { value: 2, text: "Parfois" },
                                { value: 3, text: "Rarement ou jamais" }
                            ]
                        },
                        {
                            id: "sommeil-6",
                            text: "Prenez-vous des médicaments pour dormir ?",
                            type: "likert",
                            options: [
                                { value: 0, text: "Jamais" },
                                { value: 1, text: "Moins d'une fois par semaine" },
                                { value: 2, text: "1-2 fois par semaine" },
                                { value: 3, text: "3 fois par semaine ou plus" }
                            ]
                        },
                        {
                            id: "sommeil-7",
                            text: "Avez-vous des difficultés à rester éveillé(e) pendant la journée ?",
                            type: "likert",
                            options: [
                                { value: 0, text: "Jamais" },
                                { value: 1, text: "Moins d'une fois par semaine" },
                                { value: 2, text: "1-2 fois par semaine" },
                                { value: 3, text: "3 fois par semaine ou plus" }
                            ]
                        }
                    ]
                },
                {
                    id: "alimentation",
                    name: "Test de Qualité Alimentaire",
                    description: "Évaluez vos habitudes alimentaires et la qualité nutritionnelle de votre alimentation",
                    duration: "5-7",
                    difficulty: 1,
                    categoryId: "stress-alim-sommeil",
                    instructions: "Répondez aux questions suivantes en pensant à vos habitudes alimentaires habituelles. Soyez le plus honnête possible.",
                    questions: [
                        {
                            id: "alim-1",
                            text: "Combien de portions de fruits et légumes consommez-vous par jour en moyenne ?",
                            type: "multiple-choice",
                            options: [
                                { value: 0, text: "Moins d'une portion", score: 0 },
                                { value: 5, text: "1-2 portions", score: 5 },
                                { value: 10, text: "3-4 portions", score: 10 },
                                { value: 15, text: "5 portions ou plus", score: 15 }
                            ],
                            maxScore: 15
                        },
                        {
                            id: "alim-2",
                            text: "À quelle fréquence consommez-vous des aliments ultra-transformés (plats préparés, snacks industriels) ?",
                            type: "multiple-choice",
                            options: [
                                { value: 15, text: "Rarement ou jamais", score: 15 },
                                { value: 10, text: "1-2 fois par semaine", score: 10 },
                                { value: 5, text: "3-5 fois par semaine", score: 5 },
                                { value: 0, text: "Quotidiennement", score: 0 }
                            ],
                            maxScore: 15
                        },
                        {
                            id: "alim-3",
                            text: "Combien de repas prenez-vous par jour habituellement ?",
                            type: "multiple-choice",
                            options: [
                                { value: 5, text: "1 repas", score: 5 },
                                { value: 10, text: "2 repas", score: 10 },
                                { value: 15, text: "3 repas ou plus, réguliers", score: 15 },
                                { value: 5, text: "Pas de structure régulière", score: 5 }
                            ],
                            maxScore: 15
                        },
                        {
                            id: "alim-4",
                            text: "À quelle fréquence consommez-vous des boissons sucrées ?",
                            type: "multiple-choice",
                            options: [
                                { value: 15, text: "Rarement ou jamais", score: 15 },
                                { value: 10, text: "1-2 fois par semaine", score: 10 },
                                { value: 5, text: "3-5 fois par semaine", score: 5 },
                                { value: 0, text: "Quotidiennement", score: 0 }
                            ],
                            maxScore: 15
                        },
                        {
                            id: "alim-5",
                            text: "À quelle fréquence consommez-vous des protéines végétales (légumineuses, tofu, etc.) ?",
                            type: "multiple-choice",
                            options: [
                                { value: 15, text: "Plusieurs fois par jour", score: 15 },
                                { value: 10, text: "Quotidiennement", score: 10 },
                                { value: 5, text: "1-3 fois par semaine", score: 5 },
                                { value: 0, text: "Rarement ou jamais", score: 0 }
                            ],
                            maxScore: 15
                        },
                        {
                            id: "alim-6",
                            text: "Comment évalueriez-vous votre hydratation quotidienne ?",
                            type: "multiple-choice",
                            options: [
                                { value: 15, text: "Plus de 1,5L d'eau par jour", score: 15 },
                                { value: 10, text: "1-1,5L d'eau par jour", score: 10 },
                                { value: 5, text: "0,5-1L d'eau par jour", score: 5 },
                                { value: 0, text: "Moins de 0,5L d'eau par jour", score: 0 }
                            ],
                            maxScore: 15
                        },
                        {
                            id: "alim-7",
                            text: "À quelle fréquence grignotez-vous entre les repas ?",
                            type: "multiple-choice",
                            options: [
                                { value: 10, text: "Jamais", score: 10 },
                                { value: 5, text: "Occasionnellement", score: 5 },
                                { value: 0, text: "Quotidiennement", score: 0 }
                            ],
                            maxScore: 10
                        }
                    ]
                },
                {
                    id: "anxiete",
                    name: "Test d'Anxiété",
                    description: "Évaluez votre niveau d'anxiété et identifiez les facteurs de stress",
                    duration: "5-10",
                    difficulty: 1,
                    categoryId: "stress-alim-sommeil",
                    instructions: "Répondez aux questions en indiquant à quelle fréquence vous avez ressenti ces symptômes au cours des deux dernières semaines.",
                    questions: [
                        {
                            id: "anx-1",
                            text: "Je me sens nerveux(se), anxieux(se) ou à bout",
                            type: "likert"
                        },
                        {
                            id: "anx-2",
                            text: "Je n'arrive pas à arrêter ou à contrôler mes inquiétudes",
                            type: "likert"
                        },
                        {
                            id: "anx-3",
                            text: "Je m'inquiète trop à propos de différentes choses",
                            type: "likert"
                        },
                        {
                            id: "anx-4",
                            text: "J'ai du mal à me détendre",
                            type: "likert"
                        },
                        {
                            id: "anx-5",
                            text: "Je suis si agité(e) qu'il est difficile de rester assis(e)",
                            type: "likert"
                        },
                        {
                            id: "anx-6",
                            text: "Je deviens facilement contrarié(e) ou irritable",
                            type: "likert"
                        },
                        {
                            id: "anx-7",
                            text: "J'ai peur que quelque chose d'horrible puisse arriver",
                            type: "likert"
                        }
                    ]
                },
                {
                    id: "qualite-vie",
                    name: "Qualité de Vie",
                    description: "Évaluez votre qualité de vie globale et votre bien-être",
                    duration: "6-8",
                    difficulty: 1,
                    categoryId: "stress-alim-sommeil",
                    instructions: "Évaluez votre qualité de vie dans les différents domaines suivants.",
                    questions: [
                        {
                            id: "qdv-1",
                            text: "Comment évaluez-vous votre qualité de vie globale ?",
                            type: "slider",
                            minLabel: "Très mauvaise",
                            maxLabel: "Excellente"
                        },
                        {
                            id: "qdv-2",
                            text: "Êtes-vous satisfait(e) de votre santé ?",
                            type: "slider",
                            minLabel: "Pas du tout satisfait(e)",
                            maxLabel: "Très satisfait(e)"
                        },
                        {
                            id: "qdv-3",
                            text: "Dans quelle mesure vos douleurs physiques vous empêchent-elles de faire ce dont vous avez besoin ?",
                            type: "slider",
                            minLabel: "Pas du tout",
                            maxLabel: "Complètement"
                        },
                        {
                            id: "qdv-4",
                            text: "Avez-vous suffisamment d'énergie pour votre vie quotidienne ?",
                            type: "slider",
                            minLabel: "Pas du tout",
                            maxLabel: "Complètement"
                        },
                        {
                            id: "qdv-5",
                            text: "Êtes-vous satisfait(e) de votre capacité à accomplir vos activités quotidiennes ?",
                            type: "slider",
                            minLabel: "Pas du tout satisfait(e)",
                            maxLabel: "Très satisfait(e)"
                        }
                    ]
                }
            ]
        },
        {
            id: "personnalite-sante",
            name: "Personnalité et Santé",
            icon: "silhouette",
            description: "Découvrez comment votre personnalité influence votre approche de la santé et du bien-être",
            color: "#4A8D5B",
            tests: [
                {
                    id: "limitations",
                    name: "Limitations Physiques",
                    description: "Évaluez vos limitations physiques et leur impact sur votre vie quotidienne",
                    duration: "4-6",
                    difficulty: 1,
                    categoryId: "personnalite-sante",
                    instructions: "Indiquez dans quelle mesure ces activités sont limitées par votre état de santé actuel.",
                    questions: [
                        {
                            id: "lim-1",
                            text: "Monter plusieurs étages par l'escalier",
                            type: "likert"
                        },
                        {
                            id: "lim-2",
                            text: "Se pencher, s'agenouiller ou s'accroupir",
                            type: "likert"
                        },
                        {
                            id: "lim-3",
                            text: "Marcher plus d'un kilomètre",
                            type: "likert"
                        },
                        {
                            id: "lim-4",
                            text: "Soulever ou porter des courses",
                            type: "likert"
                        },
                        {
                            id: "lim-5",
                            text: "Prendre un bain ou s'habiller",
                            type: "likert"
                        }
                    ]
                },
                {
                    id: "image-corps",
                    name: "Image Corporelle",
                    description: "Évaluez votre perception et satisfaction concernant votre corps",
                    duration: "5-7",
                    difficulty: 1,
                    categoryId: "personnalite-sante",
                    instructions: "Indiquez votre niveau d'accord avec les affirmations suivantes concernant votre corps.",
                    questions: [
                        {
                            id: "img-1",
                            text: "Je suis satisfait(e) de mon apparence générale",
                            type: "likert"
                        },
                        {
                            id: "img-2",
                            text: "Je pense souvent à modifier mon apparence",
                            type: "likert"
                        },
                        {
                            id: "img-3",
                            text: "Je suis à l'aise avec mon poids actuel",
                            type: "likert"
                        },
                        {
                            id: "img-4",
                            text: "Je compare souvent mon apparence à celle des autres",
                            type: "likert"
                        },
                        {
                            id: "img-5",
                            text: "Je me sens bien dans mon corps pendant l'activité physique",
                            type: "likert"
                        }
                    ]
                },
                {
                    id: "personnalite",
                    name: "Traits de personnalité",
                    description: "Identifiez vos principaux traits de personnalité et leur impact sur votre bien-être",
                    duration: "8-10",
                    difficulty: 1,
                    categoryId: "personnalite-sante",
                    instructions: "Indiquez à quel point ces affirmations vous correspondent.",
                    questions: [
                        {
                            id: "perso-1",
                            text: "Je me considère comme extraverti(e), sociable",
                            type: "slider",
                            minLabel: "Pas du tout d'accord",
                            maxLabel: "Tout à fait d'accord"
                        },
                        {
                            id: "perso-2",
                            text: "Je suis généralement optimiste face aux situations difficiles",
                            type: "likert"
                        },
                        {
                            id: "perso-3",
                            text: "J'ai tendance à planifier à l'avance plutôt qu'à improviser",
                            type: "likert"
                        },
                        {
                            id: "perso-4",
                            text: "Je me sens souvent submergé(e) par mes émotions",
                            type: "likert"
                        },
                        {
                            id: "perso-5",
                            text: "Je suis ouvert(e) aux nouvelles expériences et au changement",
                            type: "likert"
                        }
                    ]
                },
                {
                    id: "estime-soi",
                    name: "Estime de soi",
                    description: "Évaluez votre niveau d'estime de soi et de confiance personnelle",
                    duration: "5-8",
                    difficulty: 1,
                    categoryId: "personnalite-sante",
                    instructions: "Indiquez votre niveau d'accord avec les affirmations suivantes.",
                    questions: [
                        {
                            id: "est-1",
                            text: "Dans l'ensemble, je suis satisfait(e) de moi-même",
                            type: "likert"
                        },
                        {
                            id: "est-2",
                            text: "Je pense avoir plusieurs qualités",
                            type: "likert"
                        },
                        {
                            id: "est-3",
                            text: "J'ai tendance à penser que je suis un(e) raté(e)",
                            type: "likert"
                        },
                        {
                            id: "est-4",
                            text: "Je suis capable de faire les choses aussi bien que la plupart des gens",
                            type: "likert"
                        },
                        {
                            id: "est-5",
                            text: "J'ai une attitude positive envers moi-même",
                            type: "likert"
                        }
                    ]
                }
            ]
        },
        {
            id: "tests-physiques",
            name: "Tests Physiques",
            icon: "movement",
            description: "Évaluez vos capacités physiques : force, souplesse, équilibre et endurance",
            color: "#00813F",
            tests: [
                {
                    id: "force-jambes",
                    name: "Test de Force Membres Inférieurs",
                    description: "Évaluez la force et l'endurance de vos jambes",
                    duration: "2",
                    difficulty: 2,
                    categoryId: "tests-physiques",
                    instructions: "Asseyez-vous sur une chaise stable avec les pieds à plat sur le sol. Croisez les bras sur la poitrine. Au signal, levez-vous complètement puis rasseyez-vous autant de fois que possible pendant 30 secondes.",
                    isPhysical: true,
                    videoUrl: "assets/videos/test-force-jambes.mp4",
                    timerDuration: 30,
                    questions: [
                        {
                            id: "force-jambes-1",
                            text: "Nombre de levers complets réalisés en 30 secondes",
                            type: "multiple-choice",
                            options: [
                                { text: "0-5", score: 1 },
                                { text: "6-10", score: 2 },
                                { text: "11-15", score: 3 },
                                { text: "16-20", score: 4 },
                                { text: "Plus de 20", score: 5 }
                            ],
                            maxScore: 5
                        }
                    ]
                },
                {
                    id: "souplesse-epaules",
                    name: "Souplesse des épaules",
                    description: "Évaluez la souplesse de vos épaules et de votre ceinture scapulaire",
                    duration: "3-5",
                    difficulty: 1,
                    categoryId: "tests-physiques",
                    instructions: "Tenez-vous debout. Avec une main, passez par-dessus l'épaule et essayez de toucher le haut du dos. Avec l'autre main, remontez depuis le bas du dos. Essayez de faire se toucher les doigts des deux mains.",
                    isPhysical: true,
                    videoUrl: "assets/videos/test-souplesse-epaules.mp4",
                    questions: [
                        {
                            id: "souplesse-epaules-1",
                            text: "Comment évaluez-vous votre performance pour ce test ?",
                            type: "multiple-choice",
                            options: [
                                { text: "Je n'arrive pas à rapprocher mes mains", score: 1 },
                                { text: "Mes doigts sont à plus de 10 cm l'un de l'autre", score: 2 },
                                { text: "Mes doigts sont à moins de 10 cm l'un de l'autre", score: 3 },
                                { text: "Mes doigts se touchent", score: 4 },
                                { text: "Mes doigts se chevauchent", score: 5 }
                            ],
                            maxScore: 5
                        }
                    ]
                },
                {
                    id: "souplesse-dos",
                    name: "Souplesse du dos",
                    description: "Évaluez la souplesse de votre colonne vertébrale et de l'arrière de vos jambes",
                    duration: "3-5",
                    difficulty: 1,
                    categoryId: "tests-physiques",
                    instructions: "Asseyez-vous au bord d'une chaise, jambes tendues devant vous. Penchez-vous vers l'avant en essayant de toucher vos orteils.",
                    isPhysical: true,
                    videoUrl: "assets/videos/test-souplesse-dos.mp4",
                    questions: [
                        {
                            id: "souplesse-dos-1",
                            text: "Jusqu'où arrivez-vous à vous pencher ?",
                            type: "multiple-choice",
                            options: [
                                { text: "Je n'arrive pas à me pencher", score: 1 },
                                { text: "J'arrive à mes genoux", score: 2 },
                                { text: "J'arrive à mi-mollet", score: 3 },
                                { text: "J'arrive à mes chevilles", score: 4 },
                                { text: "J'arrive à toucher mes orteils", score: 5 }
                            ],
                            maxScore: 5
                        }
                    ]
                },
                {
                    id: "equilibre-statique",
                    name: "Équilibre statique",
                    description: "Évaluez votre capacité à maintenir l'équilibre sur une jambe",
                    duration: "3-5",
                    difficulty: 2,
                    categoryId: "tests-physiques",
                    instructions: "Tenez-vous debout sur une jambe, les yeux ouverts, en soulevant l'autre jambe du sol. Placez les mains sur les hanches. Maintenez cette position aussi longtemps que possible.",
                    isPhysical: true,
                    videoUrl: "assets/videos/test-equilibre-statique.mp4",
                    timerDuration: 60,
                    questions: [
                        {
                            id: "equilibre-statique-1",
                            text: "Combien de temps avez-vous maintenu la position (en secondes) ?",
                            type: "multiple-choice",
                            options: [
                                { text: "Moins de 10 secondes", score: 1 },
                                { text: "10-20 secondes", score: 2 },
                                { text: "21-30 secondes", score: 3 },
                                { text: "31-45 secondes", score: 4 },
                                { text: "Plus de 45 secondes", score: 5 }
                            ],
                            maxScore: 5
                        }
                    ]
                },
                {
                    id: "endurance",
                    name: "Test d'endurance",
                    description: "Évaluez votre endurance cardiovasculaire",
                    duration: "3-6",
                    difficulty: 3,
                    categoryId: "tests-physiques",
                    instructions: "Montez et descendez d'une marche d'escalier (ou d'un step) pendant 3 minutes à un rythme régulier. Puis, mesurez votre fréquence cardiaque juste après l'exercice.",
                    isPhysical: true,
                    videoUrl: "assets/videos/test-endurance.mp4",
                    timerDuration: 180,
                    questions: [
                        {
                            id: "endurance-1",
                            text: "Comment vous sentez-vous après ce test ?",
                            type: "multiple-choice",
                            options: [
                                { text: "Très essoufflé(e), j'ai dû m'arrêter avant la fin", score: 1 },
                                { text: "Essoufflé(e), j'ai eu du mal à maintenir le rythme", score: 2 },
                                { text: "Légèrement essoufflé(e), mais j'ai pu maintenir le rythme", score: 3 },
                                { text: "Peu essoufflé(e), j'ai trouvé cela facile", score: 4 },
                                { text: "Pas du tout essoufflé(e), j'aurais pu continuer plus longtemps", score: 5 }
                            ],
                            maxScore: 5
                        }
                    ]
                }
            ]
        }
    ],
    
    specialFeatures: [
        {
            id: "bilan",
            name: "Bilan récapitulatif",
            description: "Visualisez l'ensemble de vos résultats et suivez votre progression",
            icon: "chart-dashboard",
            color: "#006633"
        },
        {
            id: "planner",
            name: "Planifier ma semaine",
            description: "Créez un programme d'activités adapté à vos disponibilités",
            icon: "calendar",
            color: "#007F5F"
        },
        {
            id: "todaySession",
            name: "Quelle séance aujourd'hui?",
            description: "Recevez une recommandation adaptée à votre état du jour",
            icon: "compass",
            color: "#00A36C"
        }
    ]
};
