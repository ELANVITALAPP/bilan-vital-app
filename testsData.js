// testsData.js - Données des tests complètes
// Utiliser une structure globale au lieu d'import/export
const testsData = {
    categories: [
        {
            id: "cat1",
            name: "Testez ma condition physique actuelle",
            description: "Évaluez votre condition physique à domicile avec des tests simples et sécurisés.",
            tests: [
                {
                    id: "lower_body_strength",
                    name: "Force des Membres Inférieurs (Assis-Debout)",
                    description: "Évaluez la force et l'endurance des muscles de vos jambes avec le test assis-debout de 30 secondes.",
                    duration: "5-8",
                    questions: [
                        {
                            text: "Matériel nécessaire : Une chaise stable sans accoudoirs, un chronomètre. Êtes-vous prêt(e) ?",
                            type: "multiple-choice",
                            options: [
                                { text: "Oui, j'ai tout le matériel", score: 1 },
                                { text: "Non, je dois me préparer", score: 0 }
                            ],
                            maxScore: 1
                        },
                        {
                            text: "Avez-vous des problèmes de genoux actuels qui pourraient vous empêcher de faire ce test ?",
                            type: "multiple-choice",
                            options: [
                                { text: "Non, aucun problème", score: 1 },
                                { text: "Oui, j'ai des douleurs", score: 0 }
                            ],
                            maxScore: 1
                        },
                        {
                            text: "Combien de levers complets avez-vous réalisés en 30 secondes ? (Assis→Debout→Assis = 1 répétition)",
                            type: "number",
                            placeholder: "Nombre de répétitions"
                        },
                        {
                            text: "Comment vous êtes-vous senti(e) pendant ce test ?",
                            type: "multiple-choice",
                            options: [
                                { text: "Très facile, je pouvais continuer", score: 4 },
                                { text: "Moyennement difficile", score: 3 },
                                { text: "Difficile vers la fin", score: 2 },
                                { text: "Très difficile dès le début", score: 1 }
                            ],
                            maxScore: 4
                        }
                    ]
                },
                {
                    id: "shoulder_flexibility",
                    name: "Souplesse des Épaules",
                    description: "Évaluez la mobilité de vos épaules en essayant de joindre vos mains derrière le dos.",
                    duration: "3-5",
                    questions: [
                        {
                            text: "Test main droite en haut : Quelle est la distance entre vos majeurs derrière le dos ?",
                            type: "multiple-choice",
                            options: [
                                { text: "Mes doigts se chevauchent (excellent)", score: 5 },
                                { text: "Mes doigts se touchent juste", score: 4 },
                                { text: "1-2 cm d'écart", score: 3 },
                                { text: "3-5 cm d'écart", score: 2 },
                                { text: "Plus de 5 cm d'écart", score: 1 }
                            ],
                            maxScore: 5
                        },
                        {
                            text: "Test main gauche en haut : Quelle est la distance entre vos majeurs derrière le dos ?",
                            type: "multiple-choice",
                            options: [
                                { text: "Mes doigts se chevauchent (excellent)", score: 5 },
                                { text: "Mes doigts se touchent juste", score: 4 },
                                { text: "1-2 cm d'écart", score: 3 },
                                { text: "3-5 cm d'écart", score: 2 },
                                { text: "Plus de 5 cm d'écart", score: 1 }
                            ],
                            maxScore: 5
                        },
                        {
                            text: "Avez-vous ressenti une différence entre les deux côtés ?",
                            type: "multiple-choice",
                            options: [
                                { text: "Non, les deux côtés sont équivalents", score: 2 },
                                { text: "Oui, un côté est plus raide", score: 1 }
                            ],
                            maxScore: 2
                        }
                    ]
                },
                {
                    id: "back_legs_flexibility",
                    name: "Souplesse Dos/Jambes (Schober Modifié)",
                    description: "Évaluez la souplesse de votre bas du dos et de l'arrière de vos jambes.",
                    duration: "5-7",
                    questions: [
                        {
                            text: "Avez-vous des problèmes lombaires actuels ?",
                            type: "multiple-choice",
                            options: [
                                { text: "Non, aucun problème", score: 1 },
                                { text: "Oui, des douleurs récentes", score: 0 }
                            ],
                            maxScore: 1
                        },
                        {
                            text: "En vous penchant vers l'avant (jambes tendues), jusqu'où atteignez-vous par rapport à vos pieds ?",
                            type: "multiple-choice",
                            options: [
                                { text: "Plus de 15 cm sous mes pieds", score: 5 },
                                { text: "5-15 cm sous mes pieds", score: 4 },
                                { text: "Je touche juste mes pieds", score: 3 },
                                { text: "Je n'atteins pas mes pieds", score: 2 },
                                { text: "J'ai beaucoup de mal à me pencher", score: 1 }
                            ],
                            maxScore: 5
                        },
                        {
                            text: "Avez-vous ressenti des tensions ou douleurs pendant ce test ?",
                            type: "multiple-choice",
                            options: [
                                { text: "Aucune gêne", score: 3 },
                                { text: "Légère tension normale", score: 2 },
                                { text: "Tension importante", score: 1 }
                            ],
                            maxScore: 3
                        }
                    ]
                },
                {
                    id: "static_balance",
                    name: "Équilibre Statique (Test Unipodal)",
                    description: "Évaluez votre capacité à maintenir l'équilibre sur une jambe.",
                    duration: "5-8",
                    questions: [
                        {
                            text: "Combien de temps avez-vous tenu en équilibre sur votre JAMBE DROITE ? (maximum 30 sec)",
                            type: "multiple-choice",
                            options: [
                                { text: "30 secondes (maximum)", score: 5 },
                                { text: "20-29 secondes", score: 4 },
                                { text: "10-19 secondes", score: 3 },
                                { text: "5-9 secondes", score: 2 },
                                { text: "Moins de 5 secondes", score: 1 }
                            ],
                            maxScore: 5
                        },
                        {
                            text: "Combien de temps avez-vous tenu en équilibre sur votre JAMBE GAUCHE ? (maximum 30 sec)",
                            type: "multiple-choice",
                            options: [
                                { text: "30 secondes (maximum)", score: 5 },
                                { text: "20-29 secondes", score: 4 },
                                { text: "10-19 secondes", score: 3 },
                                { text: "5-9 secondes", score: 2 },
                                { text: "Moins de 5 secondes", score: 1 }
                            ],
                            maxScore: 5
                        },
                        {
                            text: "Avez-vous essayé le test les yeux fermés ? Si oui, combien de temps avez-vous tenu ?",
                            type: "multiple-choice",
                            options: [
                                { text: "Plus de 10 secondes yeux fermés", score: 3 },
                                { text: "5-10 secondes yeux fermés", score: 2 },
                                { text: "Moins de 5 secondes yeux fermés", score: 1 },
                                { text: "Je n'ai pas essayé yeux fermés", score: 0 }
                            ],
                            maxScore: 3
                        }
                    ]
                },
                {
                    id: "dynamic_balance",
                    name: "Équilibre Dynamique (Tinetti Simplifié)",
                    description: "Évaluez votre équilibre pendant le mouvement et votre risque de chute.",
                    duration: "8-10",
                    questions: [
                        {
                            text: "Pouvez-vous vous lever d'une chaise sans vous aider de vos bras ?",
                            type: "multiple-choice",
                            options: [
                                { text: "Oui, facilement en une fois", score: 2 },
                                { text: "Oui, mais avec difficulté", score: 1 },
                                { text: "Non, j'ai besoin de mes bras", score: 0 }
                            ],
                            maxScore: 2
                        },
                        {
                            text: "Restez-vous stable immédiatement après vous être levé(e) ?",
                            type: "multiple-choice",
                            options: [
                                { text: "Oui, parfaitement stable", score: 2 },
                                { text: "Léger vacillement puis stable", score: 1 },
                                { text: "Je vacille ou me rattrape", score: 0 }
                            ],
                            maxScore: 2
                        },
                        {
                            text: "Résistez-vous à une poussée légère sur la poitrine sans bouger les pieds ?",
                            type: "multiple-choice",
                            options: [
                                { text: "Oui, je reste stable", score: 2 },
                                { text: "Je vacille mais ne bouge pas les pieds", score: 1 },
                                { text: "Je dois faire un pas pour me rattraper", score: 0 }
                            ],
                            maxScore: 2
                        },
                        {
                            text: "Marchez-vous en ligne droite sur 3 mètres sans dévier ?",
                            type: "multiple-choice",
                            options: [
                                { text: "Oui, parfaitement droit", score: 2 },
                                { text: "Légère déviation", score: 1 },
                                { text: "Je dévie nettement", score: 0 }
                            ],
                            maxScore: 2
                        },
                        {
                            text: "Pouvez-vous faire demi-tour en marchant sans vous arrêter ?",
                            type: "multiple-choice",
                            options: [
                                { text: "Oui, fluidement", score: 2 },
                                { text: "Oui, mais lentement", score: 1 },
                                { text: "Je dois m'arrêter pour tourner", score: 0 }
                            ],
                            maxScore: 2
                        },
                        {
                            text: "Vous asseyez-vous doucement sur la chaise sans 'tomber' dessus ?",
                            type: "multiple-choice",
                            options: [
                                { text: "Oui, mouvement contrôlé", score: 2 },
                                { text: "Un peu brusque mais contrôlé", score: 1 },
                                { text: "Je me laisse tomber", score: 0 }
                            ],
                            maxScore: 2
                        }
                    ]
                },
                {
                    id: "cardiovascular_endurance",
                    name: "Endurance Cardiovasculaire (Montée de Genoux)",
                    description: "Évaluez votre endurance cardiovasculaire avec 2 minutes de montées de genoux.",
                    duration: "5-7",
                    questions: [
                        {
                            text: "Combien de montées de genoux avez-vous réalisées en 2 minutes ? (comptez chaque genou)",
                            type: "number",
                            placeholder: "Nombre total de montées"
                        },
                        {
                            text: "Comment vous êtes-vous senti(e) à la fin du test ?",
                            type: "multiple-choice",
                            options: [
                                { text: "Pas essoufflé(e), je pouvais continuer", score: 4 },
                                { text: "Légèrement essoufflé(e)", score: 3 },
                                { text: "Bien essoufflé(e) mais ça va", score: 2 },
                                { text: "Très essoufflé(e), j'ai dû ralentir", score: 1 }
                            ],
                            maxScore: 4
                        },
                        {
                            text: "Avez-vous dû faire des pauses pendant le test ?",
                            type: "multiple-choice",
                            options: [
                                { text: "Aucune pause", score: 3 },
                                { text: "1 pause de moins de 10 secondes", score: 2 },
                                { text: "Plusieurs pauses courtes", score: 1 },
                                { text: "J'ai dû m'arrêter souvent", score: 0 }
                            ],
                            maxScore: 3
                        }
                    ]
                },
                {
                    id: "back_strength",
                    name: "Force du Dos (Sorensen Modifié)",
                    description: "Évaluez l'endurance des muscles de votre dos. Attention : ne pas faire si problèmes de dos.",
                    duration: "5-8",
                    questions: [
                        {
                            text: "Avez-vous des problèmes de dos actuels ?",
                            type: "multiple-choice",
                            options: [
                                { text: "Non, aucun problème récent", score: 1 },
                                { text: "Oui, je dois éviter ce test", score: 0 }
                            ],
                            maxScore: 1
                        },
                        {
                            text: "Combien de temps avez-vous maintenu la position d'extension du tronc ?",
                            type: "multiple-choice",
                            options: [
                                { text: "Plus de 90 secondes", score: 5 },
                                { text: "60-90 secondes", score: 4 },
                                { text: "30-59 secondes", score: 3 },
                                { text: "15-29 secondes", score: 2 },
                                { text: "Moins de 15 secondes", score: 1 }
                            ],
                            maxScore: 5
                        },
                        {
                            text: "Comment s'est déroulé le test ?",
                            type: "multiple-choice",
                            options: [
                                { text: "Facile, j'ai arrêté volontairement", score: 3 },
                                { text: "Moyennement difficile", score: 2 },
                                { text: "Difficile, fatigue musculaire", score: 1 },
                                { text: "Je n'ai pas pu faire ce test", score: 0 }
                            ],
                            maxScore: 3
                        }
                    ]
                },
                {
                    id: "upper_body_strength",
                    name: "Force Membres Supérieurs (Arm Curl)",
                    description: "Évaluez la force de vos bras avec des flexions en 30 secondes (2kg femmes / 3kg hommes).",
                    duration: "5-8",
                    questions: [
                        {
                            text: "Quel poids avez-vous utilisé ?",
                            type: "multiple-choice",
                            options: [
                                { text: "Poids recommandé (2kg femmes/3kg hommes)", score: 3 },
                                { text: "Poids plus léger par nécessité", score: 2 },
                                { text: "Bouteilles d'eau ou objets de maison", score: 1 }
                            ],
                            maxScore: 3
                        },
                        {
                            text: "Combien de flexions complètes avez-vous réalisées avec votre BRAS DOMINANT en 30 secondes ?",
                            type: "number",
                            placeholder: "Nombre de flexions"
                        },
                        {
                            text: "Combien de flexions complètes avez-vous réalisées avec votre BRAS NON-DOMINANT en 30 secondes ?",
                            type: "number",
                            placeholder: "Nombre de flexions"
                        },
                        {
                            text: "Comment vous êtes-vous senti(e) pendant ce test ?",
                            type: "multiple-choice",
                            options: [
                                { text: "Facile, j'aurais pu continuer", score: 3 },
                                { text: "Moyennement difficile", score: 2 },
                                { text: "Difficile, fatigue vers la fin", score: 1 }
                            ],
                            maxScore: 3
                        }
                    ]
                },
                {
                    id: "abdominal_strength",
                    name: "Force Abdominaux (Shirado-Ito Modifié)",
                    description: "Évaluez l'endurance de vos muscles abdominaux en maintenant une position de flexion du tronc.",
                    duration: "5-8",
                    questions: [
                        {
                            text: "Combien de temps avez-vous maintenu la position abdominaux contractés, épaules décollées ?",
                            type: "multiple-choice",
                            options: [
                                { text: "Plus de 90 secondes", score: 5 },
                                { text: "60-90 secondes", score: 4 },
                                { text: "30-59 secondes", score: 3 },
                                { text: "15-29 secondes", score: 2 },
                                { text: "Moins de 15 secondes", score: 1 }
                            ],
                            maxScore: 5
                        },
                        {
                            text: "Avez-vous ressenti des tensions dans le cou pendant l'exercice ?",
                            type: "multiple-choice",
                            options: [
                                { text: "Non, aucune tension", score: 3 },
                                { text: "Légère tension mais supportable", score: 2 },
                                { text: "Oui, j'ai dû soutenir ma tête", score: 1 }
                            ],
                            maxScore: 3
                        },
                        {
                            text: "Comment s'est terminé le test ?",
                            type: "multiple-choice",
                            options: [
                                { text: "J'ai arrêté volontairement", score: 3 },
                                { text: "Fatigue des abdominaux", score: 2 },
                                { text: "Fatigue ou gêne ailleurs", score: 1 }
                            ],
                            maxScore: 3
                        }
                    ]
                }
            ]
        }
    ]
};
