import * as fs from "node:fs";
import { createDirectory } from "@/server/helper";

const folder = "server/mock/users/";

export default defineEventHandler(async (event) => {
  if (event.node.req.method === "POST") {
    const body = await readBody(event);
    
    const fileName = `mock_${body.email}.json`;

    const filePath = `${folder}/${fileName}`;

    if (fs.existsSync(filePath)) {
      const fileContent = fs.readFileSync(filePath, "utf-8");
      const userInfo = JSON.parse(fileContent);
      if(userInfo.password == body.password) {
        delete userInfo.password;
        delete userInfo.studentFile;
        delete userInfo.pharmacistFile1;
        delete userInfo.pharmacistFile2;
        return userInfo;
      }
    }
    return false;
  }
});
