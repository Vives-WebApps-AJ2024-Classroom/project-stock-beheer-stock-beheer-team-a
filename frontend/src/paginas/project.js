import React, { useState } from "react";


export const Project = () => {
  let returne = []
  let userArr //Normaal formaat: ["gebruikers naam", "wachtwoord", id, niveau]
  try{
    userArr = JSON.parse(sessionStorage.getItem("user"))
    if(userArr.length != 4){
      throw new Error("Session storage niet in juiste fomaat.")
    }
  }catch{
    document.location = "/login"
  }

  const { projectId } = useParams();
  console.log("project id:",projectId);
  const [nw, setnw] = useState("")
  const [nwurl, setnwurl] = useState("")
  const [nwspec, setnwspec] = useState("")
  
  const bestellingen = [
    {
      "id": 1,
      "aanmaak": "2024-12-01 10:30:00",
      "winkelId": 12,
      "winkelEnkelString": null,
      "aantal": 5,
      "totaleKostPrijsExclBtw": 12500,
      "url": "https://voorbeeld.com/artikel/1",
      "leverTijd": 3,
      "leveringsAdres": "Straatnaam 123, 1000 Brussel",
      "omschrijving": "Laptop voor kantoor",
      "artikelNr": "ART12345",
      "projectId": 1,
      "rqNummer": 9876543210,
      "bestellingDoorFDGeplaatst": "2024-11-30",
      "verwachteAankomst": "2024-12-04",
      "bestellingOntvangen": "2024-12-05",
      "werkelijkBetaald": 12550,
      "opmerking": "Snelle levering gevraagd",
      "goedgekeurdDoorCoach": true,
      "winkelNaam": "bal" //deze wordt ingevoegd door een right join ofz
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
      "winkelNaam": "Kleine buurtwinkel" //deze wordt ingevoegd door een right join ofz
    },
    {
      "id": 3,
      "aanmaak": "2024-12-03 09:00:00",
      "winkelId": 15,
      "winkelEnkelString": null,
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
      "winkelNaam": "bol" //deze wordt ingevoegd door een right join
    }
  ]//getBestellingen(project)
  const gebruikers = [
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
    }
  ]//getUsers(project)
  
  const Coach = {
    "id": 3,
    "voornaam": "Emma",
    "achternaam": "Vermeulen",
    "email": "emma.vermeulen@coach.example.com",
    "niveau": 1,
    "projectId": 1,
    "wachtwoord": "veiligWachtwoord789"
  }//getCoach(project)

  let toegang = false //Ongemachtigde gebruikers buitenschoppen.
  if(userArr[3] == 0){
    for(users in gebruikers){
      if(users.id == userArr[2])
        toegang = true
    }
  }
  if(!toegang || (userArr[3] == 1 && Coach.id != userArr[2]))
    document.location = "/geenToegang"

  tabItems = []
  returne.push(<p>Bestellingen:</p><table></table>)
  for(item in bestellingen){
    tabItems.push(
    <tr>
      <td>{item.omschrijving}</td>
      <td>{item.werkelijkBetaald || item.totaleKostPrijsExclBtw}</td>
      <td>{item.bestellingOntvangen || item.goedgekeurdDoorCoach? "goedgekeurd": "niet goedgekeurd"}</td>
      <td>{item.aantal}</td>
      <td>{item.bestellingOntvangen || "niet ontvangen"}</td>
      <td><a href={item.url}>link</a></td>
      <td>{item.winkelNaam}</td>
      <td></td>
    </tr>)
  }

  if(userArr[3] == 0){//code voor de admin
    for (let i = 0; i < winkels.length; i++) {
      returne.push(<div key={i}><p><a href={winkels[i].url}>{winkels[i].naam}</a></p><p>{winkels[i].specializatie}</p> <button>Verwijder</button></div>);
    }
    returne.push(
    <div>
      <label>Winkel Naam:</label>
      <input value={nw} onChange={(e) => {setnw(e.target.value)}}></input><br/>
      <label>Winkel Url:</label>
      <input value={nwurl} onChange={(e) => {setnwurl(e.target.value)}}></input><br/>
      <label>Winkel Specializatie:</label>
      <input value={nwspec} onChange={(e) => {setnwspec(e.target.value)}}></input><br/>
      <button>Maak winkel aan</button>
    </div>)
  }else{
    for (let i = 0; i < winkels.length; i++) {
      returne.push(<div key={i}><p><a href={winkels[i].url}>{winkels[i].naam}</a></p><p>{winkels[i].specializatie}</p></div>);
    }
  }

  return (
    <>
      {returne}
    </>
  )  
}