import React,{useEffect,useState} from 'react';
import {BrowserRouter as Router,Route,Switch} from 'react-router-dom' 
import "./App.css"
import Video from "./components/Video/Video"


function App() {
  return (
    <Router>
      <div className="container">
        <Switch>
        <Route exact path='/' component={Video}></Route>
        <Route path='/:id' component={Video }></Route>
        </Switch>
    </div>
    </Router>
  );
}

export default App;
