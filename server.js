const express = require("express");
const bodyParser = require("body-parser");
const { graphqlExpress, graphiqlExpress } = require("graphql-server-express");

const { makeExecutableSchema } = require("graphql-tools");

const app = express();

module.exports = function runServer(typeDefs, resolvers) {
  const schema = makeExecutableSchema({
    typeDefs,
    resolvers
  });

  app.use("/graphql", bodyParser.json(), graphqlExpress({ schema }));
  app.use("/graphiql", graphiqlExpress({ endpointURL: "/graphql" }));

  app.listen(8080, () => console.log("Graphql Server listening on port 8080"));
};
