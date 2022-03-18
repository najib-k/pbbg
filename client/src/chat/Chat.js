import React from 'react';
import { ChannelList } from './ChannelList';
import './chat.scss';
import {MessagePanel} from "./MessagePanel";
import socketClient from "socket.io-client";

const SERVER = "localhost:3369";

export class Chat extends React.Component {

    state = {
        channels: null,
        socket: null,
        channel: null,
    }

    componentDidMount() {
        this.loadChannels();
        this.configureSocket();
    }

    configureSocket = () => {
        var socket = socketClient(SERVER);
        socket.on('connection', () => {
            console.log("front connected");
            if (this.state.channel) {
                this.handleChannelSelect(this.state.channel.id);
            }
        });
        socket.on('channel', channel => {
            let channels = this.state.channels;
            channels.forEach(c => {
                if (c.id === channel.id)
                    c.participants = channel.participants;
            })
            this.setState({channels})
        });
        socket.on('message', message => {
           let channels = this.state.channels;
           channels.forEach(c => {
               if (c.id === message.channel){
                   if (c.messages) {
                       c.messages.push(message);
                   } else {
                       c.messages = [message];

                   }
                   this.setState(channels);
               }
           })
        });
        this.socket = socket;
    }

    loadChannels = async () => {
        fetch('/chat/getChannels').then(async response => {
            let data = await response.json();
            console.log(data.channels[0]);
            this.setState({ channels: data.channels, channel: data.channels[0] });
            console.log("data = ");
            console.log(data);
        }).catch((err) => console.log(err));
    }

    handleChannelSelect = data => {
        this.state.channels.forEach(c => {
            if (c.id === data)
                this.setState({channel: c});
        })
        this.socket.emit('channel-join', {id: data, playerId: 1}, ack => {
            console.log("emitted !")
        })
    }

    sendMessage = (channel, message) => {
        this.socket.emit('message-received', {
            channelId: channel.id,
            message: message,
            player: 1,
            date: Date.now()
        })
    }

    render () {
        return (
            <div className="chat-app">
                <ChannelList channels={this.state.channels} onSelectChannel={this.handleChannelSelect}/>
                <MessagePanel onSendMessage={this.sendMessage} channel={this.state.channel}/>
            </div>
        );
    }
}