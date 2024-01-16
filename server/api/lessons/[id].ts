import { createDirectory, getMockById } from "@/server/helper";

const folder = "server/mock/lessons/";

export default defineEventHandler(async (event) => {
  if (event.node.req.method === "GET") {
    const id = getRouterParam(event, "id");

	createDirectory(folder);
    const mockData = getMockById(id as string);

    return mockData;
  }
});

