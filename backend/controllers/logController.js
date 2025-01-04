const db = require("../db");

exports.logQuery = (query, gebruikerId, bestellignId, projectId) => {
    const queryy = "INSERT into LogAanpassing (gebruikersId, moment, bestellingsId, querry, projectId) VALUES (?,CURDATE(),?,?,?);";
    console.log(JSON.stringify(query))
    db.query(queryy, [gebruikerId, bestellignId,query, projectId], (err, results) => {
      if (err) {
        console.error("error voor het loggen:",err);
        return;
      }
    });
  };