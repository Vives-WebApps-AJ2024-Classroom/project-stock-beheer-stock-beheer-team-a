const request = require("supertest");
const app = require("./index");

const testGetRequest = (url, expectedStatus, expectedType, done) => {
  request(app)
    .get(url)
    .expect("Content-Type", new RegExp(expectedType))
    .expect(expectedStatus, done);
};

const testPostRequest = (url, data, expectedStatus, done) => {
  request(app)
    .post(url)
    .send(data)
    .expect(expectedStatus, done);
};

const testPutRequest = (url, data, expectedStatus, done) => {
  request(app)
    .put(url)
    .send(data)
    .expect(expectedStatus, done);
};

const testDeleteRequest = (url, expectedStatus, done) => {
  request(app)
    .delete(url)
    .expect(expectedStatus, done);
};

console.log("Starting tests...");

testGetRequest("/api/getBestellingen/1", 200, "json", () => {
  console.log("Get Bestellingen test passed");

  testPostRequest(
    "/api/maakBestelling/1/null/WinkelNaam/10/100/5/Omschrijving/ArtikelNr/GeplaatstDoor",
    { url: "https://example.com" },
    201,
    () => {
      console.log("Maak Bestelling test passed");

      testPutRequest(
        "/api/pasBestellingAan/1/gebruikersId/wachtwoord/null/WinkelNaam/10/100/5/Omschrijving/ArtikelNr/GeplaatstDoor/rqNummer/true/doorFDGeplaatst/verwachteAankomst/bestellingOntvangen/werkelijkBetaald/opmerking",
        { url: "https://example.com" },
        200,
        () => {
          console.log("Pas Bestelling Aan test passed");

          testPutRequest(
            "/api/pasBestellingAanRestricted/1/gebruikersId/wachtwoord/null/WinkelNaam/10/100/5/Omschrijving/ArtikelNr",
            { url: "https://example.com" },
            200,
            () => {
              console.log("Pas Bestelling Aan Restricted test passed");

              testPostRequest(
                "/api/maakOfUpdateBestelling/1/null/WinkelNaam/10/100/5/Omschrijving/ArtikelNr/GeplaatstDoor/false",
                {
                  url: "https://example.com",
                  adminId: "adminId",
                  adminPw: "adminPw",
                },
                201,
                () => {
                  console.log("Maak Of Update Bestelling test passed");

                  testDeleteRequest(
                    "/api/delBestelling/1/uid/pw",
                    200,
                    () => {
                      console.log("Delete Bestelling test passed");
                      console.log("All tests passed");
                    }
                  );
                }
              );
            }
          );
        }
      );
    }
  );
});
