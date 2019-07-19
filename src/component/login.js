import React, { Component } from "react";
import PropTypes from "prop-types";
import { withRouter } from "react-router";
import AuthService from "../service/auth";
import axios from "axios";
import GitHubLogin from "react-github-login";

class Login extends Component {
  static propTypes = {
    onSuccess: PropTypes.func.isRequired
  };

  auth = new AuthService();
  onSuccess = response => {
    console.log(response);
    axios
      .get(
        `https://xxedm95wn9.execute-api.ap-northeast-1.amazonaws.com/production/getToken?code=${
          response.code
        }`
      )
      .then(res => {
        console.log(res.data);
        this.auth.setToken(res.data.accessToken);
        // this.props.history.push('/about')
        this.props.onSuccess();
      });
  };
  onFailure = response => console.error(response);

  render() {
    return (
      <div className="Login">
        <GitHubLogin
          clientId="9fabd2f7d70f162eddf0"
          redirectUri="http://localhost:3000/"
          onSuccess={this.onSuccess}
          onFailure={this.onFailure}
          scope={"read:org user"}
        />
      </div>
    );
  }
}
export default withRouter(Login);
