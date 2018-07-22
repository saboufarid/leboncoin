import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

const Image = styled.img`
  object-fit: cover;
  /* background-size: cover;
  background-position: center; */
  width: 100%;
`;

const OfferImage = props => {
  let imgUrl = "";
  if (props.imgUrl) {
    imgUrl = props.imgUrl;
  } else {
    imgUrl = "https://reactjs.org/logo-og.png";
  }

  if (props.page === "offer") {
    return (
      <React.Fragment>
        <Image src={imgUrl} className="offerImg" />
      </React.Fragment>
    );
  } else if (props.page === "list") {
    return (
      <Link to={"/offer/" + props.id} className="p-0">
        <Image src={imgUrl} className="offerImg" />
      </Link>
    );
  }
};

export default OfferImage;
