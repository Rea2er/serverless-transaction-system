import React, { Component } from "react";
import axios from "axios";
import { Modal, Button } from "react-bootstrap";
import errMsg from "./errormessages";

class Search extends Component {
  constructor(props) {
    super(props);
    this.state = {
      jobpart: [],
      search: "",
      tableFlag: false,
      errorMsg: "",
      loading: false,
    };
  }

  handleLoadingClose = (e) => {
    this.setState({ loading: false });
  };

  onChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
      validationErrorFlag: false,
    });
  };

  async apiCall() {
    this.setState({
      loading: true,
    });
    await axios
      .get(
        `http://afternoon-taiga-86166.herokuapp.com/api/jobList?jobName=${this.state.search}`
      )
      .then((res) => {
        this.setState({
          loading: false,
        });
        let obj = {};
        obj = res.data.result;
        this.setState({
          jobpart: obj,
          tableFlag: true,
          errorMsg: "",
          loading: false,
        });
      })
      .catch((err) => {
        if (err.response) {
          this.setState({
            tableFlag: false,
            errorMsg: err.response.data.error,
            loading: false,
          });
        } else {
          this.setState({
            tableFlag: false,
            errorMsg: errMsg["4"],
            loading: false,
          });
        }
      });

    await axios.get(`http://localhost:4000/api/jobs/${this.state.search}`);
  }

  onSearch = (e) => {
    e.preventDefault();
    if (this.state.search) {
      this.apiCall();
    }
  };

  searchResults() {
    return (
      <div>
        {this.state.tableFlag ? (
          <div>
            <div className="col-12 col-sm-12 pt-4">
              <table className="table table-hover">
                <thead className="thead">
                  <tr>
                    <th>JobName</th>
                  </tr>
                </thead>
                <tbody>
                  {this.state.jobpart.map((data) => {
                    return (
                      <tr key={Math.random()}>
                        <th>
                          <a href={`/login/${data.jobName}`}>{data.jobName}</a>
                        </th>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        ) : (
          <div></div>
        )}
        <Modal
          show={this.state.loading}
          onHide={this.handleLoadingClose}
          centered
        >
          <Modal.Header closeButton>
            <Modal.Title>Loading</Modal.Title>
          </Modal.Header>
          <Modal.Body>The details are loading please wait....</Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={this.handleLoadingClose}>
              Close
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
    );
  }

  render() {
    return (
      <div>
        <div className="search pt-3 ml-3">
          <p className="error-msg" style={{ color: "red" }}>
            {this.state.errorMsg ? this.state.errorMsg : null}
          </p>
          <h4
            className="search pt-3 ml-3 text-dark font-weight-bold"
            style={{ fontFamily: "Sans" }}
          >
            Search page
          </h4>
          <div className="border rounded pt-1 ml-3" style={{ width: "20%" }}>
            <form>
              <input
                type="text"
                placeholder="Search"
                className="mr-sm-2"
                name="search"
                value={this.state.search}
                onChange={this.onChange}
                style={{
                  border: "2px solid red",
                  borderRadius: "4px",
                }}
              />
              <Button
                type="submit"
                variant="outline-success"
                onClick={this.onSearch}
              >
                Search
              </Button>
            </form>
          </div>
          {this.searchResults()}
        </div>
      </div>
    );
  }
}

export default Search;
