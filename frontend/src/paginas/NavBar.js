import React from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { SignedIn, SignedOut, useClerk } from "@clerk/clerk-react";
import { CheckUserLS, apiURL } from '../page-tools';


const Navbar = () => {
    let userArr = CheckUserLS(useNavigate())
    const location = useLocation();
    const { signOut } = useClerk();

    // Toon de navigatiebalk alleen als de huidige route NIET "/"
    if (location.pathname === "/") {
        return null;
    }

    return (
        <nav>
            <Link to="/home">Home</Link>

            {userArr[3] == 0 && (  
                <>
                    <Link to="/groepsIndeling">GroepsIndeling</Link>
                    <Link to="/projectCreatie">Project aanmaken</Link>
                    <Link to="/project/:projectId">Overzicht</Link>
                    <Link to="/winkels">Winkels</Link>
                    <Link to="/logPagina">Log pagina</Link>                
                </>
            )}
            {userArr[3] == 2 && (  
                <>
                    <Link to="/project/:projectId">Overzicht</Link>
                    <Link to="/bestelling/:projectId">Bestelling plaatsen</Link>
                
                </>
            )}

            <SignedIn>
                <button onClick={() => signOut()}>Log uit</button>
            </SignedIn>
            <SignedOut>
                <Link to="/">Login</Link>
            </SignedOut>
        </nav>
    );
};

export default Navbar;
