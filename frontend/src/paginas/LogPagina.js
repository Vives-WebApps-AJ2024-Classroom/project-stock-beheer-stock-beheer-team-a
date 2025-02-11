import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from 'react-router-dom';
import { CheckUserLS, getData, apiURL } from '../page-tools';
import "../styles/stylesLog.css"; // Link naar de CSS file

//indeling: 
/*
Selecteerbare lijst voor projecten in terug te vinden.
Datum range inputs.
Knop voor elementen op te halen.
*/

export const LogPagina = () => {
  const navigatie = useNavigate()
  let userArr = CheckUserLS()
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
        navigatie("/geenToegang")
      }

      //let bestel = 
      let projecten = await getData(apiURL + "getProjecten",null,"GET");
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

      let gebruikers = await getData(apiURL + "gebruikers",null,"GET")
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

      setGebruikers(gebruikers)
      setProjecten(projecten)
    }
    serverConnect()
  }, []);

  const fetchNewBestellingen = async(pid) => {
    let data = await getData(apiURL + `getBestellingen/${pid}`,null,"GET")
    setBestellingen(data || [])
  }
  const updateQuerris = async () => {
    let resultaten = await getData(`/getQuerries/${beginDatum}/${eindDatum}/${pGeselecteerd}/${bGeselecteerd}/${uGeselecteerd}`,null,"GET")
    setLogResultaat(resultaten || [])
    /*
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
    */
  }

  return (
    <div className="log-container">
      <p>Bekijk sql query's van een bepaald tijdsberijk.</p>
      <div className="input-row">
        <label className="label">Van welke gebruiker?</label>
        <select value={uGeselecteerd} size={5} onChange={(e) => { setUGeselecteerd(e.target.value) }}>
          <option value={-1}>(onafhankelijk)</option>
          {gebruikerz.map(gebr =>
            <option key={gebr.id} value={gebr.id}>{gebr.voornaam + " " + gebr.achternaam}</option>
          )}
        </select>
        <label className="label">Van welk project?</label>
        <select value={pGeselecteerd} size={5} onChange={(e) => { setPGeselecteerd(e.target.value); fetchNewBestellingen(e.target.value) /* congrats react */ }}>
          <option value={-1}>(alles)</option>
          {projecten.map(proj =>
            <option key={proj.id} value={proj.id}>{proj.naam}</option>
          )}
        </select>
        <label className="label">Welke bestelling?</label>
        <select value={bGeselecteerd} size={5} onChange={(e) => { setBGeselecteerd(e.target.value) }}>
          <option value={-1}>(onafhankelijk)</option>
          {bestellingen.map(best =>
            <option key={best.id} value={best.id}>{best.id}: {best.omschrijving}</option>
          )}
        </select>
        <label className="label">Begin datum:</label>
        <input type="date" onChange={e => setBeginDatum(e.target.value)} />
        <label className="label">Eind datum:</label>
        <input type="date" onChange={e => setEindDatum(e.target.value)} />
        <button onClick={() => updateQuerris()}>Haal resultaten op</button>
      </div>
      <table>
        <tbody>
          <tr>
            <th>Datum & tijdstip</th>
            <th>Query</th>
          </tr>
          {logResultaat.map(o =>
            <tr key={o.id}>
              <td>{o.moment}</td>
              <td>{o.querry}</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};