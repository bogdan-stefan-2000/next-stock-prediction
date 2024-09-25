"use client";
import React, { useEffect } from "react";
import StockForm from "@components/StockForm";
import { useState } from "react";
import StockList from "@components/StockList";

const Home = () => {
  const [stockDataEntries, SetStockDataEntries] = useState([]);
  const [files, setFiles] = useState([]);
  const [req, setReq] = useState("");

  useEffect(() => {
    const fetchFiles = async () => {
      const response = await fetch("api/stocks/files");
      const data = await response.json();
      setFiles(data);
    };
    if (files.length === 0) {
      fetchFiles();
    }
  });

  const fetchStockDataWithPrediction = async () => {
    try {
      const res = await fetch(`api/stocks`, {
        method: "POST",
        body: JSON.stringify(req),
      });
      if (!res.ok) {
        const resMessage = await res.json();
        throw new Error(resMessage.message);
      }
      const stocks = await res.json();
      const response = await fetch(`api/stocks/predict`, {
        method: "POST",
        body: JSON.stringify(stocks),
      });
      if (!response.ok) {
        const responseMessage = await res.json();
        throw new Error(responseMessage.message);
      }
      const data = await response.json();

      SetStockDataEntries(data);
    } catch (error) {
      alert(error.message);
    }
  };

  if (req !== "") {
    fetchStockDataWithPrediction();
    setReq("");
  }

  function handleFetchDataEntries(req) {
    setReq(req);
  }
  return (
    <section className="w-full d-flex flex-column align-items-center">
      <h1 className="head_text">Stock Prediction</h1>
      <StockForm onSubmit={handleFetchDataEntries} />
      {stockDataEntries && stockDataEntries.length
        ? stockDataEntries.map((stockData) => {
            return <StockList stocks={stockData} />;
          })
        : ""}
    </section>
  );
};

export default Home;
