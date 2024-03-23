import {Box} from "@mui/material";
import Registration from "./helpers/Registration";
import Header from "./helpers/Header";

function LoginPage() {
    return (
        <Box className="main">
            <Header/>
            <Registration/>
        </Box>
    );
}

export default LoginPage;