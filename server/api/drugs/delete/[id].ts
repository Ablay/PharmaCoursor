import * as fs from "node:fs";

const folder = "server/mock/drugs/";

const deleteFileById = (id: string) => {
  const filePath = `${folder}/mock_${id}.json`;

  try {
    fs.unlinkSync(filePath);
  } catch (error) {
    return null;
  }
};

export default defineEventHandler(async (event) => {
  if (event.node.req.method === "DELETE") {
    const id = getRouterParam(event, "id");

    deleteFileById(id as string);

    return true;
  }
});
