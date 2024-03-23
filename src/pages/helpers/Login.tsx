import React, {useState} from "react";
import {login} from "../../services/AuthService";
import {TextField} from "@mui/material";
import {useNavigate} from "react-router-dom";

export function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault()
        const response: Response = await login(email, password);
        if (!response.ok) {
            return;
        }

        const json = JSON.parse(await response.text())

        localStorage.setItem('token', json.token)
        navigate('/check')
    }

    return (<div className="login-register-container login-page">
        <div className="login-register-form">
            <h2 className="login-register-title">Login</h2>
            <form onSubmit={handleLogin}>
                <TextField name="email" fullWidth label="Email"
                           variant="standard" value={email}
                           style={{marginBottom: '40px'}}
                           InputLabelProps={{
                               style: {fontSize: '18px'},
                           }}
                           onChange={(e) => setEmail(e.target.value)}/>
                <br/>
                <TextField name="password" fullWidth label="Password"
                           type="password" variant="standard" value={password}
                           style={{marginBottom: '15px'}}
                           InputLabelProps={{
                               style: {fontSize: '18px'},
                           }}
                           onChange={(e) => setPassword(e.target.value)}
                />
                <br/>
                <div className="button-container">
                    <button type="submit" id="create">Login</button>
                </div>
                <a className="register" href="http://localhost:3000/registration">Register</a>
            </form>
        </div>
    </div>)
}

export default Login;