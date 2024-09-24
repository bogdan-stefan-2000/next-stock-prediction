import path from "path";
import fs from "fs";

export const GET = async () => {
  try {
    const folderFiles = [];
    const filePath = path.join(process.cwd(), "stocks_data");
    const allContents = fs.readdirSync(filePath);

    allContents.forEach((content) => {
      const contentPath = path.join(filePath, content);

      if (fs.statSync(contentPath).isDirectory()) {
        const files = fs.readdirSync(contentPath);
        folderFiles.push([content, ...files]);
      }
    });

    return new Response(JSON.stringify(folderFiles), { status: 200 });
  } catch (error) {
    return new Response(error, { status: 500 });
  }
};
