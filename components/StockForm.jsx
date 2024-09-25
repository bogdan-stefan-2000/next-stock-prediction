"use client";
import React, { useEffect } from "react";
import { useState } from "react";

const StockForm = ({ files, onSubmit }) => {
  const [numberOfFiles, setNumberOfFiles] = useState(1);

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
    let req = {
      numberOfFiles: numberOfFiles,
    };
    onSubmit(req);
  }

  return (
    <div className="d-flex flex-column align-items-center justify-content-center mt-4">
      <div className="flex-center d-flex flex-row">
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

      <button className="btn btn-primary mt-3" onClick={handleSubmit}>
        <span className="text_xl">Show Prediction</span>
      </button>
    </div>
  );
};

export default StockForm;
