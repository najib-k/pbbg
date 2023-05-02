import { useState } from "react";
import Message from "./Message";
import {primary, secondary} from "./constants";

export default function MessagePanel(props: any) {

    const [input_value, setInputValue] = useState('');
    let channel = props.channel;

    const inputHandler = (e: any) => {
        if (e.target.value.length <= 240)
            setInputValue(e.target.value);
        //TODO alert: message too long
    }

    const send = (event: any) => {
        event.preventDefault();
        if (input_value && input_value !== '') {
            console.log("Message panel sending: " + input_value);
            props.onSendMessage(input_value);
            setInputValue('');
        }
    }


    let list = <div className="no-content-message">No messages to be displayed.</div>;
    if (channel?.messages) {
        let messages = channel.messages;
        list = messages.map((m: any, index: number) => <Message key={m.id} id={m.id} senderName={m.player.name} text={m.text} bgcolor={(index % 2) ? primary.msgBgColor : secondary.msgBgColor}/>);
    }

    return (
        <form onSubmit={send} id="messageForm">
            <div className="messages-panel" style={{}}>
                {channel &&
                    <div className="messages-input">

                        <input type="text" onChange={inputHandler} value={input_value}/>
                        <button type="submit">Send</button>
                    </div>}

                <div className="messages-list" style={{ flex: 1, width: '100%', overflowX: "clip", overflowY: "scroll" }}>{list}</div>

            </div>
        </form>
    );
}