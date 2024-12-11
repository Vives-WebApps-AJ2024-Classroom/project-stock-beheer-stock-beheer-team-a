const express = require("express");
const app = express();
const port = 3000;

const bestellingRoutes = require("./routes/bestellingRoutes");
const gebruikerRoutes = require("./routes/gebruikerRoutes");
const winkelRoutes = require("./routes/winkelRoutes");

// Define a route for the root URL
app.get("/", (req, res) => {
  res.send("Welcome to the Stock Beheer API");
});

// Use routes
app.use("/api", bestellingRoutes);
app.use("/api", gebruikerRoutes);
app.use("/api", winkelRoutes);

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
