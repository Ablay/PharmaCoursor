import * as fs from "node:fs";

const folder = "server/mock/acts/";

const getMockById = (id: string) => {
	const filePath = `${folder}/mock_${id}.json`;
  
	try {
	  fs.accessSync(filePath, fs.constants.R_OK);
  
	  const fileContent = fs.readFileSync(filePath, "utf-8");
	  const data = JSON.parse(fileContent);
  
	  return data;
	} catch (error) {
	  return null;
	}
  };

export default defineEventHandler(async (event) => {
  if (event.node.req.method === "GET") {
    const id = getRouterParam(event, "id");

    const mockData = getMockById(id as string);

    return mockData;
  }
});
