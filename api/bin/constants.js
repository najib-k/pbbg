//Error types
const ERROR = {
    CHAT: {
        UNKNOWN_CHANNEL_SIO_CHANNELSWITCH: "Unknown channel ID sent to socket.io \"channel-switch\" handler.",
    },
    SOCKET: {
        JWT_HANDSHAKE_FAILED: "Socket.IO handshake failed, the client did not provide a valid JWT.",
    }
}


//Static chat channels
const chatChannels = [
    "main", //main 0
    "test", //test 1
]


const action = {
    STATUS: {
        NEW: "new",
        RUNNING: "running",
        COMPLETED: "completed",
        NONE: "none",
    },
    GATHERING_SUB: {
        mining: "mining",
        fishing: "fishing",
        quarrying: "quarrying",
        foraging: "foraging",
    },
    GATHERING: "gathering",
    BATTLING: "battling",
    MOVING: "moving",
}

const stats = {
    GROWTH: {
        health: 45,
        defense: 2,
        attack: 3,
        chc: 0.6,
        chd: 1,
        initiative: 1,
        evasion: 0,
        hit: 1,
        accuracy: 1,
    },
    AFFGROWTH: {
        health: 4.6,
        defense: 1.4,
        attack: 2.5,
        chc: 0.6,
        chd: 1,
    }
}

const affixes = {
    genLvlMax: 1.3,
    genLvlMin: 0.9,
}

const default_mod = {
    health: {op: '+', value: stats.AFFGROWTH.health},
    defense: {op: '+', value: stats.AFFGROWTH.defense},
    attack: {op: '+', value: stats.AFFGROWTH.attack},
    chd: {op: '*', value: stats.AFFGROWTH.chd},
    chc: {op: '*', value: stats.AFFGROWTH.chc},
}

const ressources = {
    mana: "mana",
    stamina: "stamina",
}

const user = {
    default: {
        stats: {
            maxAction: 100,
            health: stats.GROWTH.health,
            defense: stats.GROWTH.defense,
            attack: stats.GROWTH.attack,
            initiative: 1,
            evasion: 0,
            hit: 1,
            chc: 0,
            chd: 30,
            accuracy: 1,
            level: 1,
            xp: 0,
        },
        currentActions: 100,
    }
}

const battle = {
    maxRounds: 5,
    maxTicks: 150,
    defaultChunk: 50,
    maxHitRange: 150,
    defaultEvasionHitRate: 0.15,
    handlers: {
        onStart: "onStart",
        onRound: "onRound",
        onChunk: "onChunk",
        onTick: "onTick",
        onAttack: "onAttack",
        onDefense: "onDefense",
        onDodge: "onDodge", //Dodged attack
        onAttHit: "onAttHit", //attack hit target
        onDefHit: "onDefHit", //Hit by attack
        onHpLoss: "onHpLoss",
        onHpGain: "onHpGain",
        onDeath: "onDeath",
        onMiss: "onMiss",
    },
    tree: {
        defaultStartRes: {
            [ressources.mana]: 10,
            [ressources.stamina]: 10,
        }
    },
    defaultAttack: "default",
    logType: {
        damage: "damage",
        mod: "mod",
        effect: "effect",
        effectEnd: "effectEnd",
        activation: "activation",
        effectStack: "effectStack",
        damageBuff: "damageBuff",
    },
    effectTypes: {
        ability: "ability",
        dot: "dot",
        buff: "buff",
        debuff: "debuff",
        ranged: "ranged",
        melee: "melee",
        mono: "mono",
        multi: "multi",
        any: "any",
        
    }
}

const damageTypes = {
    normal: "normal",
    fire: "fire",
    ice: "ice",
    earth: "earth",
    wind: "wind",
    toxic: "toxic",
}

const move = {
    try: 1.2,
    cBuff: 1.7,
    danger: 0.95,
    minPass: 5,
    defaultPass: 10,
}

// Querry limit for chat messages
// Currently used outside of query
// TODO limit the actual querying.
const chatMessageLimit = 100;

module.exports = {
    battle,
    action,
    user,
    stats,
    move,
    chatChannels,
    chatMessageLimit,
    ERROR,
    default_mod,
    affixes,
    damageTypes,
}