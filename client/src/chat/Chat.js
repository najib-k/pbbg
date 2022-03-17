import React from 'react';
import { ChannelList } from './ChannelList';
import './chat.scss';
import {MessagePanel} from "./MessagePanel";

export class Chat extends React.Component {

    state = {
        channels: [{id: 1, name: 'first', participants: 10}]
    }

    componentDidMount() {
        this.loadChannels();
    }

    loadChannels = async () => {
        fetch('/chat/getChannels').then(async response => {
            let data = await response.json();
            this.setState({ channels: data.channels });
            console.log("data = ");
            console.log(data);
        }).catch((err) => console.log(err));
    }

    render () {
        return (
            <div className="chat-app">
                <ChannelList channels={this.state.channels}/>
                <MessagePanel/>
            </div>
        );
    }
}