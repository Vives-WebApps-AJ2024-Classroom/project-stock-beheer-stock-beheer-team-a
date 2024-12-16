import React, { useState, useEffect } from "react";
import { CheckUserLS } from "./page-tools";
import {BrowserRouter as Router,Route,Routes,useNavigate, useParams } from "react-router-dom";
import { Example } from "./paginas/example";
import { Winkels } from "./paginas/winkels";
import { Project } from "./paginas/project";
import { GeenToegang } from "./paginas/GeenToegang";
import { BestellingPlaatsen } from "./paginas/bestelling_plaatsen";
import { GroepsIndeling } from "./paginas/GroepsIndeling";
import { LogPagina } from "./paginas/LogPagina";
import { Home } from "./paginas/Home";
import { ProjectCreatie } from "./paginas/project_aanmaken";


const RouterApp = () => {
  const [extra, setExtra] = useState([])
  var phpmyadminURL = process.env.PHPMYADMIN_URL
  const [userArr, setUserArray] = useState(["","",0,2])
  let ProjectId = 1
  const navigate = useNavigate();
  useEffect(() => {
    const LoadUser = () => {
      if(window.location.pathname!=="/login"){
        setUserArray(CheckUserLS(navigate))
        //getProjectByUser()
        if(userArr[3] === 0){
          setExtra(
          <>
              <a href="/groepsIndeling">groepsIndeling</a> | 
              <a href="/logPagina">log pagina</a> |       
              <a href="/projectCreatie">maak project</a> | 
          </>)
        }
        if(phpmyadminURL != null){
          setExtra([... extra, <a href={phpmyadminURL}>Php my admin</a>])
        }
      }
    }
    LoadUser()})
  return (
    <>
      <nav>
        <a href={'/bestelling/'+ProjectId}>Bestelling plaatsen </a> | 
        <a href="/home">home</a> | 
        <a href={'/project/'+ProjectId}>Overzicht</a> | 
        <a href="/winkels">Winkels</a> | 
        {extra}

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
          <Route path="/groepsIndeling" element={<GroepsIndeling />} />
          <Route path="/logPagina" element={<LogPagina />} />
          <Route path="/home" element={<Home />} />
          <Route path="/projectCreatie" element={<ProjectCreatie />} />
          <Route path="/login" element={<Example />} />    
        </Routes>
    </>
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

const App = () => {
  return(
    <Router>
      <RouterApp></RouterApp>
    </Router>
  )

}
export default App;
