
export default function Message(props: any) {


    return (
        <div className="message-item" style={{ backgroundColor: props.bgcolor,  }}>

            <div>
                <b>{props.senderName}: </b>
                <span>{props.text}</span>
            </div>
        </div>

    )
}