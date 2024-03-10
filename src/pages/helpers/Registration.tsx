import React, {useState} from "react";
import {register} from "../../services/AuthService";
import {TextField} from "@mui/material";
import {useNavigate} from "react-router-dom";

export function Registration() {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [passwordMismatch, setPasswordMismatch] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");
    const navigate = useNavigate();

    const handleRegistration = async (e: React.FormEvent) => {
        e.preventDefault();

        if (password !== confirmPassword) {
            setPasswordMismatch(true);
            return;
        }

        try {
            const response = await register(email, password);

            if (response.ok) {
                const responseText = await response.text();
                if (responseText.length !== 0) {
                    localStorage.setItem('token', responseText);
                    navigate(`/files`);
                    window.scrollTo(0, 0);
                } else {
                    setErrorMessage("User with this email already exists");
                }
            } else {
                setErrorMessage("User with this email already exists");
            }
        } catch (error) {
            setErrorMessage("Some problems with registration");
        }
    };

    return (<div className="login-register-container register-page">
        <div className="login-register-form">
            <h2>Registration</h2>
            <form onSubmit={handleRegistration}>
                <TextField name="email" fullWidth label="Email"
                           type="email" variant="standard" value={email}
                           style={{marginBottom: '30px'}}
                           InputLabelProps={{
                               style: {fontSize: '18px'}
                           }}
                           onChange={(e) => setEmail(e.target.value)}/>
                <TextField name="password" fullWidth label="Password"
                           type="password" variant="standard" value={password}
                           style={{marginBottom: '30px'}}
                           InputLabelProps={{
                               style: {fontSize: '18px'},
                           }}
                           onChange={(e) => setPassword(e.target.value)}
                />
                <TextField name="password" fullWidth label="Repeat Password"
                           type="password" variant="standard" value={confirmPassword}
                           style={{marginBottom: '30px'}}
                           InputLabelProps={{
                               style: {fontSize: '18px'},
                           }}
                           onChange={(e) => {
                               setConfirmPassword(e.target.value);
                               setPasswordMismatch(false);
                           }}/>
                {passwordMismatch && <p className="error-message">Passwords don't match</p>}
                {errorMessage && (
                    <p className="error-message">{errorMessage}</p>
                )}
                <div className="button-container">
                    <button type="submit" id="create">Registration</button>
                </div>
            </form>
        </div>
    </div>)
}

export default Registration;