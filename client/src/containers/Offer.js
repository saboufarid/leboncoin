import React from "react";
import axios from "axios";
import { Button, Card, CardBody, Col, Container, Fa, Row } from "mdbreact";
import Main from "../components/Main";
import OfferPrice from "../components/offers/OfferPrice";
import OfferImage from "../components/offers/OfferImage";
import OfferDescription from "../components/offers/OfferDescription";

class Offer extends React.Component {
  state = {
    informations: {},
    showPhone: false
  };

  showPhone = () => {
    this.setState({
      showPhone: true
    });
  };

  render() {
    const {
      title,
      price,
      description,
      pictures,
      creator
    } = this.state.informations;
    let imgUrl = "";
    if (pictures && pictures.length > 0) {
      imgUrl = pictures[0].url;
    }

    return (
      <Main>
        <Container>
          <Row>
            <Col sm="8">
              <Card>
                <OfferImage page="offer" imgUrl={imgUrl} />
                <CardBody>
                  {title}
                  <OfferPrice price={price} />
                </CardBody>
              </Card>
              <OfferDescription text={description} />
            </Col>
            <Col sm="4">
              <Card>
                <CardBody>
                  <div className="d-flex align-items-center justify-content-center">
                    <Fa icon="user" id="userIcon" className="mr-3 text-white" />{" "}
                    <h3 className="font-weight-bold m-0">
                      {creator ? creator.account.username : ""}
                    </h3>
                  </div>
                  <br />
                  <Button color="lbcOrange" onClick={this.showPhone}>
                    {this.state.showPhone ? (
                      "06 51 44 45 07"
                    ) : (
                      <React.Fragment>
                        <Fa icon="phone" className="mr-2" />
                        <b>Voir le numéro</b>
                      </React.Fragment>
                    )}
                  </Button>
                </CardBody>
              </Card>
            </Col>
          </Row>
        </Container>
        <style jsx>{`
          #userIcon {
            background: var(--color-orange);
            border-radius: 100%;
            color: white;
            font-size: 30px;
            padding: 10px 15px;
          }
          .btn-lbcOrange {
            background: var(--color-orange);
            font-size: 15px;
            text-transform: initial;
            width: 100%;
          }
          h3 {
            font-size: 20px;
          }
          .offerImg {
            height: 300px;
          }
        `}</style>
      </Main>
    );
  }
  componentDidMount() {
    axios
      .get(
        `/api/offer/` + this.props.match.params.id
      )
      .then(response => {
        this.setState({
          informations: response.data
        });
      })
      .catch(error => {
        console.log(error);
      });
  }
}

export default Offer;
