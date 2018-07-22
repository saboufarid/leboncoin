import React, { Fragment } from "react";
import axios from "axios";
import { Card, CardBody, Col, Container, Row } from "mdbreact";
import Main from "../components/Main";
import OfferImage from "../components/offers/OfferImage";
import OfferTitle from "../components/offers/OfferTitle";
import OfferPrice from "../components/offers/OfferPrice";
import SearchFilters from "../components/SearchFilters";

class Home extends React.Component {
  state = {
    offers: []
  };

  search = filters => {
    axios
      .get(`/api/offer${filters}`)
      .then(response => {
        if (response.data) {
          this.setState({
            offers: response.data
          });
        }
      })
      .catch(err => {
        console.log(err);
      });
  };

  render() {
    const { offers } = this.state;
    let data = [];
    for (let offer of offers) {
      const { _id, title, price, pictures } = offer;
      let imgUrl = "";
      if (pictures && pictures.length > 0) {
        imgUrl = pictures[0].url;
      }
      data.push(
        <li key={_id} className="li-nostyle mb-4 pb-4">
          <Row>
            <Col sm="3">
              <OfferImage imgUrl={imgUrl} page="list" id={_id} />
            </Col>
            <Col sm="9">
              <OfferTitle title={title} id={_id} />
              <OfferPrice price={price} />
            </Col>
          </Row>
        </li>
      );
    }

    return (
      <Fragment>
        <SearchFilters search={this.search} offerslength={offers.length} />
        <Main>
          <Container>
            <Card>
              <CardBody>
                <ul id="offers" className="p-0">
                  {data}
                </ul>
              </CardBody>
            </Card>
          </Container>
          <style jsx>{`
            .offerImg {
              height: 125px;
            }
            #offers li {
              border-bottom: 1px solid var(--color-grayLight);
            }
            #offers li:last-child {
              border: 0 !important;
              margin-bottom: 0 !important;
            }
          `}</style>
        </Main>
      </Fragment>
    );
  }
  componentDidMount() {
    this.search("?limit=25");
  }
}

export default Home;
