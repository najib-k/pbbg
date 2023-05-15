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

// Querry limit for chat messages
// Currently used outside of query
// TODO limit the actual querying.
const chatMessageLimit = 100;

module.exports =  {
    chatChannels,
    chatMessageLimit,
    ERROR,
}