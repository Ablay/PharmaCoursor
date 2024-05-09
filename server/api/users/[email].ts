import { createDirectory, getMockById } from "@/server/helper";
import * as fs from "node:fs";

const folder = "server/mock/users/";

export default defineEventHandler(async (event) => {
  if (event.node.req.method === "POST") {
    const email = getRouterParam(event, "email");

    createDirectory(folder);
    const mockData = getMockById(folder, email);

    const body = await readBody(event);
    
    mockData.status = body.status;
    
    const fileName = `mock_${email}.json`;
    
    fs.writeFileSync(`${folder}/${fileName}`, JSON.stringify(mockData));

    return true;
  }
});

