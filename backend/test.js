//test scipt om de GET requests te testen

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

    res.on("data", (chunk) => {
      data += chunk;
    });

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
          });
        });
      });
    });
  });
};

runTests();
