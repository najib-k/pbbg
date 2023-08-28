import { SxProps } from "@mui/material"

export const styles = {
    r: [
        { tag: "Cr", name: "Crap", bg: "white" },
        { tag: "Cm", name: "Common", bg: "aqua" },
        { tag: "U", name: "Unique", bg: "darkblue" },
        { tag: "R", name: "Rare", bg: "blueviolet" },
        { tag: "M", name: "Magic", bg: "orangered" },
        { tag: "L", name: "Legendary", bg: "115deg, orangered,crimson,orangered", gradient: true },
        { tag: "B", name: "Blessed", bg: "115deg, crimson,gold,crimson", gradient: true },
        { tag: "A", name: "Artifact", bg: "115deg, gold,aquamarine,gold", gradient: true }
    ],
    kws: {
        default: { background: "grey" },
        Dragon: { background: "yellow" },
        Devastato: { background: "red" },
        HighFlame: { background: "orange" },
    }
}

export const itemDefaults = {
    width: 50,
    height: 50,
}

export function textGradient(gr): SxProps {
    return ({
        backgroundColor: "primary",
        backgroundSize: "100%",
        backgroundImage: "linear-gradient(" + gr + ")",
        WebkitBackgroundClip: "text",
        WebkitTextFillColor: "transparent",
        backgroundRepeat: "repeat",
        backgroundClip: "text",
    })
}

export function backgroundGradient(gr): SxProps {
    return ({
        background: "linear-gradient(" + gr + ")",
    })
}