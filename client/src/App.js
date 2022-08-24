import React, { useState, useEffect } from "react";
import "./App.css";
import Toggle from "./components/Toggle";
import Journeys from "./subpages/Journeys";
import Stations from "./subpages/Stations";

function App() {
  const [subPage, setSubPage] = useState("journeys");

  return (
    <div className="App">
      <header className="App-header">
        <h1 className="maintitle gradient-text">
          WELCOME TO THE CITY-BIKE APP
        </h1>
        <p className="subtitle">Helsinki</p>
      </header>
      <Toggle setSubPage={setSubPage} />
      {subPage == "journeys" ? <Journeys /> : <Stations />}
    </div>
  );
}

export default App;
