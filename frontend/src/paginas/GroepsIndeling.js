import React, { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import { CheckUserLS, getData, apiURL } from '../page-tools';
import "../styles/stylesGroepsIndeling.css"; // Ensure to import the CSS file


export const GroepsIndeling = () => {
    let userArr = CheckUserLS(); // Normaal formaat: ["gebruikers naam", "wachtwoord", id, niveau, projectId]
    const [projecteen, setProjecten] = useState([]);
    const [gebruikerz, setGebruikers] = useState([]);
    const [uGeselecteerd, setUGeselecteerd] = useState(-1);
    const [pGeselecteerd, setPGeselecteerd] = useState(-1);
    const navigate = useNavigate();

    useEffect(() => {

        if(userArr[3] != 0) {
            navigate("/geenToegang")
        }

        const serverConnect = async () => {
            let projecten = await getData(apiURL + "/getProjecten",null,"GET");
            if(projecten == null){
                projecten = [
                    {
                        "id": 1,
                        "naam": "Website Redesign",
                        "datum": "2024-01-15",
                        "spendeerbaarBedrag": 250000
                    },
                    {
                        "id": 2,
                        "naam": "Marketing Campaign",
                        "datum": "2024-02-01",
                        "spendeerbaarBedrag": 150000
                    },
                    {
                        "id": 3,
                        "naam": "Product Launch",
                        "datum": "2024-03-20",
                        "spendeerbaarBedrag": 500000
                    },
                    {
                        "id": 4,
                        "naam": "Team Building",
                        "datum": "2024-04-10",
                        "spendeerbaarBedrag": 100000
                    },
                    {
                        "id": 5,
                        "naam": "R&D Initiative",
                        "datum": "2024-05-05",
                        "spendeerbaarBedrag": 300000
                    }
                ];
            }

            let gebruikers = await getData(apiURL + "/gebruikers",null,"GET")
            if(gebruikers == null){
                gebruikers = [
                    {
                        "id": 1,
                        "voornaam": "Alice",
                        "achternaam": "Jansen",
                        "email": "alice.jansen@example.com",
                        "niveau": 0,
                        "projectId": null,
                        "wachtwoord": "admin123"
                    },
                    {
                        "id": 2,
                        "voornaam": "Bob",
                        "achternaam": "Pieters",
                        "email": "bob.pieters@example.com",
                        "niveau": 1,
                        "projectId": 1,
                        "wachtwoord": "coach456"
                    },
                    {
                        "id": 3,
                        "voornaam": "Charlie",
                        "achternaam": "Verhoeven",
                        "email": "charlie.verhoeven@example.com",
                        "niveau": 2,
                        "projectId": 2,
                        "wachtwoord": "student789"
                    },
                    {
                        "id": 4,
                        "voornaam": "Diana",
                        "achternaam": "Mertens",
                        "email": "diana.mertens@example.com",
                        "niveau": 2,
                        "projectId": 3,
                        "wachtwoord": "student456"
                    },
                    {
                        "id": 5,
                        "voornaam": "Eve",
                        "achternaam": "De Vries",
                        "email": "eve.devries@example.com",
                        "niveau": 1,
                        "projectId": null,
                        "wachtwoord": "coach123"
                    }
                ];
            }

            setProjecten(projecten);
            setGebruikers(gebruikers);
        }
        serverConnect();
    }, []);

    const Opslaan = (pid) => {
        if (uGeselecteerd !== -1) {
            console.log("kijk voor de return waarde hier om mischien nog een error weer te geven");
            console.log(apiURL + `steekGebruikerInProject/${uGeselecteerd.id}/${pid}/${userArr[2]}/${userArr[1]}`)
            getData(apiURL + `steekGebruikerInProject/${uGeselecteerd.id}/${pid}/${userArr[2]}/${userArr[1]}`, null, "PUT");
        }
    }

    return (
        <div className="groeps-indeling-container">
            <p className="instruction-text">Hier kan je Selecteren welke gebruiker er in welk team zit, na selectie wordt het automatisch opgeslagen naar de server.</p>
            <select size={gebruikerz.length + 1} onChange={(e) => {
                let damdidadidam = gebruikerz.filter(a => a.id == e.target.value)[0] || { "id": -1, "projectId": -1 };
                setUGeselecteerd(damdidadidam);
                setPGeselecteerd(damdidadidam.projectId || -1);
            }}>
                <option value={-1}></option>
                {gebruikerz.map(gebr =>
                    <option key={gebr.id} value={gebr.id}>{gebr.voornaam + " " + gebr.achternaam}</option>
                )}
            </select>
            <select value={pGeselecteerd} size={projecteen.length + 1} onChange={(e) => {
                Opslaan((projecteen.filter(a => a.id == e.target.value)[0] || { "id": -1 }).id);
                setPGeselecteerd(e.target.value);
            }}>
                <option value={-1}>(geen team)</option>
                {projecteen.map(proj =>
                    <option key={proj.id} value={proj.id}>{proj.naam}</option>
                )}
            </select>
        </div>
    )
}