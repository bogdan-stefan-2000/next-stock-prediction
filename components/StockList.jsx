import React from "react";
import StockListItem from "./StockListItem";

const StockList = ({ stocks }) => {
  if (stocks && stocks.length > 0) {
    return (
      <div className="card card-container d-flex flex-column align-item-center justify-content-center mt-3 px-2 pb-2 w-80p">
        {stocks.map((stock) => {
          return <StockListItem key={stock.timestamp} stock={stock} />;
        })}
      </div>
    );
  }
};

export default StockList;
