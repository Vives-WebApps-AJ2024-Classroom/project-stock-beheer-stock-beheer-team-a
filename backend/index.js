const express = require("express");
const app = express();
const port = 3000;

const bestellingRoutes = require("./routes/bestellingRoutes");
const gebruikerRoutes = require("./routes/gebruikerRoutes");
const winkelRoutes = require("./routes/winkelRoutes");

// Middleware to parse JSON bodies
app.use(express.json());

// Define a route for the root URL
app.get("/", (req, res) => {
  res.send("Welcome to the Stock Beheer API");
});

// Use routes
app.use("/api", bestellingRoutes);
app.use("/api", gebruikerRoutes);
app.use("/api", winkelRoutes);

if (require.main === module) {
  app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
  });
}

module.exports = app;
