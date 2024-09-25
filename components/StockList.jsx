import React from "react";
import StockListItem from "./StockListItem";

const StockList = ({ stocks }) => {
  function downloadCSV() {
    const csvContent = `data:text/csv;charset=utf-8, ${stocks
      .map((stock) => `${stock.stockId},${stock.timestamp},${stock.value}`)
      .join("\n")}`;

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `${stocks[0].stockId}.csv`);
    document.body.appendChild(link);
    link.click();
  }

  if (stocks && stocks.length > 0) {
    return (
      <div className="card card-container d-flex flex-column align-item-center justify-content-center mt-3 px-2 pb-2 w-80p">
        {stocks.map((stock) => {
          return <StockListItem key={stock.timestamp} stock={stock} />;
        })}
        <button
          onClick={downloadCSV}
          className="btn btn-primary align-self-end mt-2"
        >
          Download CSV
        </button>
      </div>
    );
  }
};

export default StockList;
