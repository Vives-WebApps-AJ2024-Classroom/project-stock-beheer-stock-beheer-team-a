import React, { useEffect, useState } from "react";
import { CheckUserLS } from "./page-tools";
import {BrowserRouter as Router,Route,Routes, Link, useNavigate, useParams } from "react-router-dom";
import { Example } from "./paginas/example";
import { Winkels } from "./paginas/winkels";
import { Project } from "./paginas/project";
import { GeenToegang } from "./paginas/GeenToegang";
import { BestellingPlaatsen } from "./paginas/bestelling_plaatsen";
import { GroepsIndeling } from "./paginas/GroepsIndeling";
import { LogPagina } from "./paginas/LogPagina";
import { Home } from "./paginas/Home";
import { ProjectCreatie } from "./paginas/project_aanmaken";

const App = () => {
  var phpmyadminURL = process.env.PHPMYADMIN_URL
  let userArr
  let ProjectId = 1
  const navigate = useNavigate();
  let extra = [];
  if(window.location.pathname!=="/login"){
    userArr = CheckUserLS(navigate)
    //getProjectByUser()
    if(userArr[3] === 0){
      extra.push(
      <>
          <Link to="/groepsIndeling">groepsIndeling</Link> | 
          <Link to="/logPagina">log pagina</Link> |       
          <Link to="/projectCreatie">maak project</Link> | 
      </>)
    }
  }
    

  return (
    <>
      
      <nav>
        <Link to={'/bestelling/'+ProjectId}>Bestelling plaatsen </Link> | 
        <Link to="/home">home</Link> | 
        <Link to={'/project/'+ProjectId}>Overzicht</Link> | 
        <Link to="/winkels">Winkels</Link> | 
        {extra}
        {(phpmyadminURL !== null)} : <><Link to={phpmyadminURL}>Php my admin</Link></>

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

export default App;
