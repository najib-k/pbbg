import * as React from 'react';
import '../App.css';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Link from '@mui/material/Link';


function Copyright(props: any) {
  return (
    <Typography variant="body2" color="text.secondary" align="center" {...props}>
      {'Copyright © '}
      <Link color="inherit" href="https://mui.com/">
        Your Website
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const mdTheme = createTheme({
  components: {
    MuiPaper: {
      styleOverrides: {
        root: {
          backgroundColor: 'antiquewhite',
          height: '100%',
        }
      }
    }
  }
});

function DashboardContent() {

  return (
    <ThemeProvider theme={mdTheme}>
      <Box
        sx={{
          backgroundColor: (theme) =>
            theme.palette.mode === 'light'
              ? theme.palette.grey[100]
              : theme.palette.grey[900],
          flexGrow: 1,
          height: '100%',
          overflow: 'auto',
        }}>

        <Grid container direction="column" justifyContent="flex-start" spacing={3} sx={{ height: '100%' }}>
          <Grid item container sx={{ height: '15%' }} spacing={2}>
            <Grid item xs={10} >
              <Paper >10</Paper>
            </Grid>
            <Grid item xs={2}>
              <Paper >2</Paper>
            </Grid>


          </Grid>
          <Grid item container spacing={2} sx={{ height: '55%' }}>
            <Grid item xs={2}>
              <Paper >2</Paper>
            </Grid>
            <Grid item xs={8}>
              <Paper >2</Paper>
            </Grid>
            <Grid item xs={2}>
              <Paper >2</Paper>
            </Grid>

          </Grid>
          <Grid item container spacing={2} sx={{ height: '30%' }}>
            <Grid item xs={2}>
              <Paper >2</Paper>
            </Grid>
            <Grid item xs={8}>
              <Paper >2</Paper>
            </Grid>
            <Grid item xs={2}>
              <Paper >2</Paper>
            </Grid>

          </Grid>
        </Grid>
      </Box>


      <Box>
        <Copyright></Copyright>
      </Box>
    </ThemeProvider>
  );
}

export default function Dashboard() {
  return <DashboardContent />;
}