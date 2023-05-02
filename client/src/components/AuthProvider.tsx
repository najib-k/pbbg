import {useContext, createContext, useState} from 'react';
import { loginPOST, registerPOST } from '../api/apiCall';
import { useNavigate, useLocation } from 'react-router-dom'


const AuthContext = createContext({});

const useAuth: any = () => useContext(AuthContext);

const AuthProvider = (props: any) => {
    let { children } = props;
    const [token, setToken] = useState(localStorage.getItem("AuthProviderToken") ?? null);
    const [player, setPlayer] = useState(null);

    const location = useLocation();
    const navigate = useNavigate();

    const handleLogin = async (data: any) => {
        const res = await loginPOST(data);
        if (res.token) {
            localStorage.setItem("AuthProviderToken", res.token);
            setToken(res.token);
            const origin = location.state?.from?.pathname || '/dashboard';
            if (res.player)
                setPlayer(res.player);
            navigate(origin);
        } else {
            return res;
        }
    };

    //Navigate back to login after register
    const handleRegister = async (data: any) => {
        const res = await registerPOST(data);
        //Un peu con non ? Token pas utile si on redirige pas sur le dashboard avec infos Player derrière
        if (res.token) {
            setToken(res.token);
            const origin = '/';
            navigate(origin);
        } else {
            return res;
        }
    };

    //Remove token and navigate back to login.
    //TODO remove from local storage
    const handleLogout = () => {
        localStorage.removeItem("AuthProviderToken");
        setToken(null);
        navigate('/');
    }

    const value = {
        token,
        player,
        onLogin: handleLogin,
        onlogout: handleLogout,
        onRegister: handleRegister,
    };

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    )
}

export { AuthProvider, useAuth }