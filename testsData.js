// testsData.js - Données des tests garanties
console.log('Chargement de testsData.js...');

const testsData = {
    categories: [
        {
            id: "cat1",
            name: "Testez ma condition physique actuelle",
            description: "Évaluez votre condition physique à domicile avec des tests simples et sécurisés.",
            tests: [
                {
                    id: "lower_body_strength",
                    name: "Force des Membres Inférieurs",
                    description: "Test assis-debout de 30 secondes pour évaluer la force de vos jambes.",
                    duration: "5-8",
                    questions: [
                        {
                            text: "Avez-vous le matériel nécessaire : une chaise stable sans accoudoirs et un chronomètre ?",
                            type: "multiple-choice",
                            options: [
                                { text: "Oui, je suis prêt(e)", score: 1 },
                                { text: "Non, je dois me préparer", score: 0 }
                            ]
                        },
                        {
                            text: "Combien de levers complets avez-vous réalisés en 30 secondes ?",
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
                            ]
                        }
                    ]
                },
                {
                    id: "shoulder_flexibility",
                    name: "Souplesse des Épaules",
                    description: "Évaluez la mobilité de vos épaules en joignant vos mains derrière le dos.",
                    duration: "3-5",
                    questions: [
                        {
                            text: "Test main droite en haut : Quelle est la distance entre vos doigts derrière le dos ?",
                            type: "multiple-choice",
                            options: [
                                { text: "Mes doigts se chevauchent (excellent)", score: 5 },
                                { text: "Mes doigts se touchent juste", score: 4 },
                                { text: "1-2 cm d'écart", score: 3 },
                                { text: "3-5 cm d'écart", score: 2 },
                                { text: "Plus de 5 cm d'écart", score: 1 }
                            ]
                        },
                        {
                            text: "Test main gauche en haut : Quelle est la distance entre vos doigts derrière le dos ?",
                            type: "multiple-choice",
                            options: [
                                { text: "Mes doigts se chevauchent (excellent)", score: 5 },
                                { text: "Mes doigts se touchent juste", score: 4 },
                                { text: "1-2 cm d'écart", score: 3 },
                                { text: "3-5 cm d'écart", score: 2 },
                                { text: "Plus de 5 cm d'écart", score: 1 }
                            ]
                        }
                    ]
                },
                {
                    id: "static_balance",
                    name: "Équilibre Statique",
                    description: "Test d'équilibre sur une jambe pendant 30 secondes maximum.",
                    duration: "5-8",
                    questions: [
                        {
                            text: "Combien de temps avez-vous tenu en équilibre sur votre jambe droite ?",
                            type: "multiple-choice",
                            options: [
                                { text: "30 secondes (maximum)", score: 5 },
                                { text: "20-29 secondes", score: 4 },
                                { text: "10-19 secondes", score: 3 },
                                { text: "5-9 secondes", score: 2 },
                                { text: "Moins de 5 secondes", score: 1 }
                            ]
                        },
                        {
                            text: "Combien de temps avez-vous tenu en équilibre sur votre jambe gauche ?",
                            type: "multiple-choice",
                            options: [
                                { text: "30 secondes (maximum)", score: 5 },
                                { text: "20-29 secondes", score: 4 },
                                { text: "10-19 secondes", score: 3 },
                                { text: "5-9 secondes", score: 2 },
                                { text: "Moins de 5 secondes", score: 1 }
                            ]
                        }
                    ]
                },
                {
                    id: "cardiovascular_endurance",
                    name: "Endurance Cardiovasculaire",
                    description: "2 minutes de montées de genoux pour tester votre endurance.",
                    duration: "5-7",
                    questions: [
                        {
                            text: "Combien de montées de genoux avez-vous réalisées en 2 minutes ?",
                            type: "number",
                            placeholder: "Nombre total de montées"
                        },
                        {
                            text: "Comment vous sentiez-vous à la fin du test ?",
                            type: "multiple-choice",
                            options: [
                                { text: "Pas essoufflé(e), je pouvais continuer", score: 4 },
                                { text: "Légèrement essoufflé(e)", score: 3 },
                                { text: "Bien essoufflé(e) mais ça va", score: 2 },
                                { text: "Très essoufflé(e), j'ai dû ralentir", score: 1 }
                            ]
                        }
                    ]
                }
            ]
        }
    ]
};

// Export global
window.testsData = testsData;

console.log('testsData chargé avec succès:', testsData);
