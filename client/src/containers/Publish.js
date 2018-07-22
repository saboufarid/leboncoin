import React from "react";
import { Button, Card, CardBody, Container, Col, Row } from "mdbreact";
import axios from "axios";
import ReactFileReader from "react-file-reader";
import Preview from "../components/Preview";

class Publish extends React.Component {
  state = {
    title: "",
    description: "",
    price: "",
    files: []
  };

  handleChange = event => {
    const name = event.target.name;
    const value = event.target.value;
    const updatedState = {};
    updatedState[name] = value;
    this.setState(updatedState);
  };

  handleSubmit = ev => {
    ev.preventDefault();
    const token = this.props.user.token;
    const config = {
      headers: {
        Authorization: "Bearer " + token
      }
    };
    const data = {
      ...this.state
    };

    axios
      .post(`/api/offer/publish`, data, config)
      .then(response => {
        this.props.history.push("/");
      })
      .catch(error => {
        console.log(error);
      });
  };

  handleFiles = data => {
    let { files } = this.state;
    let newFiles = [...files];
    newFiles.push(...data.base64);
    this.setState({
      files: newFiles
    });
  };

  renderPreviews = () => {
    let components = [];
    let { files } = this.state;
    for (let index = 0; index < files.length; index++) {
      components.push(<Preview key={index} src={files[index]} />);
    }
    return components;
  };

  render() {
    return (
      <div id="publish">
        <Container>
          <Card>
            <h1 className="font-weight-bold p-3">Votre annonce</h1>
            <CardBody>
              <Row>
                <Col sm="6">
                  <form onSubmit={this.handleSubmit}>
                    <label htmlFor="title" className="grey-text">
                      Titre annonce
                    </label>
                    <input
                      name="title"
                      type="text"
                      id="title"
                      className="form-control"
                      onChange={this.handleChange}
                    />
                    <br />
                    <label htmlFor="description" className="grey-text">
                      Message
                    </label>
                    <textarea
                      name="description"
                      type="text"
                      id="description"
                      className="form-control"
                      onChange={this.handleChange}
                    />
                    <br />
                    <label htmlFor="price" className="grey-text">
                      Prix
                    </label>
                    <input
                      name="price"
                      type="number"
                      id="price"
                      className="form-control"
                      onChange={this.handleChange}
                    />
                    <br />
                    <Button
                      type="submit"
                      color="blue"
                      onClick={this.Publish}
                      className="m-0"
                    >
                      Valider
                    </Button>
                  </form>
                </Col>
                <Col sm="6" className="d-flex flex-wrap">
                  {this.renderPreviews()}
                  <ReactFileReader
                    fileTypes={[".jpg", ".jpeg", ".png"]}
                    base64={true}
                    multipleFiles={true}
                    handleFiles={this.handleFiles}
                  >
                    <Card className="preview d-flex justify-content-center align-items-center">
                      <i className="fas fa-plus fa-4x" />
                    </Card>
                  </ReactFileReader>
                </Col>
              </Row>
            </CardBody>
          </Card>
        </Container>
        <style jsx>{`
          h1 {
            background: #535353;
            color: white;
            font-size: 20px;
          }
          #publish {
            background: #f9f9f9;
            padding: 50px 0;
          }
          .preview {
            width: 100px;
            height: 100px;
            cursor: pointer;
          }
        `}</style>
      </div>
    );
  }
}

export default Publish;
