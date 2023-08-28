//TODO global error handling with status messages.

const token = localStorage.getItem("AuthProviderToken");
const fetcher = (url, options:any = {}) => fetch(url, {...options, headers: {...options.headers || {}, 'Authorization': `Bearer ${token}`}}).then(res => res.json());

const loginPOST = async (data: object) => {
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
    };
    return await fetcher('login', requestOptions);
}

const registerPOST = async(data: object) => {
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
    };
    return await fetcher('register', requestOptions);
}

const chatChannelsGET = async () => {
    return await fetcher('chat/getChannels');
}

const chatChannelMessageGET = async (id: number) => {
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json'},
        body: JSON.stringify({channelId: id})
    };
    return await fetcher('chat/getChannelMessages', requestOptions);
}

/**
 * 
 * @returns /action/last PlayerData
 */
const actionLastGET = async () => {
    return await fetcher('action/last');
}

const actionEquipPOST = async (id) => {
    return await fetcher(`action/equip/${id}`, {method: "POST"})
}


export {loginPOST, registerPOST, chatChannelsGET, chatChannelMessageGET, actionLastGET, actionEquipPOST};