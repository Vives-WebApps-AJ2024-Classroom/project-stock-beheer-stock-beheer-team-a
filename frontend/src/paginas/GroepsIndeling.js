import React, { useState, useEffect } from "react";
import { useParams } from 'react-router-dom';
import {CheckUserLS, getData, apiURL} from '../page-tools'
//indeling: 
/*
Selection box met gebruikers
Lijst met geselecteerd project voor die gebruiker
Geselecteerd project staat ook in een tekst vak, slaat automatisch op bij aanklikken in de lijst.
*/


export const GroepsIndeling = () => {
    let returne = []
    let userArr = CheckUserLS() //Normaal formaat: ["gebruikers naam", "wachtwoord", id, niveau]
    const [projecteen, setProjecten] = useState([])
    const [gebruikerz, setGebruikers] = useState([])
    const [uGeselecteerd, setUGeselecteerd] = useState(-1);
    const [pGeselecteerd, setPGeselecteerd] = useState(-1);
    useEffect(() => {
        const serverConnect = async () => {
          //let bestel = await getData("http://localhost:3001/api/getBestellingen/"+projectId)
          let projecten = [
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
            ]
          let gebruikers = [
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
            ]
          if(userArr[3] != 0){//niet administrators buitenschoppen.
            document.location = "/geenToegang"
          }
          setProjecten(projecten)
          setGebruikers(gebruikers)
        }
        serverConnect()
      }, []);
    const Opslaan = (pid) => {
      if(uGeselecteerd != -1){
        console.log("kijk voor de return waarde hier om mischien nog een error weer te geven")
        getData(apiURL + `steekGebruikerInProject/${uGeselecteerd.id}/${pid}/${userArr[2]}/${userArr[1]}`,null,"PUT")
      }
    }
      
    return( 
    <>
      <p>Hier kan je Selecteren welke gebruiker er in welk team zit, na selectie wordt het automatisch opgeslagen naar de server.</p>
      <select size={gebruikerz.length +1} onChange={(e)=> {setUGeselecteerd(gebruikerz.filter(a => a.id == e.target.value)[0]); setPGeselecteerd((uGeselecteerd || {"id":-1}).projectId)}}>
        <option value={-1}> </option>
        {gebruikerz.map(gebr =>
          <option value={gebr.id}>{gebr.voornaam + " " + gebr.achternaam}</option>
        )}
      </select>
      <select value={pGeselecteerd} size={projecteen.length +1} onChange={(e)=> {Opslaan((projecteen.filter(a => a.id == e.target.value)[0] || {"id":-1}).id)}}>
        <option value={-1}> </option>
        {projecteen.map(proj =>
          <option value={proj.id}>{proj.naam}</option>
        )}
      </select>
    </>
    )
}