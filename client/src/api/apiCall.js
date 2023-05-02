
//TODO global error handling with status messages.

const loginPOST = async (data) => {
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
    };
    return await fetch('login', requestOptions).then(response => {
        return response.json();
    });
}

const registerPOST = async(data) => {
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
    };
    return await fetch('register', requestOptions).then(response => {
        return response.json();
    });
}

const chatChannelsGET = async () => {
    return await fetch('chat/getChannels').then(response => { return response.json()});
}

const chatChannelMessageGET = async (id) => {
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({channelId: id})
    };
    return await fetch('chat/getChannelMessages', requestOptions).then(response => { return response.json()});
}

export {loginPOST, registerPOST, chatChannelsGET, chatChannelMessageGET};