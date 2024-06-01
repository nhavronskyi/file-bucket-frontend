import {Box} from "@mui/material";
import React from "react";
import Header from "./helpers/Header";
import NotFound from "./helpers/NotFound";

function NotFoundPage() {
    return (
        <Box className="main">
            <Header/>
            <NotFound/>
        </Box>
    );
}

export default NotFoundPage;