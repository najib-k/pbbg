import React from 'react';
import Popper from '@mui/material/Popper';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import Fade from '@mui/material/Fade';
import Divider from '@mui/material/Divider';
import {
    bindPopper,
} from 'material-ui-popup-state/hooks';

export default function TilePopover({x, y, terrain, isOpen: {open, target}}) {

    return (
        <div>
            <Popper open={open} anchorEl={target}  transition>
                {({ TransitionProps }) => (
                    <Fade {...TransitionProps} timeout={350}>
                        <Paper sx={{backgroundColor: 'rgba(0,0, 0, 0.6)', color: 'whitesmoke'}}>
                            <Typography>
                                x: {x} | y: {y}
                            </Typography>
                            <Divider variant="middle"/>
                            <Typography>
                                Type: {terrain}
                            </Typography>
                        </Paper>
                    </Fade>
                )}
            </Popper>
        </div>
    )
}