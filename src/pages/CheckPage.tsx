import {Box} from "@mui/material";
import Check from "./helpers/Check";
import React from "react";
import Header from "./helpers/Header";

function CheckPage() {
    return (
        <Box className="main">
            <Header/>
            <Check/>
        </Box>
    );
}

export default CheckPage;