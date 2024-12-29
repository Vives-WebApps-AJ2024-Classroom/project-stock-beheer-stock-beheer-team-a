const express = require("express");
const app = express();
const port = 3001;
const cors = require("cors");

const bestellingRoutes = require("./routes/bestellingRoutes");
const gebruikerRoutes = require("./routes/gebruikerRoutes");
const winkelRoutes = require("./routes/winkelRoutes");
const projectRoutes = require("./routes/projectRoutes");

// Middleware to parse JSON bodies
app.use(express.json());
app.use(cors());

// Define a route for the root URL
app.get("/", (req, res) => {
  res.send("Welcome to the Stock Beheer API");
});

// Use routes
app.use("/api", bestellingRoutes);
app.use("/api", gebruikerRoutes);
app.use("/api", winkelRoutes);
app.use("/api", projectRoutes);

if (require.main === module) {
  app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
  });
}

module.exports = app;
