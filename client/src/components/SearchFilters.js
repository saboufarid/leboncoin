import React, { Component } from "react";
import { Button, Container, Row, Col } from "mdbreact";
import queryString from "query-string";

class SearchFilters extends Component {
  state = {
    title: "",
    priceMin: 0,
    priceMax: 0,
    sort: "date-asc",
    skip: 0,
    limit: 25
  };

  handleChange = event => {
    const name = event.target.name;
    const value = event.target.value;

    this.setState({
      [name]: value,
      skip: 0,
      limit: 25
    });
  };

  handleNumberChange = event => {
    const name = event.target.name;
    const value = event.target.value;

    this.setState({
      [name]: parseInt(value, 10),
      skip: 0,
      limit: 25
    });
  };

  handleSortChange = event => {
    const name = event.target.name;
    const value = event.target.value;

    this.setState(
      {
        [name]: value,
        skip: 0,
        limit: 25
      },
      () => this.onSubmit(null)
    );
  };

  onSubmit = event => {
    let newState = {};

    if (event) event.preventDefault();

    newState = Object.assign(
      newState,
      ...Object.entries(this.state)
        .filter(val => val[1])
        .map(val => ({ [val[0]]: val[1] }))
    );
    let filters = queryString.stringify(newState);

    this.props.search(filters ? "?" + filters : "");
  };

  onClickPrevious = event => {
    let { skip } = this.state;
    skip -= 25;
    this.setState(
      {
        skip
      },
      () => this.onSubmit(null)
    );
  };

  onClickNext = event => {
    let { skip } = this.state;
    skip += 25;
    this.setState(
      {
        skip
      },
      () => this.onSubmit(null)
    );
  };

  render() {
    const { offerslength } = this.props;
    const { skip } = this.state;

    return (
      <div id="search">
        <Container>
          <form onSubmit={this.onSubmit}>
            <Row>
              <Col sm="9" className="mb-4">
                <input
                  className="form-control"
                  placeholder="Que recherchez-vous ?"
                  name="title"
                  type="text"
                  value={this.state.title}
                  onChange={this.handleChange}
                />
              </Col>
              <Col sm="3">
                <Button color="blue" type="submit" className="m-0 w-100">
                  Rechercher
                </Button>

                {/* <input type="submit" value="Rechercher" /> */}
              </Col>
            </Row>
            <Row>
              <Col sm="9">
                <span>Prix entre</span>
                <input
                  className="form-control w-30"
                  placeholder="Prix min"
                  name="priceMin"
                  type="number"
                  min="0"
                  value={this.state.priceMin}
                  onChange={this.handleNumberChange}
                />
                <span>et</span>
                <input
                  className="form-control w-30"
                  placeholder="Prix max"
                  name="priceMax"
                  type="number"
                  min="0"
                  value={this.state.priceMax}
                  onChange={this.handleNumberChange}
                />
              </Col>
              <Col sm="3">
                <select
                  name="sort"
                  className="form-control"
                  value={this.state.sort}
                  onChange={this.handleSortChange}
                >
                  <option value="date-desc">Tri: Plus récentes</option>
                  <option value="date-asc">Tri: Plus anciennes</option>
                  <option value="price-desc">Tri: Prix décroissants</option>
                  <option value="price-asc">Tri: Prix croissants</option>
                </select>
              </Col>
            </Row>
            <Row className="mt-5">
              <Col sm="7" />
              <Col sm="5">
                <Button disabled={!skip} onClick={this.onClickPrevious}>
                  Page précédente
                </Button>
                <Button
                  disabled={offerslength !== 25}
                  onClick={this.onClickNext}
                >
                  Page suivante
                </Button>
              </Col>
            </Row>
          </form>
        </Container>
        <style jsx>{`
          #search {
            background: #e6e6e6;
            padding: 50px 0;
          }

          .w-30 {
            width: 100px;
            display: inline-block;
          }
        `}</style>
      </div>
    );
  }
}

export default SearchFilters;
