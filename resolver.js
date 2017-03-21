module.exports = {
  Query: {
    users() {
      return ["a", "b", "c"];
    },
    foo() {
      return "a";
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
