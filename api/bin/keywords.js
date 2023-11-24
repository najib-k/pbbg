const keywords = {
    gearTypes: [
        [ //armors
            {
                name: "hda",
                mod: {
                    health: {
                        op: "*",
                        value: 0.7,
                    }
                },
                type: 0,
            },
            {
                name: "bda",
                type: 0,
            },
            {
                name: "lga",
                type: 0,
            },
            {
                name: "glv",
                type: 0,
            }
        ],
        [ //jewell
            {
                name: "ring",
                type: 1,
            },
        ],
        [ //melee
            {
                name: "sword",
                type: 2,
            },
        ],
        [ //dist
            {
                name: "bow",
                type: 3,
            },
        ],
        [ // cast
            {
                name: "wand",
                type: 4,
            },
        ]
    ],
    default: [
        {
            name: "Devastato",
            type: 0,
        },
        {
            name: "Dragon",
            type: 0,
        },
        {
            name: "HighFlame",
            type: 0,
        }
    ],
    baseGtAffix: [
        {
            mod: {
                health: {
                    value: 0,
                    op: '+',
                },
                defense: {
                    value: 0,
                    op: '+',
                }
            }
        },
    ],
    weaponTypes: {
        sword: "sword",
        dagger: "dagger",
        bow: "bow",
        wand: "wand",
    }
};

module.exports = keywords;