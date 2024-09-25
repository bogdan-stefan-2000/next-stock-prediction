import Papa from "papaparse";
import path from "path";
import fs from "fs";

/*
  Endpoint: host/api/stocks
  Request body:
  {
    numberOfFiles: number
  };
*/
export const POST = async (request) => {
  try {
    let body = await request.json();

    // Read the folders
    const folderFiles = [];
    const filePath = path.join(process.cwd(), "stocks_data");
    const allContents = fs.readdirSync(filePath);

    // If no folders found show an alert in page
    if (allContents.length === 0) {
      throw new Error("No folders!");
    }

    // Find all csv files in all the folders found. It will create in array of lists( the list will look like this: [folderName , csvFile1, csvFile2, ...] )
    allContents.forEach((content) => {
      const contentPath = path.join(filePath, content);

      if (fs.statSync(contentPath).isDirectory()) {
        const files = fs.readdirSync(contentPath);
        folderFiles.push([content, ...files]);
      }
    });

    let allStocks = [];

    // Loop through the folders
    folderFiles.forEach((folder) => {
      // If the folder has fewer files than needed, it will process the files available
      let numberOfFilesToBeRead = body.numberOfFiles;
      if (numberOfFilesToBeRead > folder.length - 1) {
        numberOfFilesToBeRead = folder.length - 1;
      }
      // Loop through the csv files
      for (let index = 0; index < numberOfFilesToBeRead; index++) {
        const csvFile = folder[index + 1]; // The fist element in this array is the folder name so we need to skip it
        const filePath = path.join(
          process.cwd(),
          "stocks_data",
          folder[0],
          csvFile
        );
        const fileContents = fs.readFileSync(filePath, "utf8");

        // Get all data from the csv
        const parsedData = Papa.parse(fileContents, {
          header: false,
          dynamicTyping: true,
        });

        // Parse the data
        const stocks = parsedData.data.map((row) => ({
          stockId: row[0],
          timestamp: row[1],
          value: row[2],
        }));
        // Select 10 values from a random timpestamp
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
