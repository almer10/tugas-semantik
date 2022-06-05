import React, {} from "react";
import "./App.css";
import "./styles/main_styles.css";
import "./styles/responsive.css";

import { BrowserRouter as Router, Route } from "react-router-dom";

import Home from "./Pages/Home";

function App() {
  
  return (
    <div className="App">
      <Router>
        <Route exact path="/" component={Home}></Route>
      </Router>
    </div>
  );
}

export default App;
