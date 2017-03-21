const runServer = require("./server");

// you do the same drill again,
// create a new type for holding enum value

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
type ServerStatus {
  enum: ServerStatusEnum
}
enum ServerStatusEnum {
  PENDING_ACTIVATION
  ACTIVATED
  PENDING_DELETION
  DELETED
}
`;

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
    enum(val) {
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
