import React from "react";

const OfferDescription = props => {
  if (props.text) {
    return (
      <div id="offerDescription" className="mt-3">
        <h3 className="font-weight-bold">Description</h3>
        <p>{props.text}</p>
        <style jsx>{`
          #offerDescription h3 {
            font-size: 20px;
          }
        `}</style>
      </div>
    );
  }
  return null;
};

export default OfferDescription;
