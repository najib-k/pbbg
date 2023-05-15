import { useState, useEffect} from 'react';
import { usePlayer } from '../api/apiHooks';
import CircularProgress from '@mui/material/CircularProgress';
import { LinearProgress, Typography } from '@mui/material';
import { useSock } from './SockProvider';
import Box from '@mui/material/Box';

export default function ActionDisplay(props) {
    const { player, isError, isLoading } = usePlayer();
    const [progress, setProgress] = useState(0);

    
    useEffect(() => {
        const {action: {endDate, duration}} = player;
        if (duration <= 0) return;
        const timer = setInterval(() => {
            let target = endDate.getTime() - Date.now();
            let prog = 100 - (target / duration * 100);
            setProgress(prog >= 100 ? 0 : prog);
        }, 400);

        return () => {
            clearInterval(timer);
        }
    }, [])
    
    
    if (isLoading) return <CircularProgress />;

    return (
        <>
            <Box sx={{ width: "100%", height: "100%", position: "relative", backgroundColor: "rgba(51, 204, 255, 0.7)", border: "10px" }}>
                <Typography variant="h4" gutterBottom align="center">
                    {player.action.name}
                </Typography>
                <LinearProgress variant="determinate" value={progress} sx={{margin: "5px"}}/>
            </Box>

        </>
    )
}