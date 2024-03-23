import {Box} from "@mui/material";
import Login from "./helpers/Login";
import Header from "./helpers/Header";
import '../styles/App.css';

function LoginPage() {
    return (
        <Box className="main">
            <Header/>
            <Login/>
        </Box>
    );
}

export default LoginPage;