import React, { Component, Fragment } from "react";
import Navbar from "./Navbar";
import Users from "./Users";
import axios from "axios";
import Search from "./Search";
import Alert from "./Alert";
import About from "./About";
import { BrowserRouter, Route, Switch, NavLink } from "react-router-dom";
import UserDetails from "./UserDetails";

export class App extends Component {
  constructor(props) {
    super(props);
    this.searchUsers = this.searchUsers.bind(this);
    this.clearUsers = this.clearUsers.bind(this);
    this.setAlert = this.setAlert.bind(this);
    this.getUser = this.getUser.bind(this);
    this.getUserRepos = this.getUserRepos.bind(this);
    this.state = {
      loading: false,
      users: [],
      user: {},
      repos: [],
      alert: null,
    };
  }

  searchUsers(keyword) {
    this.setState({
      loading: true,
    });

    axios.get(`https://api.github.com/search/users?q=${keyword}`).then((res) =>
      this.setState({
        users: res.data.items,
        loading: false,
      })
    );
  }

  getUser(username) {
    this.setState({
      loading: true,
    });
    setTimeout(() => {
      axios
        .get(`https://api.github.com/users/${username}`)
        .then((res) => this.setState({ user: res.data, loading: false }))
        .catch((err) => console.log(err));
    });
  }

  getUserRepos(username) {
    this.setState({
      loading: true,
    });
    setTimeout(() => {
      axios
        .get(`https://api.github.com/users/${username}/repos`)
        .then((res) => this.setState({ repos: res.data, loading: false }))
        .catch((err) => console.log(err));
    });
  }

  setAlert(message, type) {
    this.setState({
      alert: { message, type },
    });

    setTimeout(() => {
      this.setState({ alert: null });
    }, 3000);
  }

  clearUsers() {
    this.setState({
      users: [],
    });
  }

  render() {
    const { users, loading, alert } = this.state;
    return (
      // fragment yerine <> </> boş bıraksakta olur.
      //Amaç; div yazarsak ekstradan bir div daha oluşuyor onu engellemek
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
                  searchUsers={this.searchUsers}
                  clearUsers={this.clearUsers}
                  showClearButton={this.state.users.length > 0 ? true : false}
                  setAlert={this.setAlert}
                />
                <Users users={users} loading={loading} />
              </>
            )}
          />
          <Route path="/about" component={About} />
          <Route
            path="/user/:login"
            render={(props) => (
              <UserDetails
                {...props}
                getUser={this.getUser}
                getUserRepos={this.getUserRepos}
                user={this.state.user}
                repos={this.state.repos}
                loading={this.state.loading}
              />
            )}
          />
        </Switch>
      </BrowserRouter>
    );
  }
}

export default App;
