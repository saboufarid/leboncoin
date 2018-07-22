import React from "react";
import { Link } from "react-router-dom";

const OfferTitle = props => {
  return (
    <h2>
      <Link to={"/offer/" + props.id} className="p-0">
        {props.title}
        <style jsx>{`
          h2 a {
            color: var(--color-blue);
            font-size: 20px;
          }
        `}</style>
      </Link>
    </h2>
  );
};

export default OfferTitle;
