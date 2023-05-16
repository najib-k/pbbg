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

const user = {
    default: {
        stats : {
            maxAction: 100,
            health: 10,
            defense: 1,
            attack: 1,
            level: 0,
        },
        currentActions: 0,
    }
}

// Querry limit for chat messages
// Currently used outside of query
// TODO limit the actual querying.
const chatMessageLimit = 100;

module.exports =  {
    chatChannels,
    chatMessageLimit,
    ERROR,
}