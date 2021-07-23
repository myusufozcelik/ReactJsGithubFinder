import React, { Component, Fragment } from "react";
import Navbar from "./Navbar";
import Users from "./Users";
import axios from "axios";
import Search from "./Search";
import Alert from "./Alert";
export class App extends Component {
  constructor(props) {
    super(props);
    this.searchUsers = this.searchUsers.bind(this);
    this.clearUsers = this.clearUsers.bind(this);
    this.setAlert = this.setAlert.bind(this);
    this.state = {
      loading: false,
      users: [],
      alert: null
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

  setAlert(message, type) {
    this.setState({
      alert: { message, type },
    });

    setTimeout(() => {
      this.setState({ alert: null})
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
      <Fragment>
        <Navbar title="Github Finder" icon="fab fa-github" />
        <Alert alert={alert} />
        <Search
          searchUsers={this.searchUsers}
          clearUsers={this.clearUsers}
          showClearButton={this.state.users.length > 0 ? true : false}
          setAlert={this.setAlert}
        />
        <Users users={users} loading={loading} />
      </Fragment>
    );
  }
}

export default App;
