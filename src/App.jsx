// App.jsx
import { BrowserRouter as Router, Routes, Route, Link, useNavigate } from "react-router-dom";
import React, { useEffect, useState } from "react";
import { ClerkProvider, SignedIn, SignedOut, SignInButton, useUser } from "@clerk/clerk-react";
import "./App.css";
import AllUsers from './AllUsers';  // Hier voegen we het nieuwe component toe
import StudentDashboard from './StudentDashboard';  // Dit is het additionele bestand voor de student
import CoachDashboard from './CoachDashboard';  // Dit is het additionele bestand voor de coach
import AdminDashboard from './AdminDashboard';  // Zorg ervoor dat je het juiste pad hier invult
import UserRoleRedirect from './UserRoleRedirect';  // Zorg ervoor dat je het juiste pad hier invult
import axios from "axios";

function Home() {
  const { user, isSignedIn } = useUser();
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");

  useEffect(() => {
    if (isSignedIn && user) {
      const emailAddress = user.primaryEmailAddress.emailAddress;
      const [username] = emailAddress.split("@");
      const nameParts = username.split(".");

      // Voornaam en achternaam opslaan
      if (nameParts.length > 1) {
        setFirstName(capitalizeFirstLetter(nameParts[0]));
        setLastName(capitalizeFirstLetter(nameParts[1]));
        setEmail(emailAddress);

        const rol_id = emailAddress.endsWith('@student.vives.be') ? 2 : 0;

        // Verstuur data naar de backend
        sendDataToBackend(capitalizeFirstLetter(nameParts[0]), capitalizeFirstLetter(nameParts[1]), emailAddress, rol_id);
      }


    }
  }, [user, isSignedIn]);

  const capitalizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1).toLowerCase();
  };

  const sendDataToBackend = async (voornaam, naam, emailadres, rol_id) => {
    try {
      const response = await axios.post("http://localhost:3000/gebruikers", {
        voornaam,
        naam,
        emailadres,
        wachtwoord: "defaultwachtwoord",
        rol_id
      });
      console.log("Data succesvol verstuurd:", response.data);
    } catch (error) {
      console.error("Fout bij het versturen van data:", error);
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
          <Link to="/dashboard" className="styled-button">Ga naar Dashboard</Link>
        </SignedIn>
      </div>
    </div>
  );
}

function Login() {
  const { signIn } = useClerk();

  useEffect(() => {
    const signInDiv = document.getElementById('sign-in');
    signIn.mount({ signInContainer: signInDiv });
  }, []);

  return (
    <div id="sign-in" className="container">
      <div className="welcome">
        <h1>Inloggen</h1>
        <p>Log in om toegang te krijgen tot je account en dashboard.</p>
      </div>
    </div>
  );
}

/*function Dashboard() {
  const { user, isSignedIn } = useClerk();
  const navigate = useNavigate();

  useEffect(() => {
    if (isSignedIn && user) {
      const { fullName, primaryEmailAddress, id } = user;
      const [naam, voornaam] = fullName ? fullName.split(" ") : ["", ""];

      // Hier bepaal je de rol op basis van het e-mailadres
      const rol_id = primaryEmailAddress.emailAddress.endsWith('@student.vives.be') ? 2 : 1;

      // Stuur de gegevens naar de backend
      axios.post('http://localhost:3000/gebruikers', {
        rol_id,
        naam,
        voornaam,
        emailadres: primaryEmailAddress.emailAddress,
        wachtwoord: "defaultpassword"  // Zet hier een default wachtwoord, dit moet later veilig worden afgehandeld
      })
      .then(response => {
        console.log('Gebruikersgegevens succesvol opgeslagen');
        // Hier kun je verder navigeren naar een dashboard op basis van de rol
      })
      .catch(error => {
        console.error('Error bij het opslaan van gebruikersgegevens: ', error);
      });
    }
  }, [user, isSignedIn, navigate]);

  return (
    <div className="container">
      <div className="welcome">
        <h1>Succesvol ingelogd!</h1>
        <p>Welkom terug! Je bent nu ingelogd op je dashboard.</p>
      </div>
    </div>
  );
}*/

function App() {
  return (
    <Router>
      <ClerkProvider publishableKey={import.meta.env.VITE_CLERK_PUBLISHABLE_KEY}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/dashboard" element={
            <SignedIn>
              <UserRoleRedirect />
            </SignedIn>
          } />
          <Route path="/admin-dashboard" element={
            <SignedIn>
              <UserRoleRedirect requiredRole="admin">
                <AdminDashboard />
              </UserRoleRedirect>
            </SignedIn>
          } />
          <Route path="/coach-dashboard" element={
            <SignedIn>
              <UserRoleRedirect requiredRole="coach">
                <CoachDashboard />
              </UserRoleRedirect>
            </SignedIn>
          } />
          <Route path="/student-dashboard" element={
            <SignedIn>
              <UserRoleRedirect requiredRole="student">
                <StudentDashboard />
              </UserRoleRedirect>
            </SignedIn>
          } />
        </Routes>
      </ClerkProvider>
    </Router>
  );
}

export default App;
