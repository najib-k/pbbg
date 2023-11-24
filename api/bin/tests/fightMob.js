const abilities = require('../abilities/index');
const { battlingProfile, test } = require('../battleHandler.js');
const { user, battle: { handlers }, battle } = require('../constants.js');



let baseP = {
    name: "p",
    tree: {
        duration: 10,
        ability: {
            hitStat: "hit",
        },
        buff: {
            hit: 1,
        },
        run: battle.defaultAttack,
    },
    lvl: 1,
    stats: {
        ...user.default.stats,
        attack: 100,
        health: 10000,
    }
}

let baseM = {
    name: "m",
    lvl: 1,
    tree: {
        duration: 10,
        ability: {
            hitStat: "hit",
        },
        buff: {
            hit: 1,
        },
        run: battle.defaultAttack,
    },
    stats: {
        ...user.default.stats,
        attack: 5,
        health: 10000,
    },

}

let objM = [
    {
        name: "claws",
        keywords: [{
            name: "poison",
            effects: [
                {
                    handlers: [handlers.onAttack],
                    run: "poison",
                }
            ]
        }]
    }
]
let objP = [
    {
        name: "sword",
        keywords: [{
            name: "poison",
            effects: [
                {
                    handlers: [handlers.onAttack],
                    run: "poison",
                }
            ]
        }],
        affixes: [
            {
                "mod": {
                    "attack": {
                        "kw": 0,
                        "op": "+",
                        "value": 5.02
                    },
                },
            }
        ]
    },
    {
        name: "lt jckt",
        keywords: [
            {
                name: "vanish",
                effects: [
                    {
                        handlers: [handlers.onDefense],
                        run: "vanish",
                    },
                    {
                        handlers: [handlers.onDodge, handlers.onAttack],
                        run: "counterAttack",
                    }
                ]
            }
        ],
        affixes: [
            {
                mod: {
                    "defense": {
                        "kw": 0,
                        "op": "+",
                        "value": 2.09
                    }
                }
            }
        ]
    }
]



let g = [[battlingProfile(baseP, objP)], [battlingProfile(baseM, objM)]]

const {groups, battleLog} = test(g);
console.log(groups);
battleLog.forEach(l => console.log(l.message));