import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Route, Routes, Link, useNavigate, useParams } from 'react-router-dom';
import { Example } from "./example";
import { Winkels } from "./winkels";

const App = () => {
  return (
<Router>
    <nav>
        <Link to="/bestelling">Bestelling plaatsen</Link> | <Link to="/groeps-overzicht">Overzicht</Link> | <Link to="/winkels">Winkels</Link> | <button onClick={()=> {setUser(0)}}>Login Als Admin</button> | <button onClick={()=> {setUser(1)}}>Login Als Coach</button> | <button onClick={()=> {setUser(2)}}>Login Als Student</button> | <button onClick={()=> {setUser(-1)}}>Loguit</button>
    </nav>
    <Routes>
        <Route path="/" element={<Example/>} />
        <Route path="/winkels" element={<Winkels />} />
    </Routes>
</Router>

  );
};

const setUser = (wie) => {//-1 = uitloggen, 0 = admin, 1 = coach, 2 = student
  let newSessionStorage = "" //Normaal formaat: ["gebruikers naam", "wachtwoord", id, niveau]
  if(wie==0)
    wie = '["admin", "adminww", 15, 0]'
  if(wie==1)
    wie = '["coach", "coachww", 17, 1]'
  if(wie==2)
    wie = '["jojo", "uiuiui", 28, 2]'
  sessionStorage.setItem("user",wie)
  document.location = document.location //soft refresh
}

export default App;
