import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from 'react-router-dom';
import {CheckUserLS, getData, apiURL} from '../page-tools'

export const ProjectCreatie = () => {
    let userArr = CheckUserLS(useNavigate()) //Normaal formaat: ["gebruikers naam", "wachtwoord", id, niveau]

    useEffect(()=>{
        const Check = () => {
            if(userArr[3] != 0){//niet administrators buitenschoppen.
                document.location = "/geenToegang"
            }
        }
        Check()
    },[])
    const [naam, setNaam] = useState("")
    const [maxBudget, setMaxBudget] = useState(0)
    return(
        <>
        <h1>Maak een project:</h1>
        <label>naam:</label>
        <input value={naam} onChange={(e)=>{setNaam(e.target.value)}}></input>
        <label>max budget(€):</label>
        <input type="number" value={maxBudget} onChange={(e)=>{setMaxBudget(e.target.value)}}></input>
        <button onClick={async()=>{
            getData(apiURL + `maakProject/${naam}/${maxBudget}/${userArr[2]}/`+userArr[1])
        }}>Opslaan</button>
        </>
    )
}