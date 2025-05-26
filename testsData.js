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
                    id: "anxiety",
                    name: "Test d'Anxiété STAI",
                    description: "Évaluez votre niveau d'anxiété actuel et habituel (State-Trait Anxiety Inventory).",
                    duration: "10-12",
                    questions: [
                        // PARTIE 1 - ANXIÉTÉ ÉTAT (comment vous vous sentez MAINTENANT)
                        {
                            text: "PARTIE 1 - Comment vous vous sentez MAINTENANT, à cet instant précis :",
                            type: "info"
                        },
                        {
                            text: "Je me sens calme",
                            type: "multiple-choice",
                            options: [
                                { text: "Pas du tout", score: 1 },
                                { text: "Un peu", score: 2 },
                                { text: "Moyennement", score: 3 },
                                { text: "Beaucoup", score: 4 }
                            ],
                            maxScore: 4,
                            reverse: true
                        },
                        {
                            text: "Je suis tendu(e)",
                            type: "multiple-choice",
                            options: [
                                { text: "Pas du tout", score: 1 },
                                { text: "Un peu", score: 2 },
                                { text: "Moyennement", score: 3 },
                                { text: "Beaucoup", score: 4 }
                            ],
                            maxScore: 4
                        },
                        {
                            text: "Je me sens à l'aise",
                            type: "multiple-choice",
                            options: [
                                { text: "Pas du tout", score: 1 },
                                { text: "Un peu", score: 2 },
                                { text: "Moyennement", score: 3 },
                                { text: "Beaucoup", score: 4 }
                            ],
                            maxScore: 4,
                            reverse: true
                        },
                        {
                            text: "Je suis énervé(e)",
                            type: "multiple-choice",
                            options: [
                                { text: "Pas du tout", score: 1 },
                                { text: "Un peu", score: 2 },
                                { text: "Moyennement", score: 3 },
                                { text: "Beaucoup", score: 4 }
                            ],
                            maxScore: 4
                        },
                        {
                            text: "Je me sens inquiet(ète)",
                            type: "multiple-choice",
                            options: [
                                { text: "Pas du tout", score: 1 },
                                { text: "Un peu", score: 2 },
                                { text: "Moyennement", score: 3 },
                                { text: "Beaucoup", score: 4 }
                            ],
                            maxScore: 4
                        },
                        {
                            text: "Je me sens nerveux(se)",
                            type: "multiple-choice",
                            options: [
                                { text: "Pas du tout", score: 1 },
                                { text: "Un peu", score: 2 },
                                { text: "Moyennement", score: 3 },
                                { text: "Beaucoup", score: 4 }
                            ],
                            maxScore: 4
                        },
                        {
                            text: "Je suis agité(e)",
                            type: "multiple-choice",
                            options: [
                                { text: "Pas du tout", score: 1 },
                                { text: "Un peu", score: 2 },
                                { text: "Moyennement", score: 3 },
                                { text: "Beaucoup", score: 4 }
                            ],
                            maxScore: 4
                        },
                        // PARTIE 2 - ANXIÉTÉ TRAIT (comment vous vous sentez EN GÉNÉRAL)
                        {
                            text: "PARTIE 2 - Comment vous vous sentez EN GÉNÉRAL, habituellement :",
                            type: "info"
                        },
                        {
                            text: "Je me sens bien",
                            type: "multiple-choice",
                            options: [
                                { text: "Presque jamais", score: 1 },
                                { text: "Parfois", score: 2 },
                                { text: "Souvent", score: 3 },
                                { text: "Presque toujours", score: 4 }
                            ],
                            maxScore: 4,
                            reverse: true
                        },
                        {
                            text: "Je me fatigue rapidement",
                            type: "multiple-choice",
                            options: [
                                { text: "Presque jamais", score: 1 },
                                { text: "Parfois", score: 2 },
                                { text: "Souvent", score: 3 },
                                { text: "Presque toujours", score: 4 }
                            ],
                            maxScore: 4
                        },
                        {
                            text: "Je ressens souvent de la nervosité",
                            type: "multiple-choice",
                            options: [
                                { text: "Presque jamais", score: 1 },
                                { text: "Parfois", score: 2 },
                                { text: "Souvent", score: 3 },
                                { text: "Presque toujours", score: 4 }
                            ],
                            maxScore: 4
                        },
                        {
                            text: "Je me fais du souci sans raison",
                            type: "multiple-choice",
                            options: [
                                { text: "Presque jamais", score: 1 },
                                { text: "Parfois", score: 2 },
                                { text: "Souvent", score: 3 },
                                { text: "Presque toujours", score: 4 }
                            ],
                            maxScore: 4
                        },
                        {
                            text: "Je me sens tendu(e)",
                            type: "multiple-choice",
                            options: [
                                { text: "Presque jamais", score: 1 },
                                { text: "Parfois", score: 2 },
                                { text: "Souvent", score: 3 },
                                { text: "Presque toujours", score: 4 }
                            ],
                            maxScore: 4
                        }
                    ]
                },
                {
                    id: "sleep",
                    name: "Qualité du sommeil - PSQI",
                    description: "Évaluez la qualité de votre sommeil au cours du dernier mois (Pittsburgh Sleep Quality Index).",
                    duration: "8-10",
                    questions: [
                        {
                            text: "À quelle heure vous êtes-vous généralement couché(e) ?",
                            type: "text",
                            placeholder: "Ex: 22h30"
                        },
                        {
                            text: "Combien de temps (en minutes) cela vous a-t-il pris, en moyenne, pour vous endormir ?",
                            type: "number",
                            placeholder: "Nombre de minutes"
                        },
                        {
                            text: "À quelle heure vous êtes-vous généralement levé(e) le matin ?",
                            type: "text",
                            placeholder: "Ex: 7h00"
                        },
                        {
                            text: "Combien d'heures de sommeil avez-vous réellement eues par nuit (en moyenne) ?",
                            type: "number",
                            placeholder: "Nombre d'heures"
                        },
                        {
                            text: "Durant le dernier mois, à quelle fréquence avez-vous eu du mal à dormir parce que vous ne pouviez pas vous endormir dans les 30 minutes ?",
                            type: "multiple-choice",
                            options: [
                                { text: "Jamais", score: 0 },
                                { text: "Moins d'une fois par semaine", score: 1 },
                                { text: "Une à deux fois par semaine", score: 2 },
                                { text: "Trois fois par semaine ou plus", score: 3 }
                            ],
                            maxScore: 3
                        },
                        {
                            text: "Durant le dernier mois, à quelle fréquence avez-vous eu du mal à dormir parce que vous vous êtes réveillé(e) au milieu de la nuit ou tôt le matin ?",
                            type: "multiple-choice",
                            options: [
                                { text: "Jamais", score: 0 },
                                { text: "Moins d'une fois par semaine", score: 1 },
                                { text: "Une à deux fois par semaine", score: 2 },
                                { text: "Trois fois par semaine ou plus", score: 3 }
                            ],
                            maxScore: 3
                        },
                        {
                            text: "Durant le dernier mois, à quelle fréquence avez-vous pris des médicaments (prescrits ou non) pour dormir ?",
                            type: "multiple-choice",
                            options: [
                                { text: "Jamais", score: 0 },
                                { text: "Moins d'une fois par semaine", score: 1 },
                                { text: "Une à deux fois par semaine", score: 2 },
                                { text: "Trois fois par semaine ou plus", score: 3 }
                            ],
                            maxScore: 3
                        },
                        {
                            text: "Durant le dernier mois, à quelle fréquence vous êtes-vous senti(e) fatigué(e) ou somnolent(e) durant la journée ?",
                            type: "multiple-choice",
                            options: [
                                { text: "Jamais", score: 0 },
                                { text: "Moins d'une fois par semaine", score: 1 },
                                { text: "Une à deux fois par semaine", score: 2 },
                                { text: "Trois fois par semaine ou plus", score: 3 }
                            ],
                            maxScore: 3
                        },
                        {
                            text: "Durant le dernier mois, comment évalueriez-vous globalement la qualité de votre sommeil ?",
                            type: "multiple-choice",
                            options: [
                                { text: "Très bonne", score: 0 },
                                { text: "Assez bonne", score: 1 },
                                { text: "Assez mauvaise", score: 2 },
                                { text: "Très mauvaise", score: 3 }
                            ],
                            maxScore: 3
                        }
                    ]
                },
                {
                    id: "alimentation",
                    name: "Qualité Alimentaire - SDQS",
                    description: "Évaluez la diversité et la qualité de votre régime alimentaire sur les 7 derniers jours.",
                    duration: "12-15",
                    questions: [
                        {
                            text: "Au cours des 7 derniers jours, à quelle fréquence avez-vous consommé des FRUITS FRAIS ?",
                            type: "multiple-choice",
                            options: [
                                { text: "Jamais", score: 0 },
                                { text: "1 fois", score: 1 },
                                { text: "2 à 3 fois", score: 2 },
                                { text: "4 à 6 fois", score: 3 },
                                { text: "1 fois par jour ou plus", score: 4 }
                            ],
                            maxScore: 4,
                            favorable: true
                        },
                        {
                            text: "Au cours des 7 derniers jours, à quelle fréquence avez-vous consommé des LÉGUMES CRUS ?",
                            type: "multiple-choice",
                            options: [
                                { text: "Jamais", score: 0 },
                                { text: "1 fois", score: 1 },
                                { text: "2 à 3 fois", score: 2 },
                                { text: "4 à 6 fois", score: 3 },
                                { text: "1 fois par jour ou plus", score: 4 }
                            ],
                            maxScore: 4,
                            favorable: true
                        },
                        {
                            text: "Au cours des 7 derniers jours, à quelle fréquence avez-vous consommé des LÉGUMES CUITS ?",
                            type: "multiple-choice",
                            options: [
                                { text: "Jamais", score: 0 },
                                { text: "1 fois", score: 1 },
                                { text: "2 à 3 fois", score: 2 },
                                { text: "4 à 6 fois", score: 3 },
                                { text: "1 fois par jour ou plus", score: 4 }
                            ],
                            maxScore: 4,
                            favorable: true
                        },
                        {
                            text: "Au cours des 7 derniers jours, à quelle fréquence avez-vous consommé des LÉGUMINEUSES (lentilles, pois chiches, haricots secs) ?",
                            type: "multiple-choice",
                            options: [
                                { text: "Jamais", score: 0 },
                                { text: "1 fois", score: 1 },
                                { text: "2 à 3 fois", score: 2 },
                                { text: "4 à 6 fois", score: 3 },
                                { text: "1 fois par jour ou plus", score: 4 }
                            ],
                            maxScore: 4,
                            favorable: true
                        },
                        {
                            text: "Au cours des 7 derniers jours, à quelle fréquence avez-vous consommé des CÉRÉALES COMPLÈTES ou féculents complets ?",
                            type: "multiple-choice",
                            options: [
                                { text: "Jamais", score: 0 },
                                { text: "1 fois", score: 1 },
                                { text: "2 à 3 fois", score: 2 },
                                { text: "4 à 6 fois", score: 3 },
                                { text: "1 fois par jour ou plus", score: 4 }
                            ],
                            maxScore: 4,
                            favorable: true
                        },
                        {
                            text: "Au cours des 7 derniers jours, à quelle fréquence avez-vous consommé du POISSON ?",
                            type: "multiple-choice",
                            options: [
                                { text: "Jamais", score: 0 },
                                { text: "1 fois", score: 1 },
                                { text: "2 à 3 fois", score: 2 },
                                { text: "4 à 6 fois", score: 3 },
                                { text: "1 fois par jour ou plus", score: 4 }
                            ],
                            maxScore: 4,
                            favorable: true
                        },
                        {
                            text: "Au cours des 7 derniers jours, à quelle fréquence avez-vous consommé de la CHARCUTERIE ?",
                            type: "multiple-choice",
                            options: [
                                { text: "Jamais", score: 4 },
                                { text: "1 fois", score: 3 },
                                { text: "2 à 3 fois", score: 2 },
                                { text: "4 à 6 fois", score: 1 },
                                { text: "1 fois par jour ou plus", score: 0 }
                            ],
                            maxScore: 4,
                            favorable: false
                        },
                        {
                            text: "Au cours des 7 derniers jours, à quelle fréquence avez-vous consommé des VIENNOISERIES, biscuits, pâtisseries ?",
                            type: "multiple-choice",
                            options: [
                                { text: "Jamais", score: 4 },
                                { text: "1 fois", score: 3 },
                                { text: "2 à 3 fois", score: 2 },
                                { text: "4 à 6 fois", score: 1 },
                                { text: "1 fois par jour ou plus", score: 0 }
                            ],
                            maxScore: 4,
                            favorable: false
                        },
                        {
                            text: "Au cours des 7 derniers jours, à quelle fréquence avez-vous consommé des SODAS et boissons sucrées ?",
                            type: "multiple-choice",
                            options: [
                                { text: "Jamais", score: 4 },
                                { text: "1 fois", score: 3 },
                                { text: "2 à 3 fois", score: 2 },
                                { text: "4 à 6 fois", score: 1 },
                                { text: "1 fois par jour ou plus", score: 0 }
                            ],
                            maxScore: 4,
                            favorable: false
                        },
                        {
                            text: "Au cours des 7 derniers jours, à quelle fréquence avez-vous consommé des PLATS PRÉPARÉS du commerce ?",
                            type: "multiple-choice",
                            options: [
                                { text: "Jamais", score: 4 },
                                { text: "1 fois", score: 3 },
                                { text: "2 à 3 fois", score: 2 },
                                { text: "4 à 6 fois", score: 1 },
                                { text: "1 fois par jour ou plus", score: 0 }
                            ],
                            maxScore: 4,
                            favorable: false
                        }
                    ]
                },
                {
                    id: "quality_life",
                    name: "Qualité de Vie Générale",
                    description: "Évaluez votre perception globale de votre qualité de vie et bien-être.",
                    duration: "5-7",
                    questions: [
                        {
                            text: "Comment évaluez-vous votre qualité de vie globale ?",
                            type: "slider",
                            minLabel: "Très mauvaise",
                            maxLabel: "Excellente"
                        },
                        {
                            text: "Dans quelle mesure êtes-vous satisfait(e) de votre état de santé général ?",
                            type: "slider",
                            minLabel: "Très insatisfait(e)",
                            maxLabel: "Très satisfait(e)"
                        },
                        {
                            text: "Avez-vous suffisamment d'énergie pour vos activités quotidiennes ?",
                            type: "likert"
                        },
                        {
                            text: "Dans quelle mesure votre état physique vous empêche-t-il de faire ce que vous voulez ?",
                            type: "slider",
                            minLabel: "Pas du tout",
                            maxLabel: "Énormément"
                        },
                        {
                            text: "À quel point êtes-vous satisfait(e) de vos relations personnelles ?",
                            type: "slider",
                            minLabel: "Très insatisfait(e)",
                            maxLabel: "Très satisfait(e)"
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
                    id: "physical_limitations",
                    name: "Limitations Physiques",
                    description: "Évaluez vos limitations fonctionnelles dans les activités de la vie quotidienne (inspiré du WOMAC/HAQ).",
                    duration: "8-10",
                    questions: [
                        {
                            text: "Au cours des 7 derniers jours, quelle difficulté avez-vous eue à vous lever d'une chaise sans appui ?",
                            type: "multiple-choice",
                            options: [
                                { text: "Aucune difficulté", score: 0 },
                                { text: "Légère difficulté", score: 1 },
                                { text: "Difficulté modérée", score: 2 },
                                { text: "Grande difficulté", score: 3 },
                                { text: "Impossible sans aide", score: 4 }
                            ],
                            maxScore: 4
                        },
                        {
                            text: "Au cours des 7 derniers jours, quelle difficulté avez-vous eue à marcher sur terrain plat pendant 10 minutes ?",
                            type: "multiple-choice",
                            options: [
                                { text: "Aucune difficulté", score: 0 },
                                { text: "Légère difficulté", score: 1 },
                                { text: "Difficulté modérée", score: 2 },
                                { text: "Grande difficulté", score: 3 },
                                { text: "Impossible sans aide", score: 4 }
                            ],
                            maxScore: 4
                        },
                        {
                            text: "Au cours des 7 derniers jours, quelle difficulté avez-vous eue à monter ou descendre un escalier ?",
                            type: "multiple-choice",
                            options: [
                                { text: "Aucune difficulté", score: 0 },
                                { text: "Légère difficulté", score: 1 },
                                { text: "Difficulté modérée", score: 2 },
                                { text: "Grande difficulté", score: 3 },
                                { text: "Impossible sans aide", score: 4 }
                            ],
                            maxScore: 4
                        },
                        {
                            text: "Au cours des 7 derniers jours, quelle difficulté avez-vous eue à vous pencher pour ramasser un objet au sol ?",
                            type: "multiple-choice",
                            options: [
                                { text: "Aucune difficulté", score: 0 },
                                { text: "Légère difficulté", score: 1 },
                                { text: "Difficulté modérée", score: 2 },
                                { text: "Grande difficulté", score: 3 },
                                { text: "Impossible sans aide", score: 4 }
                            ],
                            maxScore: 4
                        },
                        {
                            text: "Au cours des 7 derniers jours, quelle difficulté avez-vous eue à porter une charge de 2-3 kg (sac de courses) ?",
                            type: "multiple-choice",
                            options: [
                                { text: "Aucune difficulté", score: 0 },
                                { text: "Légère difficulté", score: 1 },
                                { text: "Difficulté modérée", score: 2 },
                                { text: "Grande difficulté", score: 3 },
                                { text: "Impossible sans aide", score: 4 }
                            ],
                            maxScore: 4
                        },
                        {
                            text: "Au cours des 7 derniers jours, quel niveau de douleur avez-vous ressenti dans vos GENOUX ?",
                            type: "multiple-choice",
                            options: [
                                { text: "Aucune douleur", score: 0 },
                                { text: "Légère douleur", score: 1 },
                                { text: "Douleur modérée", score: 2 },
                                { text: "Douleur importante", score: 3 },
                                { text: "Douleur extrême", score: 4 }
                            ],
                            maxScore: 4
                        },
                        {
                            text: "Au cours des 7 derniers jours, quel niveau de douleur avez-vous ressenti dans vos ÉPAULES ?",
                            type: "multiple-choice",
                            options: [
                                { text: "Aucune douleur", score: 0 },
                                { text: "Légère douleur", score: 1 },
                                { text: "Douleur modérée", score: 2 },
                                { text: "Douleur importante", score: 3 },
                                { text: "Douleur extrême", score: 4 }
                            ],
                            maxScore: 4
                        },
                        {
                            text: "Au cours des 7 derniers jours, quel niveau de douleur avez-vous ressenti dans le BAS DU DOS (lombaires) ?",
                            type: "multiple-choice",
                            options: [
                                { text: "Aucune douleur", score: 0 },
                                { text: "Légère douleur", score: 1 },
                                { text: "Douleur modérée", score: 2 },
                                { text: "Douleur importante", score: 3 },
                                { text: "Douleur extrême", score: 4 }
                            ],
                            maxScore: 4
                        }
                    ]
                },
                {
                    id: "body_image",
                    name: "Image Corporelle",
                    description: "Évaluez votre satisfaction vis-à-vis de votre corps et votre apparence (Body Esteem Scale).",
                    duration: "5-7",
                    questions: [
                        {
                            text: "Quel est votre niveau de satisfaction vis-à-vis de votre SILHOUETTE GÉNÉRALE ?",
                            type: "multiple-choice",
                            options: [
                                { text: "Très insatisfait(e)", score: 1 },
                                { text: "Insatisfait(e)", score: 2 },
                                { text: "Ni satisfait(e), ni insatisfait(e)", score: 3 },
                                { text: "Satisfait(e)", score: 4 },
                                { text: "Très satisfait(e)", score: 5 }
                            ],
                            maxScore: 5
                        },
                        {
                            text: "Quel est votre niveau de satisfaction vis-à-vis de votre VENTRE ?",
                            type: "multiple-choice",
                            options: [
                                { text: "Très insatisfait(e)", score: 1 },
                                { text: "Insatisfait(e)", score: 2 },
                                { text: "Ni satisfait(e), ni insatisfait(e)", score: 3 },
                                { text: "Satisfait(e)", score: 4 },
                                { text: "Très satisfait(e)", score: 5 }
                            ],
                            maxScore: 5
                        },
                        {
                            text: "Quel est votre niveau de satisfaction vis-à-vis de vos CUISSES ?",
                            type: "multiple-choice",
                            options: [
                                { text: "Très insatisfait(e)", score: 1 },
                                { text: "Insatisfait(e)", score: 2 },
                                { text: "Ni satisfait(e), ni insatisfait(e)", score: 3 },
                                { text: "Satisfait(e)", score: 4 },
                                { text: "Très satisfait(e)", score: 5 }
                            ],
                            maxScore: 5
                        },
                        {
                            text: "Quel est votre niveau de satisfaction vis-à-vis de votre POIDS ?",
                            type: "multiple-choice",
                            options: [
                                { text: "Très insatisfait(e)", score: 1 },
                                { text: "Insatisfait(e)", score: 2 },
                                { text: "Ni satisfait(e), ni insatisfait(e)", score: 3 },
                                { text: "Satisfait(e)", score: 4 },
                                { text: "Très satisfait(e)", score: 5 }
                            ],
                            maxScore: 5
                        },
                        {
                            text: "Quel est votre niveau de satisfaction vis-à-vis de votre VISAGE ?",
                            type: "multiple-choice",
                            options: [
                                { text: "Très insatisfait(e)", score: 1 },
                                { text: "Insatisfait(e)", score: 2 },
                                { text: "Ni satisfait(e), ni insatisfait(e)", score: 3 },
                                { text: "Satisfait(e)", score: 4 },
                                { text: "Très satisfait(e)", score: 5 }
                            ],
                            maxScore: 5
                        },
                        {
                            text: "Quel est votre niveau de satisfaction vis-à-vis de votre MUSCULATURE ou tonicité ?",
                            type: "multiple-choice",
                            options: [
                                { text: "Très insatisfait(e)", score: 1 },
                                { text: "Insatisfait(e)", score: 2 },
                                { text: "Ni satisfait(e), ni insatisfait(e)", score: 3 },
                                { text: "Satisfait(e)", score: 4 },
                                { text: "Très satisfait(e)", score: 5 }
                            ],
                            maxScore: 5
                        },
                        {
                            text: "Quel est votre niveau de satisfaction vis-à-vis de votre APPARENCE GÉNÉRALE ?",
                            type: "multiple-choice",
                            options: [
                                { text: "Très insatisfait(e)", score: 1 },
                                { text: "Insatisfait(e)", score: 2 },
                                { text: "Ni satisfait(e), ni insatisfait(e)", score: 3 },
                                { text: "Satisfait(e)", score: 4 },
                                { text: "Très satisfait(e)", score: 5 }
                            ],
                            maxScore: 5
                        }
                    ]
                },
                {
                    id: "personality",
                    name: "Traits de personnalité - DISC",
                    description: "Identifiez votre profil de personnalité DISC (Dominance, Influence, Stabilité, Conformité).",
                    duration: "10-12",
                    questions: [
                        {
                            text: "Choisissez l'affirmation qui vous correspond le mieux :",
                            type: "multiple-choice",
                            options: [
                                { text: "J'aime relever les défis", score: 1, dimension: "D" },
                                { text: "J'aime travailler en équipe", score: 1, dimension: "S" }
                            ],
                            maxScore: 1
                        },
                        {
                            text: "Choisissez l'affirmation qui vous correspond le mieux :",
                            type: "multiple-choice",
                            options: [
                                { text: "Je suis convaincant(e) dans mes idées", score: 1, dimension: "I" },
                                { text: "Je suis attentif(ve) aux détails", score: 1, dimension: "C" }
                            ],
                            maxScore: 1
                        },
                        {
                            text: "Choisissez l'affirmation qui vous correspond le mieux :",
                            type: "multiple-choice",
                            options: [
                                { text: "Je prends des décisions rapides", score: 1, dimension: "D" },
                                { text: "Je préfère éviter les conflits", score: 1, dimension: "S" }
                            ],
                            maxScore: 1
                        },
                        {
                            text: "Choisissez l'affirmation qui vous correspond le mieux :",
                            type: "multiple-choice",
                            options: [
                                { text: "J'aime être le centre d'attention", score: 1, dimension: "I" },
                                { text: "J'aime faire les choses de manière précise", score: 1, dimension: "C" }
                            ],
                            maxScore: 1
                        },
                        {
                            text: "Choisissez l'affirmation qui vous correspond le mieux :",
                            type: "multiple-choice",
                            options: [
                                { text: "Je suis direct(e) dans ma communication", score: 1, dimension: "D" },
                                { text: "Je suis patient(e) et calme", score: 1, dimension: "S" }
                            ],
                            maxScore: 1
                        },
                        {
                            text: "Choisissez l'affirmation qui vous correspond le mieux :",
                            type: "multiple-choice",
                            options: [
                                { text: "J'aime échanger avec de nouvelles personnes", score: 1, dimension: "I" },
                                { text: "Je respecte les règles établies", score: 1, dimension: "C" }
                            ],
                            maxScore: 1
                        },
                        {
                            text: "Choisissez l'affirmation qui vous correspond le mieux :",
                            type: "multiple-choice",
                            options: [
                                { text: "J'aime prendre le contrôle d'une situation", score: 1, dimension: "D" },
                                { text: "J'aime soutenir les autres", score: 1, dimension: "S" }
                            ],
                            maxScore: 1
                        },
                        {
                            text: "Choisissez l'affirmation qui vous correspond le mieux :",
                            type: "multiple-choice",
                            options: [
                                { text: "Je m'exprime facilement en public", score: 1, dimension: "I" },
                                { text: "J'aime suivre des procédures claires", score: 1, dimension: "C" }
                            ],
                            maxScore: 1
                        },
                        {
                            text: "Choisissez l'affirmation qui vous correspond le mieux :",
                            type: "multiple-choice",
                            options: [
                                { text: "J'ai confiance en mon jugement", score: 1, dimension: "D" },
                                { text: "Je suis loyal(e) et fiable", score: 1, dimension: "S" }
                            ],
                            maxScore: 1
                        },
                        {
                            text: "Choisissez l'affirmation qui vous correspond le mieux :",
                            type: "multiple-choice",
                            options: [
                                { text: "J'aime convaincre les autres", score: 1, dimension: "I" },
                                { text: "J'aime éviter les erreurs", score: 1, dimension: "C" }
                            ],
                            maxScore: 1
                        }
                    ]
                },
                {
                    id: "self_esteem",
                    name: "Estime de soi - Rosenberg",
                    description: "Évaluez votre niveau global d'estime de soi (Échelle de Rosenberg).",
                    duration: "5-7",
                    questions: [
                        {
                            text: "Je me sens globalement satisfait(e) de moi.",
                            type: "multiple-choice",
                            options: [
                                { text: "Pas du tout d'accord", score: 0 },
                                { text: "Plutôt pas d'accord", score: 1 },
                                { text: "Plutôt d'accord", score: 2 },
                                { text: "Tout à fait d'accord", score: 3 }
                            ],
                            maxScore: 3
                        },
                        {
                            text: "Parfois je pense que je ne vaux rien.",
                            type: "multiple-choice",
                            options: [
                                { text: "Pas du tout d'accord", score: 3 },
                                { text: "Plutôt pas d'accord", score: 2 },
                                { text: "Plutôt d'accord", score: 1 },
                                { text: "Tout à fait d'accord", score: 0 }
                            ],
                            maxScore: 3,
                            reverse: true
                        },
                        {
                            text: "Je me sens capable de faire les choses aussi bien que la plupart des gens.",
                            type: "multiple-choice",
                            options: [
                                { text: "Pas du tout d'accord", score: 0 },
                                { text: "Plutôt pas d'accord", score: 1 },
                                { text: "Plutôt d'accord", score: 2 },
                                { text: "Tout à fait d'accord", score: 3 }
                            ],
                            maxScore: 3
                        },
                        {
                            text: "Je pense que je suis un(e) raté(e).",
                            type: "multiple-choice",
                            options: [
                                { text: "Pas du tout d'accord", score: 3 },
                                { text: "Plutôt pas d'accord", score: 2 },
                                { text: "Plutôt d'accord", score: 1 },
                                { text: "Tout à fait d'accord", score: 0 }
                            ],
                            maxScore: 3,
                            reverse: true
                        },
                        {
                            text: "Je me sens digne d'être aimé(e).",
                            type: "multiple-choice",
                            options: [
                                { text: "Pas du tout d'accord", score: 0 },
                                { text: "Plutôt pas d'accord", score: 1 },
                                { text: "Plutôt d'accord", score: 2 },
                                { text: "Tout à fait d'accord", score: 3 }
                            ],
                            maxScore: 3
                        },
                        {
                            text: "Je ressens souvent de la honte à mon égard.",
                            type: "multiple-choice",
                            options: [
                                { text: "Pas du tout d'accord", score: 3 },
                                { text: "Plutôt pas d'accord", score: 2 },
                                { text: "Plutôt d'accord", score: 1 },
                                { text: "Tout à fait d'accord", score: 0 }
                            ],
                            maxScore: 3,
                            reverse: true
                        },
                        {
                            text: "Je pense que j'ai plusieurs bonnes qualités.",
                            type: "multiple-choice",
                            options: [
                                { text: "Pas du tout d'accord", score: 0 },
                                { text: "Plutôt pas d'accord", score: 1 },
                                { text: "Plutôt d'accord", score: 2 },
                                { text: "Tout à fait d'accord", score: 3 }
                            ],
                            maxScore: 3
                        },
                        {
                            text: "J'ai une attitude positive envers moi-même.",
                            type: "multiple-choice",
                            options: [
                                { text: "Pas du tout d'accord", score: 0 },
                                { text: "Plutôt pas d'accord", score: 1 },
                                { text: "Plutôt d'accord", score: 2 },
                                { text: "Tout à fait d'accord", score: 3 }
                            ],
                            maxScore: 3
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
