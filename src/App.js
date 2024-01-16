import React from "react";
import { Options } from "./constants.js";
import CustomAutocomplete from "./Components/AutoComplete/index.jsx";
import "./App.css";

function App() {
  return (
    <div className="App">
      <div className="header">Custom Auto Complete</div>
      <CustomAutocomplete options={Options} defaultValue={[Options[0]]} />
    </div>
  );
}

export default App;
