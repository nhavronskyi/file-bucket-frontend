import React from 'react';
import './styles/App.css';
import {BrowserRouter, Route, Routes} from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import FilesPage from "./pages/FilesPage";
import RegistrationPage from "./pages/RegistrationPage";
import CheckPage from "./pages/CheckPage";
import SavingPage from "./pages/SavingPage";

function App() {
    return (
        <BrowserRouter>
            <Routes>
                {/*<Route index element={<>}*/}
                <Route path="/login" element={<LoginPage/>}/>
                <Route path="/registration" element={<RegistrationPage/>}/>
                <Route path="/files" element={<FilesPage/>}/>
                <Route path="/check" element={<CheckPage/>}/>
                <Route path="/save" element={<SavingPage/>}/>
            </Routes>
        </BrowserRouter>
    );
}

export default App;
