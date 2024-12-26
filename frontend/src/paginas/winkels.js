import React, { useState } from "react";
import "../styles/stylesWinkels.css"; // Link naar de CSS file

export const winkels = [
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

export const Winkels = () => {
  let returne = [];
  let userArr; // Normaal formaat: ["gebruikers naam", "wachtwoord", id, niveau]
  const [nw, setnw] = useState("");
  const [nwurl, setnwurl] = useState("");
  const [nwspec, setnwspec] = useState("");
  try {
    userArr = JSON.parse(sessionStorage.getItem("user"));
    if (userArr.length !== 4) {
      throw new Error("Session storage niet in juiste formaat.");
    }
  } catch {
    document.location = "/login";
  }
  if (userArr[3] == 0) {
    // code voor de admin
    for (let i = 0; i < winkels.length; i++) {
      returne.push(
        <div className="winkel-item" key={i}>
          <p>
            <a href={winkels[i].url}>{winkels[i].naam}</a>
          </p>
          <p>{winkels[i].specializatie}</p> <button>Verwijder</button>
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
        <button>Maak winkel aan</button>
      </div>
    );
  } else {
    for (let i = 0; i < winkels.length; i++) {
      returne.push(
        <div className="winkel-item" key={i}>
          <p>
            <a href={winkels[i].url}>{winkels[i].naam}</a>
          </p>
          <p>{winkels[i].specializatie}</p>
        </div>
      );
    }
  }

  return <div className="winkels-container">{returne}</div>;
};