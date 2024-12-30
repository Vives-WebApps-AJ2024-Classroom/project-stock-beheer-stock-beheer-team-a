import React, { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import { winkels } from "./winkels"; // Import the winkels array
import "../styles/stylesBestelling.css"; // Link to the CSS file
import  { CheckUserLS, getData, apiURL } from "../page-tools";

// Component for placing orders
export const BestellingPlaatsen = () => {
  const navigatie = useNavigate()
  const role = localStorage.getItem('role'); // Haal de rol op uit localStorage
  const [formData, setFormData] = useState({
    naam: "",
    Winkel: "",
    link: "",
    productcode: "",
    kostprijs: "",
    levertijd: "",
    Aantal: "",
  });

  const [projectGroup, setProjectGroup] = useState("");
  const [availableWinkels, setAvailableWinkels] = useState([]);

  useEffect(async () => {

    let userArr; // Normal format: ["username", "password", id, level]
    try {
      userArr = CheckUserLS(navigatie);
      if (userArr.length !== 4) {
        throw new Error("Session storage not in the correct format.");
      }
      let groepNR = await getData(apiURL + `gebruiker/${userArr[2]}`, null, "GET").projectId;
      setProjectGroup(groepNR)
      
    } catch {
      document.location = "/login";
    }
    if (role !== '0' && role !== '2') {
      navigatie("/geenToegang");
    }
  
    // Fetch winkel data
    setAvailableWinkels(winkels); //like hell?? What is this?
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
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
              value={formData.Winkel}
              onChange={handleChange}
            >
              <option value="">Selecteer winkel</option>
              {availableWinkels.map((winkel) => (
                <option key={winkel.id} value={winkel.naam}>
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
          <button className="submit-button" type="submit">Submit</button>
        </form>
      </div>
    </div>
  );
};