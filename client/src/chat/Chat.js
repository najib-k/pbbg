import { useState, useEffect } from 'react';
import ChannelList from './ChannelList';
import './chat.scss';
import MessagePanel from "./MessagePanel";
import { useSock } from '../components/SockProvider';
import { chatChannelsGET, chatChannelMessageGET } from '../api/apiCall';

export default function Chat() {

    const [channels, setChannels] = useState([]);
    const [channel, setChannel] = useState(0);
    const socket = useSock();

    async function handleChannelSelect(joinId) {
        if (joinId === channel)
            return;
        let leaveId = channel;
        await chatChannelMessageGET(joinId).then(res => {
            setChannels((chans) => {
                return chans.map((c) => {
                    if (c.id === joinId) {
                        c.participants = res.participants;
                        c.messages = res.messages;
                    }
                    return c;
                });
            });
        });

        setChannel(joinId);
        socket.emit('channel-join', { joinId, leaveId }, ack => {
            console.log("joined channel !")
        })
    };

    /**
     * sends messages through socket io
     * @param {number} chan channel id
     * @param {Object} message message content
     */
    const sendMessage = (message) => {
        console.log("Emoitting message " + message);
        socket.emit('message-received', {
            channelId: channel,
            message: message,
            date: Date.now()
        })
    };

    /**
     * Returns the active channel.
     * @returns {Channel}
     */
    function getChannel() {
        for (let c of channels)
            if (c.id === channel)
                return c;
        return null;
    }

    useEffect(() => {

        function sockOnConnect() {
            console.log("front connected: " + socket.id);
        };

        function sockOnChannel(chan) {
            console.log("OnChannel");

            setChannels((chans) => {
                return chans.map(c => {
                    if (c.id === chan.id)
                        c.participants = chan.participants;
                    return c;
                })
            });
        };

        /**
         * Trigger after a send(), add message to the list of the right object.
         * @param {Object} message received message as object
         */
        function sockOnMessage(message) {
            console.log("OnMessage");
            setChannels((chans) => {
                let newchans = chans.map(c => {
                    if (c.id === message.channelId) {
                        console.log("New message registered");
                        if (c?.messages[0].id !== message.id) {
                            c.messages.unshift(message);
                        } else if (c.messages.length <= 0) {
                            c.messages = [message];
                        }
                    }
                    return c;
                })
                //console.log("newChannels: " + JSON.stringify(newchans));
                return newchans;
            });
        };


        async function loadChannels() {
            let response = await chatChannelsGET();
            //console.log("res chat/getchannels: " + JSON.stringify(response));
            setChannels(response.channels);
            setChannel(response.channels[0].id);
        }

        function configureSocket() {
            socket.connect();
            socket.on('connect', sockOnConnect);
            socket.on("disconnect", () => console.log("Front disconnected"));
            socket.on('channel', sockOnChannel);
            socket.on('message', sockOnMessage);
        }
        loadChannels().then(configureSocket());
        return () => {
            socket.disconnect();
            socket.off('connect', sockOnConnect);
            socket.off("disconnect");
            socket.off('channel', sockOnChannel);
            socket.off('message', sockOnMessage);
        };
    }, []);

    let activeChan = getChannel();

    return (
        <div className="chat-app">
            <ChannelList active={channel} channels={channels} onSelectChannel={handleChannelSelect} />
            <MessagePanel onSendMessage={sendMessage} channel={activeChan} />
        </div>
    );
}