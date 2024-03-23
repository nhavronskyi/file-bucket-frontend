import {AppBar, Toolbar, useScrollTrigger} from "@mui/material";
import {useEffect, useState} from "react";
import logo from "../../images/logo.png"

export function Header() {
    const trigger = useScrollTrigger({
        disableHysteresis: true, threshold: 50,
    });

    const [headerSize, setHeaderSize] = useState("regular");
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    const handleLogout = () => {
        localStorage.removeItem("token");
        setIsLoggedIn(false);
    };

    useEffect(() => {
        const handleScroll = () => {
            const scrollPosition = window.scrollY;
            if (scrollPosition > 50) {
                setHeaderSize("small");
            } else {
                setHeaderSize("regular");
            }
        };

        window.addEventListener("scroll", handleScroll);

        return () => {
            window.removeEventListener("scroll", handleScroll);
        };
    }, []);

    useEffect(() => {
        const token = localStorage.getItem("token");
        setIsLoggedIn(!!token);
    }, []);


    return (<AppBar
        position="fixed"
        className={trigger ? `header scrolled ${headerSize}` : "header"}
        sx={{backgroundColor: "grey", color: "white"}}
    >
        <Toolbar className="header-container">
            <a href="http://localhost:3000/check"><img src={logo} alt="Logo"
                                                       style={{width: "50px", height: "50px", marginLeft: "38px"}}/></a>
            <div className="logo">
                <h2 style={{
                    marginRight: "450px",
                }}>File-Bucket</h2>
            </div>
            <div className="header-links">
                <a className="all-events" href="http://localhost:3000/check">Check File</a>
                {isLoggedIn && (
                    <a className="create-event" href="http://localhost:3000/save">
                        Save File
                    </a>
                )}
                {isLoggedIn && (
                    <a className="create-event" href="http://localhost:3000/files">
                        Files
                    </a>
                )}
                {!isLoggedIn && (
                    <a className="register" href="http://localhost:3000/registration">
                        Registration
                    </a>
                )
                }
                {!isLoggedIn && (
                    <a className="login" href="http://localhost:3000/login">
                        Login
                    </a>
                )}
                {isLoggedIn && (
                    <a className="logout" href="http://localhost:3000/check" onClick={handleLogout}>
                        Logout
                    </a>
                )}
            </div>
        </Toolbar>
    </AppBar>);
}

export default Header;