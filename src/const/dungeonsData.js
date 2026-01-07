// Estructura de datos para Dungeons
// Cada dungeon puede tener múltiples variantes de dificultad
// Cada variante puede tener mecánicas diferentes y múltiples bosses

export const dungeonsData = [
    {
        id: "vajiramon",
        name: "Vajiramon",
        description: "Dungeon con mecánicas basadas en % de HP del boss",
        variants: [
            {
                difficulty: "SSS",
                generalMechanics: [],
                bosses: [
                    {
                        name: "Vajiramon",
                        mechanics: [
                            "🔴 80% HP: Área que amplifica daño recibido (después de esto la tira recurrentemente)",
                            "  └─ 1ra vez: 20% de amplificación",
                            "  └─ 2da vez: 100% de amplificación",
                            "",
                            "🎯 60% HP: Skill target a 2 jugadores (después de esto la tira recurrentemente)",
                            "",
                            "☠️ 40% HP: Venenos de área grande (única vez)",
                            "",
                            "⚡ 30% HP: Skills target a todos los jugadores",
                            "  └─ 8 skills seguidas a cada jugador",
                            "  └─ Después de la última: Stack todos juntos en el centro",
                            "  └─ Por último: Tira un split (separarse)",
                            "",
                            "👾 10% HP: Invoca 2 bichos",
                            "  └─ Matar ambos bichos",
                            "  └─ Cada uno da un ítem (ícono de disket)",
                            "  └─ Cada ítem le saca 5% HP al jefe"
                        ]
                    }
                ]
            }
        ]
    }
];

// Agregar más dungeons aquí siguiendo la misma estructura
