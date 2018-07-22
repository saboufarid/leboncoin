import React from "react";
import { Card } from "mdbreact";
import styled from "styled-components";

const Image = styled.img`
  object-fit: cover;
  padding: 5px;
  width: 100px;
  height: 100px;
`;

const Preview = props => {
  let { src, id } = props;
  return (
    <Card className="mr-2 preview">
      <Image src={src} alt={id} />
    </Card>
  );
};

export default Preview;
