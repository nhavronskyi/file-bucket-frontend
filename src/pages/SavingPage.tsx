import {Box} from "@mui/material";
import React from "react";
import Header from "./helpers/Header";
import Save from "./helpers/Save";

function CheckPage() {
    return (
        <Box className="main">
            <Header/>
            <Save/>
        </Box>
    );
}

export default CheckPage;