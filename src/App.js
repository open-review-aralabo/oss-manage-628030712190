import React, { Component } from "react";
import "./App.scss";
import { BrowserRouter, Route, Link } from "react-router-dom";
import Login from "./component/login";
import auth from "./service/auth";
import Logout from "./component/Logout";
import axios from "axios";
import GitHubLogin from "react-github-login";
import Home from "./component/Home";
import Host from "./component/host/Host";

const Contributer = () => (
  <div>
    <h2>Contributer</h2>
    <p>Contributer My Page</p>
  </div>
);

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isAuthenticated: auth.isAuthenticated
    };
  }

  updateState = () => {
    this.setState({ isAuthenticated: auth.isAuthenticated });
  };

  render() {
    return (
      <div className="App">
        <BrowserRouter>
          <div>
            {this.state.isAuthenticated ? (
              <Logout onSuccess={this.updateState} />
            ) : (
              <Login onSuccess={this.updateState} />
            )}
            {this.state.isAuthenticated && (
              <ul>
                <li>
                  <Link to="/">Home</Link>
                </li>
                <li>
                  <Link to="/contributer">Contributer</Link>
                </li>
                <li>
                  <Link to="/host">Host</Link>
                </li>
              </ul>
            )}
            <hr />
            {this.state.isAuthenticated && (
              <div>
                <Route exact path="/" component={Home} />
                <Route path="/contributer" component={Contributer} />
                <Route path="/host" component={Host} />
              </div>
            )}
          </div>
        </BrowserRouter>
      </div>
    );
  }
}

export default App;
