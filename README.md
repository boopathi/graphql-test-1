Nothing to see here. Random experiments

This is an experiment to understand how to solve a particular use case in graphql and where the query bloats from -

```gql
query actual {
  users { # list
    status # enum
  }
}
```

to

```gql
query bloat {
  users {
    details {
      status {
        enum
      }
    }
  }
}
```

in order to maintain the handling of a particular type at ONLY One place in the resolvers and not have to worry about handling that particular type when a new addition in the schema returns the same type.

+ [test-1](test-1.js) - __resolveType is not called
+ [test-2](test-2.js) - add a new type to solve that since only fields can be resolved
+ [test-3](test-3.js) - enums cannot be resolved by using type names
+ [test-4](test-4.js) - add another type to solve that

Backend API structure

Actual scenario:

+ `/users`    - returns a list of users with minimal info like id and name
+ `/user/:id` - returns the complete information of the user
+ `/foo`      - has a field owner that has the user id
