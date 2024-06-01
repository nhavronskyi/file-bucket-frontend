import {Box} from "@mui/material";

export function NotFound() {
    return (
        <Box className="settings error-page">
            <p className="number">404</p>
            <p className="text">PAGE NOT FOUND🚨</p>
        </Box>
    );
}

export default NotFound