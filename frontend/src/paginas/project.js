import React, { useState, useEffect } from "react";
import { Navigate, useNavigate, useParams } from 'react-router-dom';
import { CheckUserLS, getData, apiURL } from '../page-tools'
import "../styles/stylesProject.css"; // Link naar de CSS file

export const Project = () => {
  const navigation = useNavigate()
  const [leden, setLeden] = useState([])
  const { projectId } = useParams();
  const [bestellingen, setBestellingen] = useState([])
const [userArr, setUserArray] = useState(["", "", 0, 2,0])
  useEffect(() => {
    const ServerConnect = async () => {
      let user = CheckUserLS()
      setUserArray(user)

      let bestel = await getData(apiURL + "getBestellingen/"+projectId,null, "GET")
      if(bestel == null){
        bestel = [
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
      }
      let gebruikers = await getData(apiURL + "getStudenten/"+projectId,null,"GET")
      if(gebruikers == null){
        gebruikers = [
          {
            "id": 1,
            "voornaam": "Sofie",
            "achternaam": "Janssens",
            "email": "sofie.janssens@student.example.com",
            "niveau": 2,
            "projectId": 1,
            "wachtwoord": "wachtwoord123"
          },
          {
            "id": 2,
            "voornaam": "Liam",
            "achternaam": "De Smet",
            "email": "liam.desmet@student.example.com",
            "niveau": 2,
            "projectId": 1,
            "wachtwoord": "sterkWachtwoord456"
          }]
      }
      let Coach = await getData(apiURL + "getCoach/"+projectId,null,"GET")
      if(Coach == null){
        Coach = {
          "id": 3,
          "voornaam": "Emma",
          "achternaam": "Vermeulen",
          "email": "emma.vermeulen@coach.example.com",
          "niveau": 1,
          "projectId": 1,
          "wachtwoord": "veiligWachtwoord789"
        }
      }
      let toegang = true //Ongemachtigde gebruikers buitenschoppen.
      if(user[3] == 2){
        toegang = false
        gebruikers.forEach((users)=>{
          if(users.id == user[2])
            toegang = true
        })
      }
      if(!toegang || (user[3] == 1 && Coach.id != user[2])){
        navigation("/geenToegang")
      }
      setBestellingen(bestel)
      setLeden(gebruikers.concat(Coach))
    }
    ServerConnect()
  }, []);



  //extras: 
  //-als je coach of admin bent kan je goedkeuren.
  //-als je admin bent of het is nog niet goedgekeurd kan je verwijderen.
  let tstuf = []
  tstuf.push(<tr><th>Omschrijving</th><th>Betaald/kostprijs<br />(excl. btw)</th><th>Ontvangen/goedgekeurd</th><th>Aantal</th><th>URL</th><th>Winkel</th><th>Bewerkingen</th></tr>)
  const delBestelling = async (id) => {
    await getData(apiURL + `delBestelling/${id}/${userArr[2]}/${userArr[1]}`,null,"DELETE")
    console.log("VOEG NOG ERROR DETECTIE IN DE RESPONSE TOE HIER!")
    setBestellingen(bestellingen.filter(a =>
      a.id !== id
    ))
  }
  const voegInfoToe = (index, infoObje) => {
    if (bestellingen[index + 1] && infoObje.id == bestellingen[index + 1].id) {
      setBestellingen(
        bestellingen.filter((_, indx) => indx !== index + 1)
      );
    } else {
      setBestellingen([...bestellingen.slice(0, index + 1),
        infoObje,
      ...bestellingen.slice(index + 1)
      ])
    }
  }
  const keurGoed = async (item) => {
    console.log(await getData(apiURL + `keurGoed/${item.id}/${userArr[2]}/${userArr[1]}/`, null, "PUT"))
  }
  const keurAf = async (item) => {
    let reden = prompt("Wat is de reden");
    console.log(await getData(apiURL + `keurAf/${item.id}/${userArr[2]}/${userArr[1]}/` + reden, null, "PUT"))
  }
  const ontKeur = async (item) => {
    console.log(await getData(apiURL + `ontKeur/${item.id}/${userArr[2]}/${userArr[1]}/`, null, "PUT"))
  }

  const TabelRij = ({ item, verwijderGebr, goedkeurGebr, index }) => {
    let ex = []
    if (goedkeurGebr) {
      if (item.goedgekeurdDoorCoach) {
        ex.push(<button onClick={() => { ontKeur(item) }}>Op afwachting zetten</button>)
      } else {
        ex.push(<button onClick={() => { keurGoed(item) }}>Keur goed</button>)
        ex.push(<button onClick={() => { keurAf(item) }}>Keur af</button>)
      }
    }
    if (!item.goedgekeurdDoorCoach || verwijderGebr) {
      ex.push(<button onClick={() => { delBestelling(item.id) }}>Verwijder</button>)
    }
    return (
      <tr>
        <td>{item.omschrijving}</td>
        <td>{item.werkelijkBetaald / 100 || item.totaleKostPrijsExclBtw / 100}</td>
        <td>{item.bestellingOntvangen || (item.goedgekeurdDoorCoach == null ? "goedkeuring in afwachting" : (item.goedgekeurdDoorCoach ? "goedgekeurd" : "niet goedgekeurd"))}</td>
        <td>{item.aantal}</td>
        <td><a href={item.url}>link</a></td>
        <td>{item.winkelEnkelString}</td>
        <td><button onClick={() => { voegInfoToe(index, item) }}>Meer info</button></td>
        {ex}
      </tr>
    )
  }
  tstuf.push(
    bestellingen.map((item, index) => {
      if (index != 0 && bestellingen[index - 1].id == item.id) {

        return <><tr> <td>Aanmaak: {item.aanmaak}</td><td> lever tijd: {item.leverTijd}</td><td> lever adres: {item.leveringsAdres}</td><td> artikel nr: {item.artikelNr}</td><td> rq nr: {item.rqNummer}</td><td> Bestelling door financ dienst geplaatst: {item.bestellingDoorFDGeplaatst}</td><td> verwachte aankomst: {item.verwachteAankomst}</td></tr><tr><td> bestelling ontvangen: {item.bestellingOntvangen}</td><td> opmerking: {item.opmerking} </td><td><button onClick={() => { navigation(/bestelling/ + projectId + "/" + item.id) }}>Aanpassen</button></td></tr></>
      } else {
        return <TabelRij item={item} verwijderGebr={userArr[3] == 0} goedkeurGebr={userArr[3] in [0, 1]} index={index}></TabelRij>
      }
    })
  )

  return (
    <div className="project-container">
      <p>Bestellingen:</p>
      <table>
        <tbody>
          {tstuf}
          {/*bestellingen.map((item, index) => (
            <TabelRij key={item.id} item={item} verwijderGebr={userArr[3] === 0} goedkeurGebr={userArr[3] in [0, 1]} index={index} />
          ))*/}
        </tbody>
      </table>
      <div id="LedenLijst">
        <p>Leden:</p>
        <ul>
          {leden.map(user => (
            <li key={user.id}>{user.voornaam} {user.achternaam}: {user.niveau === 1 ? "Coach" : "Student"}</li>
          ))}
        </ul>
      </div>
    </div>
  );

}

