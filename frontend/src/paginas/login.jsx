// App.js
import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import { ClerkProvider, SignedIn, SignedOut, SignInButton, useUser } from "@clerk/clerk-react";
import axios from "axios";
import StudentDashboard from './StudentDashboard';  // This is the additional file for the student
import CoachDashboard from './CoachDashboard';  // This is the additional file for the coach
import AdminDashboard from './AdminDashboard';  // Make sure you put the correct path here
import UserRoleRedirect from './UserRoleRedirect';  // Make sure you put the correct path here
import "./login.css";

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

      // Save first name and last name
      if (nameParts.length > 1) {
        setFirstName(capitalizeFirstLetter(nameParts[0]));
        setLastName(capitalizeFirstLetter(nameParts[1]));
        setEmail(emailAddress);

        const rol_id = emailAddress.endsWith('@student.vives.be') ? 2 : 0;

        // Send data to the backend
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
      console.log("Data successfully sent:", response.data);
    } catch (error) {
      console.error("Error sending data:", error);
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
