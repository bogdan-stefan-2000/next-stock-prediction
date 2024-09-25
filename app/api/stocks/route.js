import Papa from "papaparse";
import path from "path";
import fs from "fs";

export const POST = async (request) => {
  try {
    let body = await request.json();
    const folderFiles = [];
    const filePath = path.join(process.cwd(), "stocks_data");
    const allContents = fs.readdirSync(filePath);

    if (allContents.length === 0) {
      throw new Error("No folders!");
    }

    allContents.forEach((content) => {
      const contentPath = path.join(filePath, content);

      if (fs.statSync(contentPath).isDirectory()) {
        const files = fs.readdirSync(contentPath);
        folderFiles.push([content, ...files]);
      }
    });

    let allStocks = [];

    folderFiles.forEach((folder) => {
      let numberOfFilesToBeRead = body.numberOfFiles;
      if (numberOfFilesToBeRead > folder.length - 1) {
        numberOfFilesToBeRead = folder.length - 1;
      }
      for (let index = 0; index < numberOfFilesToBeRead; index++) {
        const csvFile = folder[index + 1];
        const filePath = path.join(
          process.cwd(),
          "stocks_data",
          folder[0],
          csvFile
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
    });

    return new Response(JSON.stringify(allStocks), { status: 200 });
  } catch (error) {
    return new Response(JSON.stringify({ message: error.message }), {
      status: 500,
    });
  }
};
