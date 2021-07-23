import React, { Component } from "react";
import { Loading } from "./Loading";
import User from "./User";

class Users extends Component {
  
  render() {
    if (this.props.Loading) {
      return <Loading />
    } else {
    return (
      <div className="container mt-3">
          <div className="row">
        {this.props.users.map((user) => (
            <User user={user} key={user.id} />
            
        ))}
      </div>
      </div>
    );
  }
}
}

export default Users;
