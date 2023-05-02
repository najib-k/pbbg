import {useState} from 'react';
import {
    Grid,
    TextField,
    Paper,
    FormControlLabel,
    Checkbox,
    Button,
} from '@mui/material';
import {useAuth} from './AuthProvider';
import {Avatar, Alert, Divider} from '@mui/material';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';




export default function Login() {
    const [inputs, setInputs] = useState({} as any);
    const [formError, setFormError] = useState({} as any);
    const {onLogin, onRegister} = useAuth();

    const paperStyle = { padding: 20, height: '70vh', width: 280, margin: "20px auto" }
    const avatarStyle = { backgroundColor: '#1bbd7e' }
    const btnstyle = { margin: '8px 0' }

    const handleChange = (event: any) => {
        const { name, value } = event.target;
        setInputs((values: any) => ({ ...values, [name]: value }));
    }

    const handleSubmitLogin = async (event: any) => {
        event.preventDefault();
        const {logMail, logPassword} = inputs;
        const data = {
            mail: logMail,
            password: logPassword,
        }
        console.log("logging in with" + JSON.stringify(data));
        const err = await onLogin(data);
        if (err?.error)
            setFormError(err);
    }

    const handleSubmitRegister = async (event: any) => {
        event.preventDefault();
        const {regMail, regName, regPassword} = inputs;
        const data = {
            name: regName,
            mail: regMail,
            password: regPassword,
        }
        console.log("registering in with" + JSON.stringify(data));
        const err = await onRegister(data);
        if (err?.error)
            setFormError(err);
    }

    return (
        <Grid container>
            <Grid item xs={6}>
                <Paper elevation={10} style={paperStyle}>
                    <form onSubmit={handleSubmitLogin} id="loginForm">
                        <Grid>
                            <Avatar style={avatarStyle}><LockOutlinedIcon /></Avatar>
                            <h2>Sign In</h2>
                        </Grid>
                        <TextField onChange={handleChange} label='Mail' placeholder='Enter mail' name='logMail' variant="outlined" fullWidth required />
                        <TextField onChange={handleChange} label='Password' placeholder='Enter password' name='logPassword' type='password' variant="outlined" fullWidth required />
                        <FormControlLabel
                            control={
                                <Checkbox
                                    name="checkedB"
                                    color="primary"
                                />
                            }
                            label="Remember me"
                        />
                        <Button type='submit' color='primary' variant="contained" style={btnstyle} fullWidth>Sign in</Button>
                    </form>
               { formError.error ? <Alert severity="error">{formError.error}</Alert> : null}
                </Paper>
            </Grid>
            <Divider orientation="vertical" variant="middle" flexItem />
            <Grid item xs={6}>
                <Paper elevation={10} style={paperStyle}>
                    <form onSubmit={handleSubmitRegister} id="registerForm">
                        <Grid>
                            <Avatar style={avatarStyle}><LockOutlinedIcon /></Avatar>
                            <h2>Register</h2>
                        </Grid>
                        <TextField onChange={handleChange} label='Username' placeholder='Enter username' name='regName' variant="outlined" fullWidth required />
                        <TextField onChange={handleChange} label='Mail' placeholder='Enter mail' name='regMail' variant="outlined" fullWidth required />
                        <TextField onChange={handleChange} label='Password' placeholder='Enter password' name='regPassword' type='password' variant="outlined" fullWidth required />
                        <FormControlLabel
                            control={
                                <Checkbox
                                    name="checkedB"
                                    color="primary"
                                />
                            }
                            label="Remember me"
                        />
                        <Button type='submit' color='primary' variant="contained" style={btnstyle} fullWidth>Register</Button>
                    </form>
                </Paper>
            </Grid>

        </Grid>
    )
}