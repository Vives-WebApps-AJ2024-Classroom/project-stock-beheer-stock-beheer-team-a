import React, { useState, useEffect } from "react";
import { winkels } from "./winkels"; // Import the winkels array

// component voor bestellingen te plaatsen
export const BestellingPlaatsen = () => {
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

  useEffect(() => {
    let userArr; // Normaal formaat: ["gebruikers naam", "wachtwoord", id, niveau]
    try {
      userArr = JSON.parse(sessionStorage.getItem("user"));
      if (userArr.length !== 4) {
        throw new Error("Session storage niet in juiste formaat.");
      }
      setProjectGroup(userArr[2]); // Assuming the project group is at index 2
    } catch {
      document.location = "/login";
    }

    // Fetch winkels data
    setAvailableWinkels(winkels);
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
    // submit logic hier...
  };

  return (
    <>
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
      <hr />
      <form onSubmit={handleSubmit}>
        <div>
          <label>Naam:</label>
          <input
            type="text"
            name="naam"
            value={formData.naam}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Winkel:</label>
          <select name="Winkel" value={formData.Winkel} onChange={handleChange}>
            <option value="">Selecteer winkel</option>
            {availableWinkels.map((winkel) => (
              <option key={winkel.id} value={winkel.naam}>
                {winkel.naam}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label>Link:</label>
          <input
            type="text"
            name="link"
            value={formData.link}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Productcode:</label>
          <input
            type="text"
            name="productcode"
            value={formData.productcode}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Kostprijs (excl. BTW):</label>
          <input
            type="text"
            name="kostprijs"
            value={formData.kostprijs}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Levertijd:</label>
          <select
            name="levertijd"
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
        <div>
          <label>Aantal:</label>
          <input
            type="number"
            name="Aantal"
            value={formData.Aantal}
            onChange={handleChange}
            min="0"
          />
        </div>
        <button type="submit">Submit</button>
      </form>
    </>
  );
};
