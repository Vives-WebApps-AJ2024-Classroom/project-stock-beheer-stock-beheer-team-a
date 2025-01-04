import React, { useState } from "react";
import { useNavigate, useParams } from 'react-router-dom';
import "../styles/stylesWinkels.css"; // Link naar de CSS file
import {CheckUserLS, apiURL, getData} from "../page-tools"

export const Winkels = () => {
  const [w, setW] = useState([])
  const userArr = CheckUserLS()
  const astrhreat = async () => {
    let winkels = await getData(apiURL + "winkels")
    if(winkels == null){
      winkels = [
        {
          id: 0,
          naam: "Bol.com",
          url: "https://google.com",
          specializatie: "wasmachines",
        },
        {
          id: 3,
          naam: "Bosch",
          url: "https://google.com",
          specializatie: "wasmachines",
        },
        { id: 1, naam: "Amazon", url: "https://bing.com", specializatie: "vijzen" },
      ];
    }
    setW(winkels)
  }
  astrhreat()
  let returne = [];
  const [nw, setnw] = useState("");
  const [nwurl, setnwurl] = useState("");
  const [nwspec, setnwspec] = useState("");
  const submintW = async() => {
    await getData(apiURL + `maakWinkel/${nw}/${nwspec}/${userArr[2]}/`+userArr[1], JSON.stringify({url: nwurl}), "POST")
  }
  const Verwijder = async(id) => {
    console.log(id)
    await getData(apiURL + `deleteWinkel/${id}/${userArr[2]}/`+userArr[1], null, "DELETE")
    setW(w.filter(a => a.id !== id))
  }
  if (userArr[3] == 0) {
    // code voor de admin
    for (let i = 0; i < w.length; i++) {
      returne.push(
        <div className="winkel-item" key={i}>
          <p>
            <a href={w[i].url}>{w[i].naam}</a>
          </p>
          <p>{w[i].specializatie}</p> <button onClick={(e)=>{Verwijder(w[i].id)}}>Verwijder</button>
        </div>
      );
    }
    returne.push(
      <div className="input-group" key="new-store">
        <label>Winkel Naam:</label>
        <input value={nw} onChange={(e) => setnw(e.target.value)} />
        <br />
        <label>Winkel Url:</label>
        <input value={nwurl} onChange={(e) => setnwurl(e.target.value)} />
        <br />
        <label>Winkel Specializatie:</label>
        <input
          value={nwspec}
          onChange={(e) => setnwspec(e.target.value)}
        />
        <br />
        <button onClick={() => {submintW()}}>Maak winkel aan</button>
      </div>
    );
  } else {
    for (let i = 0; i < w.length; i++) {
      returne.push(
        <div className="winkel-item" key={i}>
          <p>
            <a href={w[i].url}>{w[i].naam}</a>
          </p>
          <p>{w[i].specializatie}</p>
        </div>
      );
    }
  }

  return <div className="winkels-container">{returne}</div>;
};