import React, { useState, useEffect } from "react";
import { useNavigate, useP, useParams } from 'react-router-dom';
import { winkels } from "./winkels"; // Import the winkels array
import "../styles/stylesBestelling.css"; // Link to the CSS file
import  { CheckUserLS, getData, apiURL } from "../page-tools";

// Component for placing orders
export const BestellingPlaatsen = () => {
  const {projectId, bid} = useParams()
  const [formData, setFormData] = useState({
    naam: "",
    Winkel: "",
    WinkelId: 0,
    link: "",
    productcode: "",
    kostprijs: 0,
    levertijd: "",
    Aantal: 0,
  });
  const [projectGroup, setProjectGroup] = useState("");
  const [availableWinkels, setAvailableWinkels] = useState([]);
  useEffect(() => {
    const nwThread = async () => {
      let userArr; // Normal format: ["username", "password", id, level]    
      userArr = CheckUserLS();
      setProjectGroup(userArr[4])
      console.log(bid)
      if(bid){
        let bestaandeData = await getData(apiURL + `getBestelling/${bid}`, null, "GET");
        if(bestaandeData == null){
          bestaandeData = {
            "id": 1,
            "aanmaak": "2025-01-04T10:30:00",
            "winkelId": 42,
            "winkelEnkelString": "Speciaalzaak Online",
            "aantal": 10,
            "totaleKostPrijsExclBtw": 159900, // Dit is 1599,00 euro
            "url": "https://winkel.example.com/product/12345",
            "leverTijd": 3,
            "leveringsAdres": "Hoofdstraat 123, 1000 AB, Amsterdam",
            "omschrijving": "Set van 10 hoogwaardige artikelen",
            "artikelNr": "ART12345",
            "projectId": 7,
            "geplaatstDoor": 101,
            "rqNummer": 9876543210123,
            "goedgekeurdDoorCoach": 1,
            "bestellingDoorFDGeplaatst": "2025-01-03",
            "verwachteAankomst": null,
            "bestellingOntvangen": "2025-01-07",
            "werkelijkBetaald": 162500, // Dit is 1625,00 euro
            "opmerking": "Geleverd in perfecte staat"
          }
        }
        const { omschrijving, winkelEnkelString, winkelId, url, artikelNr, totaleKostPrijsExclBtw, leverTijd, aantal } = bestaandeData
        setFormData({
          naam: omschrijving,
          Winkel: winkelEnkelString,
          WinkelId: winkelId,
          link: url,
          productcode: artikelNr,
          kostprijs: totaleKostPrijsExclBtw,
          levertijd: leverTijd,
          Aantal: aantal,
        })
        if(userArr[3] == 0){ // voor admins
          const { rqNummer, goedgekeurdDoorCoach, bestellingDoorFDGeplaatst, verwachteAankomst, bestellingOntvangen, werkelijkBetaald, opmerking, leveringsAdres } = bestaandeData
          setFormData({
            naam: omschrijving,
            Winkel: winkelEnkelString,
            WinkelId: winkelId,
            link: url,
            productcode: artikelNr,
            kostprijs: totaleKostPrijsExclBtw,
            levertijd: leverTijd,
            Aantal: aantal, 
            rqNummer: rqNummer, 
            goedgekeurdDoorCoach: goedgekeurdDoorCoach, 
            bestellingDoorFDGeplaatst: bestellingDoorFDGeplaatst, 
            verwachteAankomst: verwachteAankomst, 
            bestellingOntvangen: bestellingOntvangen, 
            werkelijkBetaald: werkelijkBetaald, 
            opmerking: opmerking,
            leveringsAdres: leveringsAdres
          })
        }
      }else if(userArr[3] == 0){ // admins die er een nieuwe aanmaken
        setFormData({... formData, 
          rqNummer: 0, 
          goedgekeurDoorCoach: null, 
          bestellingDoorFDGeplaatst: null, 
          verwachteAankomst: null, 
          bestellingOntvangen: null, 
          werkelijkBetaald: null, 
          opmerking: null,
          leveringsAdres: "Xaverianenstraat hoofdgebouw"
        })
      }

      // Fetch winkel data
      setAvailableWinkels(winkels);//dit moet nog veranderen door een api request
    }
    nwThread()
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    if(name === "Winkel"){
      setFormData({
        ...formData,
        "Winkel": availableWinkels.find((element) => element.id == value).naam,
        "WinkelId" : value
      });
    }else{
      setFormData({
        ...formData,
        [name]: value,
      });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form Data Submitted: ", formData);
    // Submit logic here...
  };

  return (
    <div className="wrapper">
      <div className="instructions-container">
        <h1>Bestelling Plaatsen: Group {projectGroup}</h1>
        <p>Vul onderstaand formulier in om een bestelling te plaatsen.</p>
        <p>Alle velden zijn verplicht.</p>
        <p>
          Na het invullen van het formulier zal de bestelling worden doorgestuurd
          naar de coach ter goedkeuring.
        </p>
        <p>
          <a href="/project/1">Terug naar project</a>
        </p>
      </div>
      <div className="border">
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="naam">Naam:</label>
            <input
              className="form-control"
              type="text"
              name="naam"
              id="naam"
              value={formData.naam}
              onChange={handleChange}
            />
          </div>
          <div className="form-group">
            <label htmlFor="Winkel">Winkel:</label>
            <select
              className="form-control"
              name="Winkel"
              id="Winkel"
              value={formData.WinkelId}
              onChange={handleChange}
            >
              <option value="">Selecteer winkel</option>
              {availableWinkels.map((winkel) => (
                <option key={winkel.id} value={winkel.id}>
                  {winkel.naam}
                </option>
              ))}
            </select>
          </div>
          <div className="form-group">
            <label htmlFor="link">Link:</label>
            <input
              className="form-control"
              type="text"
              name="link"
              id="link"
              value={formData.link}
              onChange={handleChange}
            />
          </div>
          <div className="form-group">
            <label htmlFor="productcode">Productcode:</label>
            <input
              className="form-control"
              type="text"
              name="productcode"
              id="productcode"
              value={formData.productcode}
              onChange={handleChange}
            />
          </div>
          <div className="form-group">
            <label htmlFor="kostprijs">Kostprijs (excl. BTW):</label>
            <input
              className="form-control"
              type="text"
              name="kostprijs"
              id="kostprijs"
              value={formData.kostprijs}
              onChange={handleChange}
            />
          </div>
          <div className="form-group">
            <label htmlFor="levertijd">Levertijd:</label>
            <select
              className="form-control"
              name="levertijd"
              id="levertijd"
              value={formData.levertijd}
              onChange={handleChange}
            >
              <option value="">Selecteer levertijd</option>
              {[...Array(31).keys()].map((day) => (
                <option key={day} value={day + 1}>
                  {day + 1}
                </option>
              ))}
            </select>
            <span> dagen</span>
          </div>
          <div className="form-group">
            <label htmlFor="Aantal">Aantal:</label>
            <input
              className="form-control"
              type="number"
              name="Aantal"
              id="Aantal"
              value={formData.Aantal}
              onChange={handleChange}
              min="0"
            />
          </div>
          {formData["rqNummer"]? //Dit is een veld die enkel erbij komt als je admin bent.
          <>
          <div className="form-group">
            <label htmlFor="rqNummer">rqNummer:</label>
            <input
              className="form-control"
              type="number"
              name="rqNummer"
              id="rqNummer"
              value={formData.rqNummer}
              onChange={handleChange}
              min="0"
            />
          </div>
          <div className="form-group">
            <label htmlFor="goedgekeurdDoorCoach">goedgekeurdDoorCoach:</label>
            <input
              className="form-control"
              type="checkbox"
              name="goedgekeurdDoorCoach"
              id="goedgekeurdDoorCoach"
              value={formData.goedgekeurdDoorCoach}
              onChange={handleChange}
              min="0"
            />
          </div>
          <div className="form-group">
            <label htmlFor="bestellingDoorFDGeplaatst">bestellingDoorFDGeplaatst:</label>
            <input
              className="form-control"
              type="Date"
              name="bestellingDoorFDGeplaatst"
              id="bestellingDoorFDGeplaatst"
              value={formData.bestellingDoorFDGeplaatst}
              onChange={handleChange}
              min="0"
            />
          </div>
          <div className="form-group">
            <label htmlFor="verwachteAankomst">verwachteAankomst:</label>
            <input
              className="form-control"
              type="Date"
              name="verwachteAankomst"
              id="verwachteAankomst"
              value={formData.verwachteAankomst}
              onChange={handleChange}
              min="0"
            />
          </div>
          <div className="form-group">
            <label htmlFor="bestellingOntvangen">bestellingOntvangen:</label>
            <input
              className="form-control"
              type="Date"
              name="bestellingOntvangen"
              id="bestellingOntvangen"
              value={formData.bestellingOntvangen}
              onChange={handleChange}
              min="0"
            />
          </div>
          <div className="form-group">
            <label htmlFor="werkelijkBetaald">werkelijkBetaald (cent):</label>
            <input
              className="form-control"
              type="Number"
              name="werkelijkBetaald"
              id="werkelijkBetaald"
              value={formData.werkelijkBetaald}
              onChange={handleChange}
              min="0"
            />
          </div>
          <div className="form-group">
            <label htmlFor="opmerking">opmerking:</label>
            <input
              className="form-control"
              type="Text"
              name="opmerking"
              id="opmerking"
              value={formData.opmerking}
              onChange={handleChange}
              min="0"
            />
          </div>
          <div className="form-group">
            <label htmlFor="leveringsAdres">leveringsAdres:</label>
            <input
              className="form-control"
              type="Text"
              name="leveringsAdres"
              id="leveringsAdres"
              value={formData.leveringsAdres}
              onChange={handleChange}
              min="0"
            />
          </div>
         </>
          :<></>}
          <button className="submit-button" type="submit">Submit</button>
        </form>
      </div>
    </div>
  );
};