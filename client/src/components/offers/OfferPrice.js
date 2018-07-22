import React from "react";

const OfferPrice = props => {
  if (props.price) {
    return (
      <div id="price">
        {props.price} €
        <style jsx>{`
          #price {
            color: var(--color-orange);
            font-size: 20px;
            font-weight: bold;
          }
        `}</style>
      </div>
    );
  }
  return null;
};

export default OfferPrice;
