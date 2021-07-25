import React, { Component, useState } from "react";
import Navbar from "./Navbar";
import Alert from "./Alert";
import About from "./About";
import { BrowserRouter, Route, Switch, NavLink } from "react-router-dom";
import UserDetails from "./UserDetails";
import GithubState from "../context/github/githubState";
import AlertState from "../context/alert/alertState";
import NotFound from "./NotFound";
import Home from "./Home";

const App = () => {
  return (
    // fragment yerine <> </> boş bıraksakta olur.
    //Amaç; div yazarsak ekstradan bir div daha oluşuyor onu engellemek
    <GithubState>
      <AlertState>
        <BrowserRouter>
          <Navbar title="Github Finder" icon="fab fa-github" />
          <Alert />
          <Switch>
            <Route exact path="/" component={Home} />
            <Route path="/about" component={About} />
            <Route path="/user/:login" component={UserDetails} />
            <Route component={NotFound} />
          </Switch>
        </BrowserRouter>
      </AlertState>
    </GithubState> 
  );
};

export default App;
