import {Box} from "@mui/material";
import Files from "./helpers/Files";
import Header from "./helpers/Header";

function LoginPage() {
    return (
        <Box className="main">
            <Header/>
            <Files/>
        </Box>
    );
}

export default LoginPage;