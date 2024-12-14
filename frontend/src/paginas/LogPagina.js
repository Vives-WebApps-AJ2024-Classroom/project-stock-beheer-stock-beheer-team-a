import React, { useState, useEffect } from "react";
import { useParams } from 'react-router-dom';
import {CheckUserLS, getData, apiURL} from '../page-tools'
//indeling: 
/*
Selecteerbare lijst voor projecten in terug te vinden.
Datum range inputs.
Knop voor elementen op te halen.
*/

export const LogPagina = () => {
    let userArr = CheckUserLS() //Normaal formaat: ["gebruikers naam", "wachtwoord", id, niveau]
    const [gebruikerz, setGebruikers] = useState([])
    const [uGeselecteerd, setUGeselecteerd] = useState(-1);
    const [bestellingen, setBestellingen] = useState([])
    const [bGeselecteerd, setBGeselecteerd] = useState(-1);
    const [projecten, setProjecten] = useState([])
    const [pGeselecteerd, setPGeselecteerd] = useState(-1);
    const [beginDatum, setBeginDatum] = useState(new Date().toISOString().split('T')[0])
    const [eindDatum, setEindDatum] = useState(new Date().toISOString().split('T')[0])
    const [logResultaat, setLogResultaat] = useState([])
    useEffect(() => {
        const serverConnect = async () => {

          if(userArr[3] != 0){//niet administrators buitenschoppen.
            document.location = "/geenToegang"
          }
          //let bestel = await getData("http://localhost:3001/api/getBestellingen/"+projectId)
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
            }]
          let projcten = [
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
          let bestel = [
                {
                  "id": 1,
                  "aanmaak": "2024-12-01 10:30:00",
                  "winkelId": 12,
                  "winkelEnkelString": "bal",
                  "aantal": 5,
                  "totaleKostPrijsExclBtw": 12500,
                  "url": "https://voorbeeld.com/artikel/1",
                  "leverTijd": 3,
                  "leveringsAdres": "Straatnaam 123, 1000 Brussel",
                  "omschrijving": "Laptop voor kantoor",
                  "artikelNr": "ART12345",
                  "projectId": 1,
                  "rqNummer": 9876543210,
                  "bestellingDoorFDGeplaatst": null,
                  "verwachteAankomst": null,
                  "bestellingOntvangen": null,
                  "werkelijkBetaald": null,
                  "opmerking": "Snelle levering gevraagd",
                  "goedgekeurdDoorCoach": true,
                },
                {
                  "id": 2,
                  "aanmaak": "2024-12-02 14:15:00",
                  "winkelId": null,
                  "winkelEnkelString": "Kleine buurtwinkel",
                  "aantal": 2,
                  "totaleKostPrijsExclBtw": 8000,
                  "url": "https://voorbeeld.com/artikel/2",
                  "leverTijd": 7,
                  "leveringsAdres": "Kerkstraat 45, 2000 Antwerpen",
                  "omschrijving": "Bureau lamp",
                  "artikelNr": "ART67890",
                  "projectId": 1,
                  "rqNummer": null,
                  "bestellingDoorFDGeplaatst": "2024-12-01",
                  "verwachteAankomst": "2024-12-08",
                  "bestellingOntvangen": null,
                  "werkelijkBetaald": null,
                  "opmerking": "Betaal bij levering",
                  "goedgekeurdDoorCoach": false,
                },
                {
                  "id": 3,
                  "aanmaak": "2024-12-03 09:00:00",
                  "winkelId": 15,
                  "winkelEnkelString": "bol",
                  "aantal": 10,
                  "totaleKostPrijsExclBtw": 5000,
                  "url": "https://voorbeeld.com/artikel/3",
                  "leverTijd": 5,
                  "leveringsAdres": "Hoofdstraat 78, 3000 Leuven",
                  "omschrijving": "Notitieboekjes",
                  "artikelNr": "ART98765",
                  "projectId": 1,
                  "rqNummer": 1234567890,
                  "bestellingDoorFDGeplaatst": "2024-12-02",
                  "verwachteAankomst": "2024-12-07",
                  "bestellingOntvangen": "2024-12-08",
                  "werkelijkBetaald": 5000,
                  "opmerking": "Levering op tijd essentieel",
                  "goedgekeurdDoorCoach": true,
                }
              ]
            setGebruikers(gebruikers)
            setBestellingen(bestel)
            setProjecten(projcten)
        }
        serverConnect()
      }, []);
      const updateQuerris = async () => {
        //let resultaten = await getData(`/getQuerries/${beginDatum}/${eindDatum}/${pGeselecteerd}/${bGeselecteerd}/:${uGeselecteerd}`)
        let resultaten = [
            {
                "id": 1,
                "gebruikersId": 1,
                "moment": "2024-12-13 09:15:00",
                "bestellingsId": 1,
                "querry": "UPDATE bestellingen SET status = 'betaald' WHERE id = 1",
                "projectId": 1
            },
            {
                "id": 2,
                "gebruikersId": 2,
                "moment": "2024-12-13 09:45:00",
                "bestellingsId": 2,
                "querry": "INSERT INTO bestellingen (klantId, datum) VALUES (5, '2024-12-13')",
                "projectId": 1
            },
            {
                "id": 3,
                "gebruikersId": 3,
                "moment": "2024-12-13 10:00:00",
                "bestellingsId": null,
                "querry": "DELETE FROM klanten WHERE id = 10",
                "projectId": null
            },
            {
                "id": 4,
                "gebruikersId": 4,
                "moment": "2024-12-13 10:30:00",
                "bestellingsId": 3,
                "querry": "UPDATE bestellingen SET status = 'verzonden' WHERE id = 3",
                "projectId": 2
            },
            {
                "id": 5,
                "gebruikersId": 1,
                "moment": "2024-12-13 11:00:00",
                "bestellingsId": null,
                "querry": "UPDATE projecten SET budget = budget + 500 WHERE id = 1",
                "projectId": 1
            },
            {
                "id": 6,
                "gebruikersId": 2,
                "moment": "2024-12-13 11:30:00",
                "bestellingsId": 4,
                "querry": "INSERT INTO bestellingen (klantId, datum) VALUES (8, '2024-12-13')",
                "projectId": 2
            },
            {
                "id": 7,
                "gebruikersId": 3,
                "moment": "2024-12-13 12:00:00",
                "bestellingsId": null,
                "querry": "DELETE FROM projecten WHERE id = 3",
                "projectId": 3
            },
            {
                "id": 8,
                "gebruikersId": 4,
                "moment": "2024-12-13 12:30:00",
                "bestellingsId": 5,
                "querry": "UPDATE bestellingen SET status = 'geannuleerd' WHERE id = 5",
                "projectId": 2
            },
            {
                "id": 9,
                "gebruikersId": 1,
                "moment": "2024-12-13 13:00:00",
                "bestellingsId": null,
                "querry": "INSERT INTO projecten (naam, startdatum) VALUES ('Project X', '2024-12-15')",
                "projectId": null
            },
            {
                "id": 10,
                "gebruikersId": 2,
                "moment": "2024-12-13 13:30:00",
                "bestellingsId": null,
                "querry": "UPDATE projecten SET status = 'afgerond' WHERE id = 2",
                "projectId": 2
            }
        ]
        setLogResultaat(resultaten.filter(o => (o.bestellingsId == bGeselecteerd || bGeselecteerd == -1) && (o.projectId == pGeselecteerd || pGeselecteerd == -1) && (o.gebruikersId == uGeselecteerd || uGeselecteerd == -1)))
      }
      return( 
        <>
          <p>Bekijk sql querries van een bepaald tijds berijk.</p>
          <label>Van welke gebruiker?</label>
          <select value={uGeselecteerd} size={20} onChange={(e)=> {setUGeselecteerd(e.target.value)}}>
            <option value={-1}>(onafhankelijk)</option>
            {gebruikerz.map(gebr =>
              <option key={gebr.id} value={gebr.id}>{gebr.voornaam + " " + gebr.achternaam}</option>
            )}
          </select>
          <label>Van welk project?</label>
          <select value={pGeselecteerd} size={20} onChange={(e)=> {setPGeselecteerd(e.target.value)}}>
            <option value={-1}>(alles)</option>
            {projecten.map(proj =>
              <option key={proj.id} value={proj.id}>{proj.naam}</option>
            )}
          </select>
          <label>Welke bestelling?</label>
          <select value={bGeselecteerd} size={20} onChange={(e)=> {setBGeselecteerd(e.target.value)}}>
            <option value={-1}>(onafhankelijk)</option>
            {bestellingen.filter(a => a.projectId == pGeselecteerd).map(best =>
              <option key={best.id} value={best.id}>{best.id}: {best.omschrijving}</option>
            )}
          </select>
          <label>begin datum:</label>
          <input type="date" onChange={e => setBeginDatum(e.target.value)}></input>
          <label>eind datum:</label>
          <input type="date" onChange={e => setEindDatum(e.target.value)}></input>
          <button onClick={() => updateQuerris()}>Haal resultaten op</button>
          <table>
            <tbody>
              <tr>
                <th>tijdstip</th>
                <th>querry</th>
              </tr>
              {logResultaat.map(o =>
                <tr>
                  <td>{o.moment}</td>
                  <td>{o.querry}</td>
                </tr>
              )}
            </tbody>
          </table>
        </>
        
        )
}