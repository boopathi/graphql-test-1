const runServer = require("./server");

// and when you have an enum with special characters,
// we have the same problem again
const typeDefs = `
type Query {
  users: [User]
  foo: Foo
  bar: ServerStatus
}
type User {
  id: ID
  details: UserDetails
}
type UserDetails {
  name: String
  server: ServerStatus
}
type Foo {
  serverStatus: ServerStatus
  owner: User
}
enum ServerStatus {
  PENDING_ACTIVATION
  ACTIVATED
  PENDING_DELETION
  DELETED
}
`;

// and you want to resolve ServerStatus in 3 places, lets say,
// and want to take care of its resolution only once,

const resolvers = {
  Query: {
    users() {
      return ["a", "b", "c"].map(id => ({ id }));
    },
    foo() {
      return { owner: { id: "a" }, serverStatus: "🌕" };
    }
  },
  User: {
    details({ id }) {
      return {
        name: "Foo" + id,
        // the server responds with special characters
        server: "🌕-🌒"
      };
    }
  },
  ServerStatus: {
    __resolveType(val) {
      // this is not possible
      // this fn is never called

      switch (val) {
        case "🌘-🌕":
          return "PENDING_ACTIVATION";
        case "🌕":
          return "ACTIVATED";
        case "🌕-🌒":
          return "PENDING_DELETION";
        case "🌑":
          return "DELETED";
      }
    }
  }
};

runServer(typeDefs, resolvers);
