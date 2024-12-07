import React from "react";

export const Winkels = () => {
  const winkels = [{"id":0,"naam":"oijoije","url":"google.com","specializatie":"wasmachines"},
    {"id":1,"naam":"vsknvlx","url":"bing.com","specializatie":"vijzen"}] //vervang later door get request voor winkels te verkrijgen
    let returne = []
    for (let i = 0; i < winkels.length; i++) {
      returne.push(<div key={i}><p><a href={winkels[i].url}>{winkels[i].naam}</a></p><p>{winkels[i].specializatie}</p></div>);
    }
    return (
      <>
        {returne}
      </>
    )  
}
