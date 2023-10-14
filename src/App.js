import "./App.css";
import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import Home from "./components/home";
import About from "./components/about";
import Navbar from "./components/navbar";
import NoteState from "./context/notes/noteState";
import Login from "./components/Login";
import Signup from "./components/Signup";
function App() {
  return (
    // react-router-dom v5 m hi kam krta h swtich isly v5 download krna tbhi ye niche wala kam krega
    <NoteState>

    
    <Router>
      <div className="App">
        <Navbar home="my home" />
        <Switch>
          <Route exact path="/">
            <Home />
          </Route>
          <Route exact path="/about">
            <About />
          </Route>
          <Route exact path="/login">
            <Login/>
          </Route>
          <Route exact path="/signup">
            <Signup/>
          </Route>
         
        </Switch>
      </div>
    </Router>
    </NoteState>
  );
}

export default App;
