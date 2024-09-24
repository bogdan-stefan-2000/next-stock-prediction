import Papa from "papaparse";
import path from "path";
import fs from "fs";

export const POST = async (request) => {
  try {
    let body = await request.json();
    let allStocks = [];
    let length = body.numberOfFiles;
    if (length > body.csvFiles.length) {
      length = body.csvFiles.length;
    }

    for (let index = 0; index < length; index++) {
      const element = body.csvFiles[index];
      const filePath = path.join(
        process.cwd(),
        "stocks_data",
        body.dir,
        element
      );
      const fileContents = fs.readFileSync(filePath, "utf8");

      const parsedData = Papa.parse(fileContents, {
        header: false,
        dynamicTyping: true,
      });

      const stocks = parsedData.data.map((row) => ({
        stockId: row[0],
        timestamp: row[1],
        value: row[2],
      }));
      const maxStartIndex = stocks.length - 10;
      const startIndex = Math.floor(Math.random() * (maxStartIndex + 1));

      const selectedElements = stocks.slice(startIndex, startIndex + 10);
      allStocks.push(selectedElements);
    }

    return new Response(JSON.stringify(allStocks), { status: 200 });
  } catch (error) {
    return new Response(error, { status: 500 });
  }
};
