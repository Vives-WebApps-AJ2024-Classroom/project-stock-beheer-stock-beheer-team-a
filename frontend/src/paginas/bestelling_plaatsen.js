import React, { useState } from "react";

// component voor bestellingen te plaatsen
export const BestellingPlaatsen = () => {
  const [formData, setFormData] = useState({
    naam: "",
    link: "",
    productcode: "",
    kostprijs: "",
    levertijd: "",
    Aantal: "",
  });

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
      <h1>Bestelling Plaatsen</h1>
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
          <label>Aantal:</label>
          <input
            type="number"
            name="Aantal"
            value={formData.Aantal}
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
          <input
            type="text"
            name="levertijd"
            value={formData.levertijd}
            onChange={handleChange}
          />
        </div>

        <button type="submit">Submit</button>
      </form>
    </>
  );
};
