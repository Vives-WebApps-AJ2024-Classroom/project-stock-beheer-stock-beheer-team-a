import React, { useEffect, useState } from "react";
import { CheckUserLS } from "./page-tools";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Link,
  useNavigate,
  useParams,
} from "react-router-dom";
import { Example } from "./paginas/example";
import { Winkels } from "./paginas/winkels";
import { Project } from "./paginas/project";
import { GeenToegang } from "./paginas/GeenToegang";
import { BestellingPlaatsen } from "./paginas/bestelling_plaatsen";

const App = () => {
  let userArr = CheckUserLS()
  let ProjectId = 1//getProjectByUser()
  return (
    <Router>
      <nav>
        <Link to="/bestelling/1" >Bestelling plaatsen</Link> | 
        <Link to="/project/1" >Overzicht</Link> | 
        <Link to="/winkels">Winkels</Link> | 
        <button
          onClick={() => {
            setUser(0);
          }}
        >
          Login Als Admin
        </button> 
        | 
        <button
          onClick={() => {
            setUser(1);
          }}
        >
          Login Als Coach
        </button> 
        | 
        <button
          onClick={() => {
            setUser(2);
          }}
        >
          Login Als Student
        </button> 
        | 
        <button
          onClick={() => {
            setUser(-1);
          }}
        >
          Loguit
        </button>
      </nav>
      <Routes>
        <Route path="/" element={<Example />} />
        <Route path="/winkels" element={<Winkels />} />
        <Route path="/project/:projectId" element={<Project />} />
        <Route path="/geenToegang" element={<GeenToegang />} />
        <Route path="/bestelling/:projectId" element={<BestellingPlaatsen />} />
      </Routes>
    </Router>
  );
};

const setUser = (wie) => {
  //-1 = uitloggen, 0 = admin, 1 = coach, 2 = student
  let newSessionStorage = ""; //Normaal formaat: ["gebruikers naam", "wachtwoord", id, niveau]
  if (wie == 0) wie = '["admin", "adminww", 15, 0]';
  if (wie == 1) wie = '["coach", "coachww", 3, 1]';
  if (wie == 2) wie = '["jojo", "uiuiui", 2, 2]';
  sessionStorage.setItem("user", wie);
  document.location = document.location; //soft refresh
};

export default App;
