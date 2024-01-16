import { createDirectory, deleteFileById } from "@/server/helper";

const folder = "server/mock/acts/";

export default defineEventHandler(async (event) => {
  if (event.node.req.method === "DELETE") {
    const id = getRouterParam(event, "id");
    createDirectory(folder);
    deleteFileById(folder, id);

    return true;
  }
});
