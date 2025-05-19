// testsData.js - Version complète avec interprétations améliorées
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
            id: "motivations",
            name: "Motivations",
            icon: "target",
            description: "Identifiez vos motivations, objectifs et les leviers de votre engagement",
            color: "#3A8748",
            tests: [
                {
                    id: "motivation-sante",
                    name: "Motivation pour la Santé",
                    description: "Évaluez vos motivations pour prendre soin de votre santé",
                    duration: "5-7",
                    difficulty: 1,
                    categoryId: "motivations",
                    instructions: "Indiquez votre niveau d'accord avec ces affirmations concernant vos motivations pour prendre soin de votre santé.",
                    questions: [
                        {
                            id: "motiv-1",
                            text: "Je prends soin de ma santé parce que j'y prends plaisir",
                            type: "likert"
                        },
                        {
                            id: "motiv-2",
                            text: "Je prends soin de ma santé parce que c'est important pour atteindre mes objectifs de vie",
                            type: "likert"
                        },
                        {
                            id: "motiv-3",
                            text: "Je prends soin de ma santé pour éviter de décevoir mon entourage",
                            type: "likert"
                        },
                        {
                            id: "motiv-4",
                            text: "Je prends soin de ma santé car je me sentirais coupable de ne pas le faire",
                            type: "likert"
                        },
                        {
                            id: "motiv-5",
                            text: "Je ne vois pas l'intérêt de prendre soin de ma santé",
                            type: "likert"
                        }
                    ]
                },
                {
                    id: "objectifs",
                    name: "Objectifs de Santé",
                    description: "Clarifiez vos objectifs en matière de santé et de bien-être",
                    duration: "6-8",
                    difficulty: 1,
                    categoryId: "motivations",
                    instructions: "Évaluez l'importance des objectifs suivants pour vous.",
                    questions: [
                        {
                            id: "obj-1",
                            text: "Améliorer ma forme physique générale",
                            type: "slider",
                            minLabel: "Pas important",
                            maxLabel: "Très important"
                        },
                        {
                            id: "obj-2",
                            text: "Perdre du poids ou modifier ma composition corporelle",
                            type: "slider",
                            minLabel: "Pas important",
                            maxLabel: "Très important"
                        },
                        {
                            id: "obj-3",
                            text: "Réduire mon stress ou améliorer mon bien-être mental",
                            type: "slider",
                            minLabel: "Pas important",
                            maxLabel: "Très important"
                        },
                        {
                            id: "obj-4",
                            text: "Améliorer ma posture et ma mobilité",
                            type: "slider",
                            minLabel: "Pas important",
                            maxLabel: "Très important"
                        },
                        {
                            id: "obj-5",
                            text: "Prévenir ou gérer une condition de santé spécifique",
                            type: "slider",
                            minLabel: "Pas important",
                            maxLabel: "Très important"
                        }
                    ]
                },
                {
                    id: "pratique-passee",
                    name: "Pratique d'Activité Physique Passée",
                    description: "Évaluez votre historique d'activité physique",
                    duration: "4-6",
                    difficulty: 1,
                    categoryId: "motivations",
                    instructions: "Répondez aux questions suivantes concernant votre pratique d'activité physique passée.",
                    questions: [
                        {
                            id: "prat-1",
                            text: "Avez-vous pratiqué régulièrement une activité physique au cours de votre vie ?",
                            type: "multiple-choice",
                            options: [
                                { text: "Non, jamais", score: 1 },
                                { text: "Oui, pendant l'enfance/adolescence uniquement", score: 2 },
                                { text: "Oui, à l'âge adulte mais pas récemment", score: 3 },
                                { text: "Oui, et jusqu'à récemment", score: 4 }
                            ],
                            maxScore: 4
                        },
                        {
                            id: "prat-2",
                            text: "Quels types d'activités physiques avez-vous pratiqués dans le passé ?",
                            type: "multiple-choice",
                            options: [
                                { text: "Aucune activité régulière", score: 1 },
                                { text: "Activités d'endurance (marche, course, natation...)", score: 2 },
                                { text: "Activités de force ou musculation", score: 2 },
                                { text: "Sports collectifs", score: 2 },
                                { text: "Activités de souplesse (yoga, pilates...)", score: 2 },
                                { text: "Plusieurs types d'activités différentes", score: 3 }
                            ],
                            maxScore: 3
                        },
                        {
                            id: "prat-3",
                            text: "Quelle a été la durée de votre plus longue période de pratique régulière ?",
                            type: "multiple-choice",
                            options: [
                                { text: "Je n'ai jamais pratiqué régulièrement", score: 1 },
                                { text: "Quelques semaines à quelques mois", score: 2 },
                                { text: "1 à 2 ans", score: 3 },
                                { text: "Plus de 2 ans", score: 4 }
                            ],
                            maxScore: 4
                        },
                        {
                            id: "prat-4",
                            text: "Combien de temps s'est écoulé depuis votre dernière période d'activité physique régulière ?",
                            type: "multiple-choice",
                            options: [
                                { text: "Je pratique actuellement", score: 4 },
                                { text: "Moins de 6 mois", score: 3 },
                                { text: "Entre 6 mois et 2 ans", score: 2 },
                                { text: "Plus de 2 ans", score: 1 },
                                { text: "Je n'ai jamais pratiqué régulièrement", score: 0 }
                            ],
                            maxScore: 4
                        }
                    ]
                },
                {
                    id: "freins-leviers",
                    name: "Freins et Leviers",
                    description: "Identifiez ce qui vous empêche ou vous aide à pratiquer une activité physique régulière",
                    duration: "5-7",
                    difficulty: 1,
                    categoryId: "motivations",
                    instructions: "Indiquez dans quelle mesure les facteurs suivants limitent ou favorisent votre pratique d'activité physique.",
                    questions: [
                        {
                            id: "fl-1",
                            text: "Manque de temps",
                            type: "slider",
                            minLabel: "Ne me limite pas du tout",
                            maxLabel: "Me limite beaucoup"
                        },
                        {
                            id: "fl-2",
                            text: "Fatigue ou manque d'énergie",
                            type: "slider",
                            minLabel: "Ne me limite pas du tout",
                            maxLabel: "Me limite beaucoup"
                        },
                        {
                            id: "fl-3",
                            text: "Douleurs ou problèmes de santé",
                            type: "slider",
                            minLabel: "Ne me limite pas du tout",
                            maxLabel: "Me limite beaucoup"
                        },
                        {
                            id: "fl-4",
                            text: "Manque de motivation ou d'intérêt",
                            type: "slider",
                            minLabel: "Ne me limite pas du tout",
                            maxLabel: "Me limite beaucoup"
                        },
                        {
                            id: "fl-5",
                            text: "Soutien de l'entourage",
                            type: "slider",
                            minLabel: "Pas du tout présent",
                            maxLabel: "Très présent"
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
                    name: "Force des Membres Inférieurs",
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
                    ],
                    interpretations: {
                        1: "Votre force des membres inférieurs présente un potentiel d'amélioration important. Commencez par des exercices simples comme se lever d'une chaise avec appui, puis progressez vers des exercices sans appui. Des séances régulières de pilates sur chaise vous aideront à renforcer vos jambes en douceur.",
                        2: "Votre force des membres inférieurs est en développement. Intégrez des exercices de lever de chaise dans votre routine quotidienne. Les séances de pilates axées sur les jambes vous aideront à progresser et à gagner en autonomie.",
                        3: "Votre force des membres inférieurs est dans la moyenne. Continuez à la développer avec des exercices réguliers comme les squats partiels et les montées de marche. Les séances de pilates vous aideront à améliorer votre technique et votre endurance.",
                        4: "Votre force des membres inférieurs est bonne. Vous pouvez maintenant vous concentrer sur des exercices plus dynamiques et diversifiés. Essayez les séances de pilates intermédiaires qui combinent force et mobilité.",
                        5: "Votre force des membres inférieurs est excellente ! Maintenez-la avec des exercices variés et progressifs. Vous pouvez explorer des séances de pilates avancées pour continuer à développer votre force, votre équilibre et votre coordination."
                    }
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
                    ],
                    interpretations: {
                        1: "Votre souplesse des épaules est limitée, ce qui peut affecter vos mouvements quotidiens. Commencez par des étirements doux et progressifs des épaules, en évitant toute douleur. Les exercices de mobilité des épaules en position assise sont parfaits pour débuter en toute sécurité.",
                        2: "Votre souplesse des épaules est en développement. Pratiquez régulièrement des exercices d'ouverture de la poitrine et de mobilisation des omoplates. Les séances d'étirements ciblés amélioreront progressivement votre amplitude de mouvement.",
                        3: "Votre souplesse des épaules est moyenne. Continuez à l'améliorer avec des exercices de rotation des épaules et d'étirements de la ceinture scapulaire. Les séances de mobilité vous aideront à gagner en aisance dans vos mouvements quotidiens.",
                        4: "Votre souplesse des épaules est bonne. Maintenez-la par une pratique régulière et diversifiée. Les exercices de pilates qui combinent mobilité et stabilité des épaules vous permettront de conserver cette qualité importante.",
                        5: "Votre souplesse des épaules est excellente ! Continuez à l'entretenir tout en travaillant également le renforcement musculaire pour un équilibre optimal. Vous pouvez explorer des mouvements plus complexes dans vos séances de pilates ou d'étirements."
                    }
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
                    ],
                    interpretations: {
                        1: "Votre souplesse du dos et de l'arrière des jambes est très limitée. Commencez par des étirements en position assise, en inclinant doucement le buste vers l'avant. Des séances d'étirements sur chaise vous permettront d'améliorer progressivement votre souplesse sans risque.",
                        2: "Votre souplesse du dos présente un potentiel d'amélioration. Pratiquez régulièrement des exercices d'étirement de la chaîne postérieure en position assise ou allongée. Les séances de mobilité du dos amélioreront votre confort au quotidien.",
                        3: "Votre souplesse du dos est moyenne. Continuez à l'améliorer avec des exercices d'étirement réguliers. Les séances de pilates centrées sur la mobilité vertébrale vous aideront à progresser harmonieusement.",
                        4: "Votre souplesse du dos est bonne. Maintenez-la avec une pratique variée combinant mobilité et stabilité. Les exercices d'étirement et de renforcement vous permettront de conserver une colonne vertébrale saine et mobile.",
                        5: "Votre souplesse du dos est excellente ! Continuez à l'entretenir tout en veillant au bon équilibre entre souplesse et renforcement musculaire. Vous pouvez explorer des postures plus avancées dans vos séances de pilates."
                    }
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
                    ],
                    interpretations: {
                        1: "Votre équilibre statique présente un fort potentiel d'amélioration. Commencez par des exercices d'équilibre avec soutien (contre un mur ou une chaise). Pratiquez régulièrement des exercices simples comme rester debout avec les pieds écartés puis progressivement rapprochés. Les séances d'équilibre sur chaise vous aideront à renforcer vos stabilisateurs en toute sécurité.",
                        2: "Votre équilibre statique est en développement. Travaillez-le quotidiennement avec des exercices d'équilibre progressifs, en diminuant graduellement le soutien. Les exercices de pilates axés sur la stabilisation du tronc amélioreront votre équilibre global.",
                        3: "Votre équilibre statique est moyen. Continuez à le développer avec des exercices réguliers comme rester sur une jambe ou faire des transferts de poids. Les séances combinant force et équilibre vous aideront à progresser efficacement.",
                        4: "Votre équilibre statique est bon. Maintenez-le avec des exercices variés et progressifs. Vous pouvez intégrer des mouvements plus complexes ou des surfaces instables pour continuer à progresser.",
                        5: "Votre équilibre statique est excellent ! Continuez à le mettre au défi avec des exercices avancés et des combinaisons de mouvements. Les séances de pilates ou d'équilibre dynamique vous permettront de maintenir cette capacité essentielle."
                    }
                },
                {
                    id: "equilibre-dynamique",
                    name: "Équilibre dynamique",
                    description: "Évaluez votre équilibre lors du mouvement",
                    duration: "3-5",
                    difficulty: 2,
                    categoryId: "tests-physiques",
                    instructions: "Marchez en ligne droite en posant le talon d'un pied directement devant les orteils de l'autre pied (marche tandem) sur une distance de 3 mètres. Essayez de marcher le plus droit possible.",
                    isPhysical: true,
                    videoUrl: "assets/videos/test-equilibre-dynamique.mp4",
                    questions: [
                        {
                            id: "equilibre-dynamique-1",
                            text: "Comment avez-vous réussi ce test ?",
                            type: "multiple-choice",
                            options: [
                                { text: "Impossible de marcher en ligne droite sans perdre l'équilibre", score: 1 },
                                { text: "Capable de faire quelques pas mais avec beaucoup d'instabilité", score: 2 },
                                { text: "Capable de marcher la distance avec quelques écarts ou hésitations", score: 3 },
                                { text: "Capable de marcher la distance avec peu d'écarts", score: 4 },
                                { text: "Capable de marcher parfaitement en ligne droite sans écart", score: 5 }
                            ],
                            maxScore: 5
                        }
                    ],
                    interpretations: {
                        1: "Votre équilibre dynamique présente un fort potentiel d'amélioration. Commencez par des exercices de marche avec un soutien (main courante, canne ou accompagnement). Pratiquez des déplacements contrôlés dans un environnement sécurisé. Les exercices de transfert de poids en position assise ou debout avec appui vous aideront à progresser.",
                        2: "Votre équilibre dynamique est en développement. Travaillez-le avec des exercices de marche contrôlée, en diminuant progressivement le soutien. Les exercices de coordination et de conscience corporelle amélioreront votre stabilité lors des déplacements.",
                        3: "Votre équilibre dynamique est moyen. Continuez à le développer avec des exercices plus complexes comme la marche avec changements de direction ou sur des surfaces variées. Les séances combinant équilibre et renforcement musculaire vous aideront à progresser harmonieusement.",
                        4: "Votre équilibre dynamique est bon. Maintenez-le avec des exercices variés et progressifs. Vous pouvez intégrer des défis comme marcher sur des surfaces instables ou avec des mouvements de tête pour stimuler davantage votre système d'équilibration.",
                        5: "Votre équilibre dynamique est excellent ! Continuez à le maintenir avec des exercices avancés combinant déplacements, obstacles et doubles tâches. Votre bonne stabilité en mouvement est un atout précieux pour rester actif et autonome."
                    }
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
                    ],
                    interpretations: {
                        1: "Votre endurance cardiovasculaire présente un potentiel d'amélioration important. Commencez par des activités très douces comme la marche lente ou des exercices assis avec des pauses fréquentes. Augmentez progressivement la durée avant l'intensité. Les séances de respiration et de mobilisation douce sont parfaites pour débuter.",
                        2: "Votre endurance cardiovasculaire est en développement. Pratiquez régulièrement des activités d'intensité légère comme la marche ou les exercices sur chaise. Augmentez progressivement la durée de vos sessions en respectant vos sensations. Les séances combinant respiration et mouvement amélioreront votre capacité cardio-respiratoire.",
                        3: "Votre endurance cardiovasculaire est moyenne. Continuez à la développer avec des activités régulières d'intensité modérée. Alternez entre différents types d'exercices (marche, vélo, natation...) pour stimuler votre système cardiovasculaire de façon variée.",
                        4: "Votre endurance cardiovasculaire est bonne. Maintenez-la avec des activités variées et régulières. Vous pouvez intégrer quelques intervalles d'intensité plus élevée pour continuer à progresser tout en gardant des sessions plus longues à intensité modérée.",
                        5: "Votre endurance cardiovasculaire est excellente ! Continuez à la maintenir avec des activités variées et régulières. Votre bonne capacité cardio-respiratoire est un atout majeur pour votre santé globale et votre qualité de vie."
                    }
                },
                {
                    id: "force-abdos",
                    name: "Force des abdominaux",
                    description: "Évaluez la force et l'endurance de vos muscles abdominaux",
                    duration: "3-5",
                    difficulty: 2,
                    categoryId: "tests-physiques",
                    instructions: "Allongez-vous sur le dos, genoux fléchis, pieds à plat sur le sol. Soulevez la tête et les épaules de façon à ce que vos omoplates ne touchent plus le sol. Placez vos bras tendus le long du corps. Maintenez cette position aussi longtemps que possible.",
                    isPhysical: true,
                    videoUrl: "assets/videos/test-shirado-ito.mp4",
                    timerDuration: 120,
                    questions: [
                        {
                            id: "force-abdos-1",
                            text: "Combien de temps avez-vous maintenu la position (en secondes) ?",
                            type: "multiple-choice",
                            options: [
                                { text: "Moins de 15 secondes", score: 1 },
                                { text: "15-30 secondes", score: 2 },
                                { text: "31-60 secondes", score: 3 },
                                { text: "61-90 secondes", score: 4 },
                                { text: "Plus de 90 secondes", score: 5 }
                            ],
                            maxScore: 5
                        }
                    ],
                    interpretations: {
                        1: "Votre force abdominale présente un potentiel d'amélioration important. Commencez par des exercices de base comme la respiration abdominale et de légères contractions en position allongée. Les exercices sur chaise qui engagent le tronc vous aideront à développer progressivement votre ceinture abdominale sans contrainte excessive sur le dos.",
                        2: "Votre force abdominale est en développement. Pratiquez régulièrement des exercices d'engagement du tronc en position allongée et assise. Les exercices de pilates fondamentaux, comme l'imprint (aplatissement du bas du dos), sont parfaits pour renforcer progressivement vos abdominaux.",
                        3: "Votre force abdominale est moyenne. Continuez à la développer avec des exercices variés qui sollicitent différentes parties des abdominaux. Les séances de pilates de niveau intermédiaire vous permettront de progresser en maintenant un bon alignement de la colonne.",
                        4: "Votre force abdominale est bonne. Maintenez-la avec des exercices diversifiés, en intégrant des mouvements qui combinent stabilité et mobilité. Vous pouvez explorer des variations plus complexes qui sollicitent les abdominaux profonds et les muscles obliques.",
                        5: "Votre force abdominale est excellente ! Continuez à la maintenir avec des exercices avancés tout en veillant à l'équilibre entre les différents groupes musculaires. Votre bonne stabilité centrale est un atout majeur pour protéger votre dos et améliorer vos performances dans toutes les activités."
                    }
                },
                {
                    id: "force-dos",
                    name: "Force du dos",
                    description: "Évaluez la force et l'endurance des muscles de votre dos",
                    duration: "3-5",
                    difficulty: 2,
                    categoryId: "tests-physiques",
                    instructions: "Allongez-vous sur le ventre, le haut du corps dans le vide (sur un banc ou une table avec quelqu'un tenant vos jambes), ou à plat sur le sol. Placez vos mains croisées sur les épaules. Soulevez le tronc à l'horizontale et maintenez cette position aussi longtemps que possible.",
                    isPhysical: true,
                    videoUrl: "assets/videos/test-sorensen.mp4",
                    timerDuration: 120,
                    questions: [
                        {
                            id: "force-dos-1",
                            text: "Combien de temps avez-vous maintenu la position (en secondes) ?",
                            type: "multiple-choice",
                            options: [
                                { text: "Moins de 20 secondes", score: 1 },
                                { text: "20-40 secondes", score: 2 },
                                { text: "41-60 secondes", score: 3 },
                                { text: "61-90 secondes", score: 4 },
                                { text: "Plus de 90 secondes", score: 5 }
                            ],
                            maxScore: 5
                        }
                    ],
                    interpretations: {
                        1: "Votre force dorsale présente un potentiel d'amélioration important. Commencez par des exercices doux de mobilisation du dos en position allongée ou à quatre pattes. Les exercices de renforcement progressif sans charge comme l'extension de colonne en position assise vous permettront de développer en douceur les muscles du dos.",
                        2: "Votre force dorsale est en développement. Pratiquez régulièrement des exercices ciblés comme les extensions partielles du dos en position allongée et les mouvements de mobilisation de la colonne. Les exercices de pilates fondamentaux aideront à renforcer les muscles profonds du dos.",
                        3: "Votre force dorsale est moyenne. Continuez à la développer avec des exercices variés qui sollicitent les différents muscles du dos. Les séances combinant stabilisation et mobilisation progressive de la colonne vous permettront d'améliorer harmonieusement cette zone importante.",
                        4: "Votre force dorsale est bonne. Maintenez-la avec des exercices diversifiés et progressifs. Vous pouvez explorer des mouvements plus complexes qui intègrent la coordination des bras et des jambes tout en stabilisant le dos.",
                        5: "Votre force dorsale est excellente ! Continuez à la maintenir avec des exercices avancés tout en veillant à l'équilibre entre les différents groupes musculaires. Votre bonne force du dos est un atout majeur pour prévenir les douleurs et maintenir une posture correcte au quotidien."
                    }
                },
                {
                    id: "force-bras",
                    name: "Force des membres supérieurs",
                    description: "Évaluez la force et l'endurance des muscles de vos bras",
                    duration: "2-3",
                    difficulty: 2,
                    categoryId: "tests-physiques",
                    instructions: "Asseyez-vous sur une chaise avec le dos droit. Pour les femmes, prenez un haltère de 2 kg (ou une bouteille d'eau équivalente). Pour les hommes, prenez un haltère de 3-4 kg. Effectuez des flexions du coude (arm curl) en ramenant l'avant-bras vers l'épaule. Comptez combien de répétitions vous pouvez faire en 30 secondes.",
                    isPhysical: true,
                    videoUrl: "assets/videos/test-arm-curl.mp4",
                    timerDuration: 30,
                    questions: [
                        {
                            id: "force-bras-1",
                            text: "Nombre de flexions complètes réalisées en 30 secondes",
                            type: "multiple-choice",
                            options: [
                                { text: "0-8 répétitions", score: 1 },
                                { text: "9-13 répétitions", score: 2 },
                                { text: "14-18 répétitions", score: 3 },
                                { text: "19-23 répétitions", score: 4 },
                                { text: "24 répétitions ou plus", score: 5 }
                            ],
                            maxScore: 5
                        }
                    ],
                    interpretations: {
                        1: "Votre force des bras présente un potentiel d'amélioration important. Commencez par des exercices sans poids ou avec des poids très légers, en effectuant des mouvements contrôlés avec peu de répétitions. Les exercices de pilates sur chaise qui engagent les bras vous aideront à développer progressivement votre force sans surcharge.",
                        2: "Votre force des bras est en développement. Pratiquez régulièrement des exercices avec des poids légers, en augmentant progressivement le nombre de répétitions avant d'augmenter la charge. Les exercices de renforcement qui utilisent le poids du corps ou de petits accessoires sont parfaits à ce stade.",
                        3: "Votre force des bras est moyenne. Continuez à la développer avec des exercices variés qui sollicitent différents groupes musculaires. Alternez entre des séances avec plus de répétitions et des séances avec des charges légèrement plus lourdes pour stimuler vos muscles de façon optimale.",
                        4: "Votre force des bras est bonne. Maintenez-la avec des exercices diversifiés, en intégrant des mouvements qui combinent plusieurs articulations. Vous pouvez explorer des variations plus complexes et des charges modérées pour continuer à progresser harmonieusement.",
                        5: "Votre force des bras est excellente ! Continuez à la maintenir avec des exercices avancés tout en veillant à l'équilibre entre les différents groupes musculaires. Votre bonne force des membres supérieurs est un atout précieux pour l'autonomie dans les activités quotidiennes."
                    }
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
