import React from "react";

const StockListItem = ({ stock }) => {
  return (
    <div className="card card-container full-width p-1 d-flex flex-row align-item-center justify-content-between bg-l-gray mt-2">
      <span>
        <span className="text_bold">StockId:</span> {stock.stockId}
      </span>
      <span>
        <span className="text_bold">Timestamp:</span> {stock.timestamp}
      </span>
      <span>
        <span className="text_bold">Value:</span> {stock.value}
      </span>
    </div>
  );
};

export default StockListItem;
