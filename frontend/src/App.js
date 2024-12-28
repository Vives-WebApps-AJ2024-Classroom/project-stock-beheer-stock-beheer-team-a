import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route, Link, useNavigate, useLocation } from "react-router-dom";
import { ClerkProvider, SignedIn, SignedOut, SignInButton, useUser } from "@clerk/clerk-react";
import axios from "axios";

import Navbar from './paginas/NavBar'; // Navbar importeren
import UserRoleRedirect from './paginas/UserRoleRedirect'; // Importeer de UserRoleRedirect component

import StudentDashboard from './paginas/StudentDashboard';
import CoachDashboard from './paginas/CoachDashboard';
import AdminDashboard from './paginas/AdminDashboard';

import { Winkels } from "./paginas/winkels";
import { Project } from "./paginas/project";
import { GeenToegang } from "./paginas/GeenToegang";
import { BestellingPlaatsen } from "./paginas/bestelling_plaatsen";
import { GroepsIndeling } from "./paginas/GroepsIndeling";
import { LogPagina } from "./paginas/LogPagina";
import { Home } from "./paginas/Home"; // Zorg ervoor dat dit correct geïmporteerd is
import { ProjectCreatie } from "./paginas/project_aanmaken";
import "./paginas/login.css"; // Zorg dat deze stijl beschikbaar is

const WelcomePage = () => {
    const { user, isSignedIn } = useUser();
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const navigate = useNavigate();


    useEffect(() => {
        if (isSignedIn && user) {
            const emailAddress = user.primaryEmailAddress.emailAddress;
            const [username] = emailAddress.split("@");
            const nameParts = username.split(".");

            console.log(emailAddress);
            console.log([username]);
            if(emailAddress.endsWith('@gmail.com')) { //@vives.be
                localStorage.setItem('role', '0');
                console.log(localStorage);
                console.log("jaja je bent admin");
            } else if (emailAddress.endsWith('@student.vives.be')) {
                localStorage.setItem('role', '2');
                console.log(localStorage);
                console.log("je bent studentje");
            }

            // Voornaam en achternaam opslaan
            if (nameParts.length > 1) {
                setFirstName(capitalizeFirstLetter(nameParts[0]));
                setLastName(capitalizeFirstLetter(nameParts[1]));
                setEmail(emailAddress);

                const rol_id = emailAddress.endsWith('@student.vives.be') ? 2 : 0;

                console.log(rol_id);
                // Verstuur data naar de backend
                sendDataToBackend(capitalizeFirstLetter(nameParts[0]), capitalizeFirstLetter(nameParts[1]), emailAddress, rol_id);
            }
        }
    }, [user, isSignedIn, navigate]);

    const capitalizeFirstLetter = (string) => {
        return string.charAt(0).toUpperCase() + string.slice(1).toLowerCase();
    };

    const sendDataToBackend = async (voornaam, achternaam, email, niveau, projectId, wachtwoord) => {
        try {
            // Controleer of het e-mailadres al bestaat
            const checkResponse = await axios.get(`http://localhost:3001/gebruiker?email=${email}`);
            
            if (checkResponse.data.exists) {
                console.log("Gebruiker bestaat al, geen nieuwe invoer nodig.");
            } else {
                // Als de gebruiker niet bestaat, verstuur de data
                const response = await axios.post("http://localhost:3000/gebruiker", {
                    voornaam,
                    achternaam,
                    email,
                    niveau,
                    projectId: "7",
                    wachtwoord: "defaultwachtwoord",
                });
                console.log("Data succesvol verstuurd:", response.data);
            }
        } catch (error) {
            console.error("Fout bij het controleren of het e-mailadres al bestaat of bij het versturen van data:", error);
        }
    };
    

    return (
        <div className="container">
            <div className="welcome">
                <h1>Welkom!</h1>
                <SignedOut>
                    <div className="button-container">
                        <SignInButton className="styled-button">Ga naar Login</SignInButton>
                    </div>
                </SignedOut>
                <SignedIn>
                    <p>Ingelogd als: {firstName}</p>
                    <Link to="/home" className="styled-button">Ga naar Dashboard</Link>
                </SignedIn>
            </div>
        </div>
    );
};

const RouterApp = () => {
    const { isSignedIn } = useUser();
    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        // Sla de huidige locatie op in sessionStorage bij het laden van de pagina
        if (isSignedIn) {
            sessionStorage.setItem('currentPage', location.pathname); // Huidige locatie opslaan in sessionStorage
        }
    }, [isSignedIn, location.pathname]);

    useEffect(() => {
        // Als de gebruiker niet ingelogd is, naar de loginpagina sturen
        if (!isSignedIn) {
            navigate("/"); // Stuur naar loginpagina, maar niet als de gebruiker al op de loginpagina is
        } else {
            // Als de gebruiker wel is ingelogd, herlaad de pagina naar de opgeslagen locatie
            const currentPage = sessionStorage.getItem('currentPage');
            if (currentPage && location.pathname !== currentPage) {
                navigate(currentPage); // Navigeer naar de opgeslagen locatie
            }
        }

    }, [isSignedIn, location.pathname, navigate]);

    return (
        <Routes>
            <Route path="/" element={<WelcomePage />} />
            <Route path="/login" element={<WelcomePage />} />
            <Route path="/home" element={<Home />} />
            <Route path="/geenToegang" element={<GeenToegang />} />
            <Route path="/bestelling/:projectId" element={<BestellingPlaatsen />} />
            <Route path="/groepsIndeling" element={<GroepsIndeling />} />
            <Route path="/logPagina" element={<LogPagina />} />
            <Route path="/projectCreatie" element={<ProjectCreatie />} />
            <Route path="/project/:projectId" element={<Project />} />
            <Route path="/winkels" element={<Winkels />} />
        </Routes>
    );
};

const App = () => {
    return (
        <Router>
            <ClerkProvider publishableKey={process.env.REACT_APP_CLERK_PUBLISHABLE_KEY}>
                <Navbar />
                <RouterApp />
            </ClerkProvider>
        </Router>
    );
};

export default App;