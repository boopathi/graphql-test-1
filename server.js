const express = require("express");
const fs = require("fs");
const path = require("path");
const bodyParser = require("body-parser");
const { graphqlExpress, graphiqlExpress } = require("graphql-server-express");

const { makeExecutableSchema } = require("graphql-tools");

const app = express();

const typeDefs = fs
  .readFileSync(path.join(__dirname, "schema.gql"), "utf-8")
  .toString();

const resolvers = require("./resolver");

const schema = makeExecutableSchema({
  typeDefs,
  resolvers
});

app.use("/graphql", bodyParser.json(), graphqlExpress({ schema }));
app.use("/graphiql", graphiqlExpress({ endpointURL: "/graphql" }));

app.listen(8080, () => console.log("Graphql Server listening on port 8080"));
