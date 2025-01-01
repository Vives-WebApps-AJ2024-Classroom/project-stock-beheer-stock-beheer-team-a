import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from 'react-router-dom';
import {CheckUserLS, getData, apiURL} from '../page-tools';
import "../styles/stylesMakeProject.css"; // Link naar de CSS file

export const ProjectCreatie = () => {
    let userArr = CheckUserLS(useNavigate()) //Normaal formaat: ["gebruikers naam", "wachtwoord", id, niveau]
    const navigate = useNavigate();

    useEffect(()=>{

        if(userArr[3] != 0){//niet administrators buitenschoppen.
            document.location = "/geenToegang"
        }

    },[])
    const [naam, setNaam] = useState("")
    const [maxBudget, setMaxBudget] = useState(0)
    return (
        <div className="project-container">
            <h1>Maak een project:</h1>
            <div className="input-row">
                <label className="label">Naam:</label>
                <input type="text" value={naam} onChange={(e) => { setNaam(e.target.value) }} />
                <label className="label">Max budget (€):</label>
                <input type="number" value={maxBudget} onChange={(e) => { setMaxBudget(e.target.value) }} />
                <button id="ButtonOpslaan" onClick={async () => {
                    await getData(apiURL + `maakProject/${naam}/${maxBudget}/${userArr[2]}/` + userArr[1]);
                }}>Opslaan</button>
            </div>
        </div>
    );
};