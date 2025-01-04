import React from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { SignedIn, SignedOut, useClerk } from "@clerk/clerk-react";
import { CheckUserLS, apiURL } from '../page-tools';


const Navbar = () => {
    let userArr = CheckUserLS()
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
                    {/*<Link to={"/project/"+userArr[4]}>Overzicht</Link>*/}
                    <Link to="/winkels">Winkels</Link>
                    <Link to="/logPagina">Log pagina</Link>
                    <Link to="/proOverzicht">Project Links</Link>
                    <Link to={process.env.REACT_APP_PHPMYADMIN_URL}>phpMyAdmin</Link>       
                </>
            )}
            {userArr[3] == 2 && (  
                <>
                    <Link to={"/project/"+userArr[4]}>Overzicht</Link>
                    <Link to={"/bestelling/"+userArr[4]}>Bestelling plaatsen</Link>
                    <Link to="/winkels">Winkels</Link>  {/*studenten moeten ook de winkels kunnen zien */}
                
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
