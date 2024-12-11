import React, { useState } from "react";
import { useParams } from 'react-router-dom';

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
  
  const bestel = [
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
      "bestellingDoorFDGeplaatst": "2024-11-30",
      "verwachteAankomst": "2024-12-04",
      "bestellingOntvangen": "2024-12-05",
      "werkelijkBetaald": 12550,
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
  
  let toegang = true //Ongemachtigde gebruikers buitenschoppen.
  if(userArr[3] == 2){
    toegang = false
    gebruikers.forEach((users)=>{
      if(users.id == userArr[2])
        toegang = true
    })
  }
  if(!toegang || (userArr[3] == 1 && Coach.id != userArr[2]))
    document.location = "/geenToegang"

  const { projectId } = useParams();


  const [bestellingen, setBestellingen] = useState(bestel)
  //extras: 
  //-als je coach of admin bent kan je goedkeuren.
  //-als je admin bent of het is nog niet goedgekeurd kan je verwijderen.
  returne.push(<p>Bestellingen:</p>)
  let tstuf = []
  tstuf.push(<tr><th>Omschrijving</th><th>Betaald/kostprijs<br/>(excl. btw)</th><th>Ontvangen/goedgekeurd</th><th>Aantal</th><th>URL</th><th>Winkel</th><th>Bewerkingen</th></tr>)
  const delBestelling = (id) => {
    setBestellingen(bestellingen.filter(a =>
      a.id !== id
    ))
  }
  const voegInfoToe = (index, infoObje) => {
    if(bestellingen[index+1] && infoObje.id == bestellingen[index+1].id){
      setBestellingen(
        bestellingen.filter((_, indx) => indx !== index+1)
      );
    }else{
      setBestellingen([... bestellingen.slice(0, index+1),
        infoObje,
        ... bestellingen.slice(index+1)
      ])
    }
  }
  const TabelRij = ({item, verwijderGebr, goedkeurGebr, index}) => {
    let ex = []
    if(goedkeurGebr){
      ex.push(<button disabled={item.goedgekeurdDoorCoach} >Keur goed</button>)
    }
    if(!item.goedgekeurdDoorCoach || verwijderGebr){
      ex.push(<button onClick={()=>{delBestelling(item.id)}}>Verwijder</button>)
    }
  
    return(
      <tr>
        <td>{item.omschrijving}</td>
        <td>{item.werkelijkBetaald/100 || item.totaleKostPrijsExclBtw/100}</td>
        <td>{item.bestellingOntvangen || (item.goedgekeurdDoorCoach ? "goedgekeurd": "niet goedgekeurd")}</td>
        <td>{item.aantal}</td>
        <td><a href={item.url}>link</a></td>
        <td>{item.winkelEnkelString}</td>
        <td><button onClick={() => {voegInfoToe(index, item)}}>Meer info</button></td>
        {ex}
      </tr>
    )
  }
  tstuf.push(
    bestellingen.map((item, index) => {
      if(index != 0 && bestellingen[index-1].id == item.id){
        return <tr>riiing ring ring</tr>
      }else{
        return <TabelRij item={item} verwijderGebr={userArr[3]==0} goedkeurGebr={userArr[3] in [0,1]} index={index}></TabelRij>
      }})
  )
 
  return (
    <>
      {returne}
      <table>
        {tstuf}
      </table>
    </>
  )

}

