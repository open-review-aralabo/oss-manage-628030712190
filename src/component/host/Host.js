import React, { Component } from "react";
import { withRouter } from "react-router";
// import { withFormik, Field, Formik } from 'formik'
import axios from "axios";
import $ from "jquery";
import { Table } from "reactstrap";
import styles from "./Host.module.sass";
import auth from "../../service/auth";

const styleWidth = width => {
  return { width: `${width}px` };
};

class Host extends Component {
  constructor(props) {
    super(props);
    this.state = {
      orgeRepoDict: {},
      repoDict: {},
      repoIssueDict: {},
      issueDict: {}
    };
  }
  componentDidMount() {
    this.init();
  }

  init = async () => {
    console.log("init!!!!!!");
    const getRepos = axios.get(
      `https://api.github.com/user/repos?access_token=${auth.token}`
    );

    const orgs = await axios.get(
      `https://api.github.com/user/orgs?access_token=${auth.token}`
    );
    const getOrgRepos = orgs.data.map(org =>
      axios.get(
        `https://api.github.com/orgs/${org.login}/repos?access_token=${
          auth.token
        }`
      )
    );

    const promises = getOrgRepos.concat([getRepos]);
    console.log(promises);
    Promise.all(promises).then(resArray => {
      console.log(resArray);
      const repos = [].concat.apply([], resArray.map(res => res.data));
      this.setRepos(repos);
    });
  };

  setRepos = repoList => {
    const newState = $.extend(true, {}, this.state.repoDict);
    this.setState({
      repoDict: Object.assign(
        newState,
        repoList.reduce(
          (obj, item) => Object.assign(obj, { [item.id]: item }),
          {}
        )
      )
    });
    console.log(this.state.repoDict);
  };

  getRepoIssues = async repo => {
    const res = await axios.get(
      `https://api.github.com/repos/${repo.owner.login}/${
        repo.name
      }/issues?access_token=${auth.token}`
    );
    this.setRepoIssue(repo.id, res.data);
  };

  setRepoIssue = (repoId, issueList) => {
    this.setIssues(issueList);

    const newState2 = $.extend(true, {}, this.state.repoIssueDict);
    newState2[repoId] = issueList.map(issue => issue.id);
    this.setState({
      repoIssueDict: newState2
    });
    console.log(this.state.repoIssueDict);
  };

  setIssues = issueList => {
    const newState = $.extend(true, {}, this.state.issueDict);
    this.setState({
      issueDict: Object.assign(
        newState,
        issueList.reduce(
          (obj, item) => Object.assign(obj, { [item.id]: item }),
          {}
        )
      )
    });
    console.log(this.state.issueDict);
  };

  onSubmit = e => {
    e.preventDefault();
    console.log(this.formValue);
  };

  handleChange = e => {
    if (this.formValue[e.target.name]) {
      this.formValue[e.target.name]["amount"] = e.target.value;
    } else {
      this.formValue[e.target.name] = { amount: e.target.value };
    }
  };

  handleCheckbox = e => {
    if (this.formValue[e.target.name]) {
      const checked = this.formValue[e.target.name]["checked"];
      this.formValue[e.target.name]["checked"] = !checked;
    } else {
      this.formValue[e.target.name] = { checked: true };
    }
  };

  formValue = {};

  render() {
    return (
      <div className="Host">
        {console.log("render" + new Date())}
        <h1>Host Page</h1>

        <form onSubmit={this.onSubmit}>
          <button type="submit">Submit</button>
          <Table hover size="sm" className={styles.blue}>
            <thead className={styles.error}>
              <tr>
                <th style={styleWidth(500)} className={styles.blue}>
                  Repository
                </th>
                <th>Issue</th>
                <th>Status</th>
                <th>Amount</th>
                <th>Check</th>
              </tr>
            </thead>
            <tbody>
              {Object.entries(this.state.repoDict)
                .map(([repoId, repo]) => repo)
                .sort((a, b) => {
                  if (a.owner.type < b.owner.type) return -1;
                  if (a.owner.type > b.owner.type) return 1;
                  if (a.name.toLowerCase() < b.name.toLowerCase()) return -1;
                  if (a.name.toLowerCase() > b.name.toLowerCase()) return 1;
                  return 0;
                })
                .map((repo, repoIndex) => [
                  <tr key={repoIndex} onClick={() => this.getRepoIssues(repo)}>
                    <th>{repo.name + ` (${repo.owner.login})`}</th>
                    <td />
                    <td />
                    <td />
                    <td />
                  </tr>,
                  this.state.repoIssueDict[repo.id] &&
                    this.state.repoIssueDict[repo.id].map(
                      (issueId, issueIndex) => (
                        <tr key={"" + repoIndex + issueIndex}>
                          <td />
                          <td
                            scope="row"
                            onClick={() =>
                              window.open(
                                this.state.issueDict[issueId].html_url
                              )
                            }
                          >
                            {this.state.issueDict[issueId].title}
                          </td>
                          <td>{this.state.issueDict[issueId].state}</td>
                          {/* issueId */}
                          <td>
                            <input
                              type="number"
                              name={issueId}
                              onChange={this.handleChange}
                            />
                            Ether
                          </td>
                          <td>
                            <input
                              type="checkbox"
                              name={issueId}
                              value={true}
                              onChange={this.handleCheckbox}
                            />
                          </td>
                        </tr>
                      )
                    )
                ])}
            </tbody>
          </Table>
        </form>
      </div>
    );
  }
}
export default withRouter(Host);
