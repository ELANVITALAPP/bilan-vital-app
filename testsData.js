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
