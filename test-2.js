const runServer = require("./server");

// so solve problem in test-1, one way to solve it
// is to include an extra type
const typeDefs = `
type Query {
  users: [User]
  foo: Foo
}
type User {
  id: ID
  details: UserDetails
}
type UserDetails {
  name: String
}
type Foo {
  owner: User
}
`;

const resolvers = {
  Query: {
    users() {
      return ["a", "b", "c"].map(id => ({ id }));
    },
    foo() {
      return { owner: { id: "a" } };
    }
  },
  User: {
    details({ id }) {
      return {
        name: "Foo" + id
      };
    }
  }
};

runServer(typeDefs, resolvers);
