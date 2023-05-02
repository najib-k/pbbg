
import Channel from './Channel';


export default function ChannelList(props) {
    let {channels, active} = props;
    let list = "no channels";

    const handleClick = id => {
        props.onSelectChannel(id);
    }

    if (channels?.length > 0) {
        list = channels.map((c, idx) => <Channel key={c.id} active={c.id === active} id={c.id} name={c.name} participants={c.participants} onClick={handleClick}/>);
    }

    return (

            <div className="channel-list">
                {list}
            </div>
    )
}