const runServer = require("./server");

const typeDefs = `
type Query {
  users: [User]
  foo: Foo
  bar: ServerStatus
}
type User {
  id: ID
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

// look how we have to remember to handle the same type
// over and over again whereever it is used

// now my logic of how to handle ServerStatus moved
// FROM resolvers TO fetchers (from another API or DB)
// and I have to remember to add this resolving logic of ServerStatus
// and User details to all new APIs that return the same type

const resolvers = {
  Query: {
    users() {
      return getUsers();
    },
    foo() {
      return { owner: getUserInfo("a"), serverStatus: getServerStatus("🌕") };
    },
    bar() {
      return getServerStatus("🌑");
    }
  }
};

function getUsers() {
  return ["a", "b", "c"].map(u => getUserInfo(u));
}

function getUserInfo(id) {
  return {
    id,
    name: "Foo" + id,
    server: getServerStatus("🌕-🌒")
  };
}

function getServerStatus(val) {
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

runServer(typeDefs, resolvers);
