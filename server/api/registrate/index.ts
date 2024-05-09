import * as fs from "node:fs";
import { createDirectory } from "@/server/helper";

const folder = "server/mock/users/";

export default defineEventHandler(async (event) => {
  if (event.node.req.method === "POST") {
    const body = await readBody(event);
    body["date"] = new Date().toLocaleDateString("en-GB").split("/").join(".");
    body["status"] = 4; // 4 waiting, 3, rejected, 2 banned, 1 approved
    const fileName = `mock_${body.email}.json`;
    createDirectory(folder);
    const filePath = `${folder}/${fileName}`;

    if (fs.existsSync(filePath)) {
      return false;
    }
    
    fs.writeFileSync(filePath, JSON.stringify(body));

    return true;
  }
});
