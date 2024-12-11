const http = require("http");
const assert = require("assert");

const testGetRequest = (
  path,
  expectedStatusCode,
  expectedResponseType,
  callback
) => {
  const options = {
    hostname: "localhost",
    port: 3000,
    path: path,
    method: "GET",
  };

  const req = http.request(options, (res) => {
    let data = "";

    // A chunk of data has been received.
    res.on("data", (chunk) => {
      data += chunk;
    });

    // The whole response has been received.
    res.on("end", () => {
      assert.strictEqual(res.statusCode, expectedStatusCode);
      if (expectedResponseType === "text") {
        assert.strictEqual(
          res.headers["content-type"],
          "text/html; charset=utf-8"
        );
      } else if (expectedResponseType === "json") {
        assert.strictEqual(
          res.headers["content-type"],
          "application/json; charset=utf-8"
        );
        data = JSON.parse(data);
        assert.ok(Array.isArray(data));
      }
      callback();
    });
  });

  req.on("error", (e) => {
    console.error(`Problem with request: ${e.message}`);
  });

  req.end();
};

const testPostRequest = (path, body, expectedStatusCode, callback) => {
  const options = {
    hostname: "localhost",
    port: 3000,
    path: path,
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
  };

  const req = http.request(options, (res) => {
    let data = "";

    // A chunk of data has been received.
    res.on("data", (chunk) => {
      data += chunk;
    });

    // The whole response has been received.
    res.on("end", () => {
      assert.strictEqual(res.statusCode, expectedStatusCode);
      callback();
    });
  });

  req.on("error", (e) => {
    console.error(`Problem with request: ${e.message}`);
  });

  // Write data to request body
  req.write(JSON.stringify(body));
  req.end();
};

const testPutRequest = (path, expectedStatusCode, callback) => {
  const options = {
    hostname: "localhost",
    port: 3000,
    path: path,
    method: "PUT",
  };

  const req = http.request(options, (res) => {
    let data = "";

    // A chunk of data has been received.
    res.on("data", (chunk) => {
      data += chunk;
    });

    // The whole response has been received.
    res.on("end", () => {
      assert.strictEqual(res.statusCode, expectedStatusCode);
      callback();
    });
  });

  req.on("error", (e) => {
    console.error(`Problem with request: ${e.message}`);
  });

  req.end();
};

const runTests = () => {
  testGetRequest("/", 200, "text", () => {
    console.log("Root URL test passed");
    testGetRequest("/api/winkels", 200, "json", () => {
      console.log("Winkels test passed");
      testGetRequest("/api/getBestellingen/1", 200, "json", () => {
        console.log("Bestellingen test passed");
        testGetRequest("/api/getStudenten/1", 200, "json", () => {
          console.log("Studenten test passed");
          testGetRequest("/api/getCoach/1", 200, "json", () => {
            console.log("Coach test passed");
            testPostRequest(
              "/api/maakWinkel/Naam/Specializatie/UID/PW",
              { url: "https://example.com" },
              201,
              () => {
                console.log("Maak Winkel test passed");
                // Update the UID and PW to match the coach's credentials
                const coachUID = "william.R@example.com"; // Replace with the correct UID
                const coachPW = "secretpassword"; // Replace with the correct password
                const bestellingId = 1; // Replace with the correct bestelling ID
                testPutRequest(
                  `/api/keurGoed/${bestellingId}/${coachUID}/${coachPW}`,
                  200,
                  () => {
                    console.log("Keur Goed test passed");
                  }
                );
              }
            );
          });
        });
      });
    });
  });
};

runTests();
