import * as fs from "node:fs";
import { createDirectory, clearHTMLAndCut } from "@/server/helper";

const folder = "server/mock/users/";

const getMockList = (query: any) => {
  const mockFiles = fs.readdirSync(folder);
  const mockData = [];

  for (const fileName of mockFiles) {
    const filePath = `${folder}/${fileName}`;
    const fileContent = fs.readFileSync(filePath, "utf-8");
    const userInfo = JSON.parse(fileContent);

    if (userInfo.role != 1) {
      mockData.push(userInfo);
    }
  }

  return mockData;
};

export default defineEventHandler(async (event) => {
  if (event.node.req.method === "GET") {
    const query = getQuery(event);
    createDirectory(folder);
    const mockData = getMockList(query);
    return mockData;
  }
});
