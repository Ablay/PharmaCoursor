import * as fs from "node:fs";

const folder = "server/mock/lessons/";

const getMockList = (query: any) => {
  const mockFiles = fs.readdirSync(folder).reverse();
  const mockData = [];
  let limitCounter = 0;

  for (const fileName of mockFiles) {
    const filePath = `${folder}/${fileName}`;
    const fileContent = fs.readFileSync(filePath, "utf-8");
    const { id, title, content, date } = JSON.parse(fileContent);

    if (query.search && query.search.trim() !== "") {
      if (
        title.toLowerCase().includes(query.search.toLowerCase()) ||
        content.toLowerCase().includes(query.search.toLowerCase())
      ) {
        mockData.push({ id, title, content: clearHTMLAndCut(content, 150), date });
      }
    } else {
      mockData.push({ id, title, content: clearHTMLAndCut(content, 150), date });
    }
    limitCounter++;
    if (query.limit && limitCounter >= query.limit) {
      break;
    }
  }

  return mockData;
};

const clearHTMLAndCut = (str: string, length: number) => {
  return str.replace(/<[^>]*>/g, " ").replace(/&nbsp;/g, ' ').substring(0, 150);
};

export default defineEventHandler(async (event) => {
  if (event.node.req.method === "GET") {
    const query = getQuery(event);

    const mockData = getMockList(query);
    return mockData;
  }
  else if (event.node.req.method === "POST") {
    const body = await readBody(event);
    body["date"] = new Date().toLocaleDateString("en-GB").split("/").join(".");
    const requestId = Date.now().toString();
    body.id = requestId;
    const fileName = `mock_${requestId}.json`;
    fs.writeFileSync(`${folder}/${fileName}`, JSON.stringify(body));

    return true;
  }
});
