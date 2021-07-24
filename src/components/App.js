import React, { Component, useState } from "react";
import Navbar from "./Navbar";
import Users from "./Users";
import axios from "axios";
import Search from "./Search";
import Alert from "./Alert";
import About from "./About";
import { BrowserRouter, Route, Switch, NavLink } from "react-router-dom";
import UserDetails from "./UserDetails";
import GithubState from "../context/githubState";

const App = () => {
  const [users, setUsers] = useState([]);
  const [user, setUser] = useState({});
  const [loading, setLoading] = useState(false);
  const [alert, setAlert] = useState(null);
  const [repos, setRepos] = useState([]);

  const getUser = (username) => {
    setLoading(true);
    setTimeout(() => {
      axios
        .get(`https://api.github.com/users/${username}`)
        .then((res) => {
          setUser(res.data);
          setLoading(false);
        })
        .catch((err) => console.log(err));
    });
  };

  const getUserRepos = (username) => {
    setLoading(true);
    setTimeout(() => {
      axios
        .get(`https://api.github.com/users/${username}/repos`)
        .then((res) => {
          setRepos(res.data);
          setLoading(false);
        })
        .catch((err) => console.log(err));
    });
  };

  const showAlert = (message, type) => {
    setAlert({ message, type });

    setTimeout(() => {
      setAlert({ alert: null });
    }, 3000);
  };

  const clearUsers = () => {
    setUsers([]);
  };

  return (
    // fragment yerine <> </> boş bıraksakta olur.
    //Amaç; div yazarsak ekstradan bir div daha oluşuyor onu engellemek
    <GithubState>
      <BrowserRouter>
        <Navbar title="Github Finder" icon="fab fa-github" />
        <Alert alert={alert} />
        <Switch>
          <Route
            exact
            path="/"
            render={(props) => (
              <>
                <Search
                  clearUsers={clearUsers}
                  showClearButton={users.length > 0 ? true : false}
                  setAlert={showAlert}
                />
                <Users />
              </>
            )}
          />
          <Route path="/about" component={About} />
          <Route
            path="/user/:login"
            render={(props) => (
              <UserDetails
                {...props}
                getUser={getUser}
                getUserRepos={getUserRepos}
                user={user}
                repos={repos}
                loading={loading}
              />
            )}
          />
        </Switch>
      </BrowserRouter>
    </GithubState>
  );
};

export default App;
