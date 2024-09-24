"use client";
import React, { useEffect } from "react";
import { useState } from "react";

const StockForm = ({ files, onSubmit }) => {
  const [numberOfFiles, setNumberOfFiles] = useState(1);
  const [selectedFile, setSelectedFile] = useState("Choose");
  const [selectedOpertaion, setSelectedOpertaion] = useState(1);

  function handleAddNumberOfFiles() {
    if (numberOfFiles < 2) {
      setNumberOfFiles((currNumberOfFiles) => currNumberOfFiles + 1);
    }
  }

  function handleSubstractNumberOfFiles() {
    if (numberOfFiles > 1) {
      setNumberOfFiles((currNumberOfFiles) => currNumberOfFiles - 1);
    }
  }

  function handleChange(e) {
    setSelectedFile(e.target.value);
  }

  function handleSubmit() {
    if (selectedFile === "Choose") {
      alert("Please select a Stock Exchange!");
      return;
    }
    let arr = files.slice();
    let csvs = arr.slice().filter((file) => file[0] === selectedFile);
    let req = {
      dir: selectedFile,
      csvFiles: csvs[0].slice().filter((file) => file !== selectedFile),
      numberOfFiles: numberOfFiles,
      operationId: selectedOpertaion,
    };
    onSubmit(req);
  }

  return (
    <div className="d-flex flex-column align-items-center justify-content-center mt-4">
      <div className="flex-center d-flex flex-row">
        <div className="d-flex flex-row align-items-center justify-content-center">
          <span className="me-3 text_xl text_black">Stock Exchange</span>
          <select
            className="round"
            value={selectedFile}
            onChange={handleChange}
          >
            <option key="Choose" value="Choose">
              Choose
            </option>
            {files.map((file) => {
              return (
                <option key={file[0]} value={file[0]}>
                  {file[0]}
                </option>
              );
            })}
          </select>
        </div>

        <div className="ms-2 d-flex flex-row">
          <span className="me-3 text_xl text_black">Number of files:</span>
          <div className="d-flex flex-row align-items-center justify-content-center">
            <button
              className="btn btn-primary"
              onClick={handleSubstractNumberOfFiles}
            >
              -
            </button>
            <span className="px-2 text_xl">{numberOfFiles}</span>
            <button
              className="btn btn-primary"
              onClick={handleAddNumberOfFiles}
            >
              +
            </button>
          </div>
        </div>
      </div>
      <div className="d-flex flex-row align-items-center justify-content-center ms-2 mt-3">
        <span className="me-3 text_xl text_black">Display</span>
        <select
          className="round"
          value={selectedOpertaion}
          onChange={(e) => setSelectedOpertaion(Number(e.target.value))}
        >
          <option key={1} value={1}>
            Data
          </option>
          <option key={2} value={2}>
            Prediction
          </option>
        </select>
      </div>

      <button className="btn btn-primary mt-3" onClick={handleSubmit}>
        <span className="text_xl">Show</span>
      </button>
    </div>
  );
};

export default StockForm;
