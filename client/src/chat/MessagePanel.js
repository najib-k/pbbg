import React from "react";
import { Message } from "./Message";

export class MessagePanel extends React.Component {
    render() {

        let list = <div className="no-content-message">No messages to be displayed.</div>;
        if (this.props.channel && this.props.channel.messages) {
            list = this.props.channel.messages.map(m => <Message key={m.id} id={m.id} senderName={m.senderName}
                                                                 text={m.text}/>);
        }

        return (
            <div className="messages-panel">

                <div className="messages-list">{list}</div>

                <div className="messages-input">

                    <input type="text"/>
                        <button>Send</button>
                </div>
            </div>
        );
    }
}