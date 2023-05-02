import { primary, secondary } from "./constants"
import { styled } from "@mui/system";
import { useState } from "react";


export default function Channel(props) {
    const [isHover, setisHover] = useState(false);
    const channelItem = styled('div')({
        backgroundColor: props.active ? primary.chanBgColor : secondary.chanBgColor,
        '&:hover': {
            backgroundColor: "blue !important"
        }
    })


    const click = () => {
        console.log("clic!");
        props.onClick(props.id);
    }

    let backgroundColor =  props.active ? primary.chanBgColor : (isHover ? primary.chanHoverBgColor : secondary.chanBgColor);
    return (
        <div className="channel-item" onClick={click} style={{backgroundColor}} onMouseEnter={() => setisHover(true)} onMouseLeave={() => setisHover(false)}>
            <div>{props.id} | {props.name} </div>
            <span>{props.participants}</span>
        </div>
    )
}