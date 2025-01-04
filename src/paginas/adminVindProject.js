import React, { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import { CheckUserLS, getData, apiURL } from '../page-tools';
import "../styles/stylesGroepsIndeling.css"; // Ensure to import the CSS file


export const ProOverzicht = () => {
    let userArr = CheckUserLS(); // Normaal formaat: ["gebruikers naam", "wachtwoord", id, niveau]
    const [projecteen, setProjecten] = useState([]);
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
            setProjecten(projecten);
        }
        serverConnect();
    }, [])

    return(
        <>
            {projecteen.map(proj => (
                <li key={proj.id}> <a href={"/project/" + proj.id}>{proj.naam}</a> </li>
            ))}
        </>
    )
}