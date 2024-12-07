import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Route, Routes, Link, useNavigate, useParams } from 'react-router-dom';
import { Example } from "./example";

const App = () => {
  
  return (
<Router>
    <nav>
        <Link to="/bestelling">Bestelling plaatsen</Link> | <Link to="/groeps-overzicht">Overzicht</Link>
    </nav>
    <Routes>
        <Route path="/" element={<Example/>} />
        <Route path="/about/:name" element={<Example />} />
    </Routes>
</Router>

  );
};


export default App;
