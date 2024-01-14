import * as fs from "node:fs";

const getMockFilesContent = () => {
  const mockFiles = fs.readdirSync("server/mock");
  const mockData = [];

  for (const fileName of mockFiles) {
    const filePath = `server/mock/${fileName}`;
    const fileContent = fs.readFileSync(filePath, "utf-8");
    mockData.push(JSON.parse(fileContent));
  }

  return mockData;
};

export default defineEventHandler(async (event) => {
  if (event.node.req.method === "GET") {
    const mockData = getMockFilesContent();
    return mockData;
  }
  if (event.node.req.method === "POST") {
    const body = await readBody(event);

    const requestId = Date.now().toString();
    body.id = requestId;
    const fileName = `mock_${requestId}.json`;
    fs.writeFileSync(`server/mock/${fileName}`, JSON.stringify(body));

    return requestId;
  }
});
