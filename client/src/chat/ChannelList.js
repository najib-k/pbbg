import React from 'react';
import { Channel } from './Channel';


export class ChannelList extends React.Component{
    render() {
        let list = `no channels`;
        if (this.props.channels) {
            list = this.props.channels.map(c => <Channel key={c.id} id={c.id} name={c.name} participants={c.participants}/>);
        }
        return (
            <div className="channel-list">
                {list}
            </div>

        );
    }
}