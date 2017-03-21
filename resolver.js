/**
 * Backend API structure
 *
 * Actual scenario:
 *
 * /users    - returns a list of users with minimal info like id and name
 * /user/:id - returns the complete information of the user
 * /foo      - has a field owner that has the user id
 *
 */

module.exports = {
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
