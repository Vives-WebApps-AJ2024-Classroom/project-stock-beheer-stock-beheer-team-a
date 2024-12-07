import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Route, Routes, Link, useNavigate, useParams } from 'react-router-dom';
import { Example } from "./example";

const App = () => {
  const [uId, setUId] = useState(-1)
  const [uNaam, setUNaam] = useState("")
  const [uPass, setUWachtwoord] = useState("")
  var gebruikersStaat = {uId, setUId,uNaam, setUNaam,uPass, setUWachtwoord}
  return (
<Router>
    <nav>
        <Link to="/bestelling">Bestelling plaatsen</Link> | <Link to="/groeps-overzicht">Overzicht</Link>
    </nav>
    <Routes>
        <Route path="/" element={<Example gebruikerStaat={gebruikersStaat} />} />
        <Route path="/about/:name" element={<Example />} />
    </Routes>
</Router>

  );
};


export default App;
