import { useState, useEffect, CSSProperties, useRef } from 'react';
import { usePlayer } from '../api/apiHooks';
import CircularProgress from '@mui/material/CircularProgress';
import { Grid, LinearProgress, Typography, listItemAvatarClasses } from '@mui/material';
import { useSock } from './SockProvider';
import Box from '@mui/material/Box';

const duration = 6000;

const ActionComponents = {
    "battling": BattlingAction,
    "moving": MovingAction,
    "gathering": GatheringAction,
}

function CombatProfile({ target }: any) {
    let { name, stats: { health, remainingHealth, attack, defense }, lvl } = target;
    let style: CSSProperties = {
        width: "180px",
        height: "120px",
        borderWidth: "1px",
        borderStyle: "solid",
        borderColor: "black",
    }

    let hpp = (remainingHealth / health * 100).toFixed(2);
    return (
        <>
            <Box sx={style} alignContent={"center"}>
                <Typography align="center" gutterBottom variant="body1">[{lvl}] {name}</Typography>
                <Box sx={{ width: "90%", height: "20px", border: "thin", position: "relative", backgroundColor: "lightblue", margin: "auto" }}>
                    <Box sx={{ width: `${hpp}%`, height: "100%", backgroundColor: "blue" }}></Box>
                    <Typography gutterBottom variant="body2" sx={{ position: "absolute", top: 0, left: "40%", textAlign: "center", flexGrow: 1 }}>{hpp}%</Typography>
                    <Typography>Attack: {attack}</Typography>
                    <Typography>Defense: {defense}</Typography>

                </Box>
            </Box>
        </>
    )
}

function MovingAction({ player }) {
    let { type, data } = player.lastAction;
    let { tries, pass, loot, combat } = data;
    return (
        <>
            <Grid item xs={12}>
                <Typography variant='h5' align='center'>
                    STEP: {pass} / 10
                </Typography>
                <Typography variant='body1' align='center'>
                    {tries} failed attempt so far.
                </Typography>
                <Typography variant="h4" gutterBottom align="center">
                    {type}
                </Typography>
            </Grid>

            <Grid container item xs={12}>
                {combat?.status !== "none" && <>
                    <Grid item>
                        <CombatProfile target={player} />
                    </Grid>
                    <Grid item>
                        <CombatProfile target={combat.data.ennemy} />
                    </Grid>
                </>}
            </Grid>


            <Grid item xs={12}>
                <Box sx={{ width: "400px", height: "300px", overflowX: "wrap", overflowY: 'hidden' }}>
                    {loot && loot.map(({ amount, name }) =>
                        <Box>
                            <Typography variant='body1'>
                                {amount} {name}
                            </Typography>
                        </Box>
                    )}
                </Box>
            </Grid>
        </>
    )
}

function GatheringAction({ player }) {
    let { gathered: { name, amount }, type } = player.lastAction.data;
    return (<>
        <Typography> {type} </Typography>
        <Typography>+{amount} {name}</Typography>
    </>)
}


function BattlingAction({ player }) {
    return (
        <>
            <Grid item xs={4}>
                <CombatProfile target={player} />
            </Grid>

            <Grid item xs={4}>
                <Typography variant="h4" gutterBottom align="center">
                    {player.lastAction.type}
                </Typography>
            </Grid>

            <Grid item xs={4}>
                <CombatProfile target={player.lastAction.data.ennemy} />
            </Grid>
        </>
    )
}

export default function ActionDisplay(props) {
    const { player, error, isLoading } = usePlayer();
    const [progress, setProgress] = useState(0);
    const [log, setLog] = useState<any>(null);
    const prog = useRef({ d: Date.now(), p: 0 });

    let Action = ActionComponents[player?.lastAction?.type] ?? null;


    /**
     * This start the update timeout for the UI bar
     * 
     * droplog is updated if bar < 5%, 
     * kind of a hack but much easier than dealing with real-time fetch
     */
    useEffect(() => {
        prog.current.p = 0;
        setProgress(0);
        if (player === null) return;
        if (!player?.lastAction)
            return;

        const timer = setInterval(() => {
            /* let prog = (Date.now() % duration) / duration * 100;
            if (prog <= 5) {
                const { droplog = [] } = player.lastAction.data;
                if (droplog) {
                    setLog(droplog);
                }
            }
            setProgress(prog); */
            let { d, p } = prog.current;
            d = Date.now();
            p += (d - prog.current.d) / duration * 100;
            prog.current = { d, p: Math.min(p, 100) };
            if (prog.current.p <= 5) {
                const { droplog = [] } = player.lastAction.data;
                if (droplog) {
                    setLog(droplog);
                }
            }
            setProgress(prog.current.p);
        }, 500);

        return () => {
            clearInterval(timer);
        }
    }, [player])


    if (isLoading) return <CircularProgress />;
    if (error) return (<>Error: {error}</>)

    return (
        <>
            <Box sx={{ width: "100%", height: "100%", position: "relative", backgroundColor: "rgba(51, 204, 255, 0.7)", border: "10px" }}>
                {true ?
                    <>
                        <Grid container direction="row" justifyContent="space-between" alignItems="center">
                            {Action && <Action player={player} />}
                        </Grid>
                        <LinearProgress variant="determinate" value={progress} sx={{ margin: "5px" }} />
                    </>
                    : <Typography variant="h4" gutterBottom align="center">"Idle"</Typography>
                }

                <Box>
                    {Array.isArray(log) && log.length > 0 ? log.map(({ amount, name }) => {
                        return <Typography key={`${amount}-${name}`} align="center" gutterBottom variant="body2">+{amount} {name}</Typography>
                    })
                        : <Typography align="center" gutterBottom variant="body2">nope !</Typography>}
                </Box>
            </Box>

        </>
    )
}