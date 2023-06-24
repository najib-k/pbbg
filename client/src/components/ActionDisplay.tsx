import { useState, useEffect, CSSProperties } from 'react';
import { usePlayer } from '../api/apiHooks';
import CircularProgress from '@mui/material/CircularProgress';
import { Grid, LinearProgress, Typography, listItemAvatarClasses } from '@mui/material';
import { useSock } from './SockProvider';
import Box from '@mui/material/Box';

const duration = 6000;

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

export default function ActionDisplay(props) {
    const { player, error, isLoading } = usePlayer();
    const [progress, setProgress] = useState(0);
    const [log, setLog] = useState<any>(null);


    /**
     * This start the update timeout for the UI bar
     * 
     * droplog is updated if bar < 5%, 
     * kind of a hack but much easier than dealing with real-time fetch
     */
    useEffect(() => {
        if (player === null) return;
        if (!player?.lastAction)
            return;

        const timer = setInterval(() => {
            let prog = (Date.now() % duration) / duration * 100;
            if (prog <= 5) {
                const { droplog = [] } = player.lastAction.data;
                if (droplog) {
                    setLog(droplog);
                }
            }
            setProgress(prog);
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
                {(player.lastAction) ?
                    <Grid container direction="row" justifyContent="space-between" alignItems="center">
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
                    </Grid>
                    : <Typography variant="h4" gutterBottom align="center">"Idle"</Typography>
                }

                {(player.lastAction) ? <LinearProgress variant="determinate" value={progress} sx={{ margin: "5px" }} />
                    : null}

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