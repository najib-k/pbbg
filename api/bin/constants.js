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
    }
}

const stats = {
    GROWTH: {
        health: 45,
        defense: 2,
        attack: 3,
    }
}
const user = {
    default: {
        stats: {
            maxAction: 100,
            health: stats.GROWTH.health,
            defense: stats.GROWTH.defense,
            attack: stats.GROWTH.attack,
            level: 1,
            xp: 0,
        },
        currentActions: 100,
    }
}

const battle = {
    maxRounds: 50,
}

const move = {
    try: 1.2,
    cBuff: 1.7,
    danger: 0.95,
    minPass: 5,
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
}