import Cors from "micro-cors";
import { typeDefs } from "@/server/schema";
import { resolvers } from "@/server/resolvers";
import { ApolloServer } from "apollo-server-micro";
import { PageConfig } from "next";
import { createContext } from "@/server/context";

export const config: PageConfig = {
  api: {
    bodyParser: false,
  },
};

const cors = Cors();

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: createContext,
  persistedQueries: {
    ttl: 900, // 15 minutes
  },
});

const startServer = server.start();

export default cors(async (req, res) => {
  if (req.method === "OPTIONS") {
    res.end();
    return false;
  }
  await startServer;
  await server.createHandler({ path: "/api/graphql" })(req, res);
});
