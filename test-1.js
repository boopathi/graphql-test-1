const runServer = require("./server");

const typeDefs = `
type Query {
  users: [User]
  foo: Foo
}
type User {
  id: ID
  name: String
}
type Foo {
  owner: User
}
`;

const resolvers = {
  Query: {
    users() {
      return ["a", "b", "c"];
    },
    foo() {
      return { owner: "a" };
    }
  },
  User: {
    __resolveType(id) {
      // This fn is never called when User is a Type,
      // and will be called only when Interface or Union

      // fetch from somewhere else
      // based on user ID and return the result
      return {
        id,
        name: "Foo" + id
      };
    }
  }
};

runServer(typeDefs, resolvers);
