import React, { Component } from "react";
import PropTypes from "prop-types";
import { withRouter } from "react-router";
import auth from "../service/auth";

class Logout extends Component {
  static propTypes = {
    onSuccess: PropTypes.func.isRequired
  };

  logout = () => {
    auth.removeToken();
    this.props.onSuccess();
    this.props.history.push("/");
  };
  render() {
    return (
      <div className="Logout">
        <button onClick={this.logout}>Logout</button>
      </div>
    );
  }
}
export default withRouter(Logout);
