export const colosseumHeroData = [
    {
        floor: 1,
        digimon: "Omegamon",
        attribute: "Vacuna",
        element: "Luz",
        mechanics: [
            "Se le pega a full y se esquiva todo.",
        ]
    },
    {
        floor: 2,
        digimon: "Dexmon",
        attribute: "Virus",
        element: "Oscuridad",
        mechanics: [
            "Se le pega a full y se esquiva todo.",
            "Si se va justo de daño, tirará un stack en el cual deben ponerse todos juntos debajo del raid."
        ]
    },
    {
        floor: 3,
        digimon: "Minervamon",
        attribute: "Virus",
        element: "Metal",
        mechanics: [
            "Pegar y esquivar.",
            "Muy importante esquivar los coletazos (lanza las pelotas de las coletas dos veces y luego un círculo grande de 'return').",
            "⚠️ Si te da el debuff de return y pegas, mueres instantáneamente."
        ]
    },
    {
        floor: 4,
        digimon: "Shoutmon X5",
        attribute: "Unknown",
        element: "Metal",
        mechanics: [
            "Lanza círculos grandes y pequeños. Pegar y esquivar.",
            "Los DPS skiller deben esquivar el círculo grande porque silencia."
        ]
    },
    {
        floor: 5,
        digimon: "Apocalimon",
        attribute: "Unknown",
        element: "Oscuridad",
        mechanics: [
            "Círculo pequeño (frecuente): Si te ralentiza, usa buff de MS o quita/pon el buff de DS.",
            "Círculo grande (Return): ⚠️ Esquivar a toda costa; si te da, no pegues hasta que se vaya."
        ]
    },
    {
        floor: 6,
        digimon: "Dynasmon X",
        attribute: "Data",
        element: "Viento",
        mechanics: [
            "Pegar y esquivar.",
            "El círculo grande silencia a los DPS skiller."
        ]
    },
    {
        floor: 7,
        digimon: "Fanglomon",
        attribute: "Data",
        element: "Tierra",
        mechanics: [
            "Splits (Círculo grande): Separarse (el tanque o agro se queda solo).",
            "Stacks (Círculo pequeño): Todos juntos debajo del raid."
        ]
    },
    {
        floor: 8,
        digimon: "Dukemon",
        attribute: "Virus",
        element: "Luz",
        mechanics: [
            "Círculos amarillos y azules: Esquivar todo.",
            "⚠️ Si te da un azul, no dejes que te de un amarillo o morirás."
        ]
    },
    {
        floor: 9,
        digimon: "Mastepon",
        attribute: "Vacuna",
        element: "Luz",
        mechanics: [
            "50% HP: Salen 2 pets (Angewomon y LadyDevimon). Matar primero a Angewomon, usar el ítem obtenido en LadyDevimon para matarla.",
            "30% HP: Se repite con 2 Angewomon y 2 LadyDevimon.",
            "El encargado de pets debe ser el último en cambiar de Digimon para ganar el agro.",
            "Venenos: Alejarse si te cae. Curar con HOH al encargado si le cae veneno."
        ]
    },
    {
        floor: 10,
        digimon: "Millenniummon",
        attribute: "Virus",
        element: "Oscuridad",
        mechanics: [
            "Esquivar todo hasta el 30%.",
            "30% HP: Tira venenos gigantes (ir a las esquinas).",
            "Secuencia central: El tanque va al centro -> 2 splits -> 3 stacks (todos al centro) -> ciclos de split/stack.",
            "Luego pegar normal."
        ]
    },
    {
        floor: 11,
        digimon: "Susanoomon",
        attribute: "Vacuna",
        element: "Luz",
        mechanics: [
            "Círculos amarillos y azules. Pegar y esquivar.",
            "Si te da azul, evitar el amarillo."
        ]
    },
    {
        floor: 12,
        digimon: "Rafflesimon",
        attribute: "Data",
        element: "Madera",
        mechanics: [
            "Círculos amarillos: Esquivar.",
            "Stacks: Juntarse debajo del raid."
        ]
    },
    {
        floor: 13,
        digimon: "Alphamon Ouryuken X",
        attribute: "Vacuna",
        element: "Luz",
        mechanics: [
            "Círculos amarillos y azules.",
            "Esquivar todo y pegar normal."
        ]
    }
];

export const generalNotes = [
    { title: "STACKS", desc: "Círculos pequeños. Reparten daño si todos están juntos." },
    { title: "SPLITS", desc: "Círculos grandes individuales. Si se juntan dos personas, el daño se multiplica." }
];

export const bugs = [
    { title: "AUTOATAQUE", desc: "Si se queda pegando sin parar, anular usando cualquier skill." },
    { title: "SKILLER", desc: "Si te bloqueas, el tanque debe acercar el raid o debes desevolucionar/evolucionar." }
];
