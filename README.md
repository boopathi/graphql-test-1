Nothing to see here. Random experiments

+ [test-1](test-1.js) - __resolveType is not called
+ [test-2](test-2.js) - add a new type to solve that since only fields can be resolved
+ [test-3](test-3.js) - enums cannot be resolved by using type names
+ [test-4](test-4.js) - add another type to solve that

```gql
query {
  users {
    ...user
  }
  foo {
    owner {
      ...user
    }
  }
}
fragment user on User {
  name
  id
}
```

Backend API structure

Actual scenario:

+ `/users`    - returns a list of users with minimal info like id and name
+ `/user/:id` - returns the complete information of the user
+ `/foo`      - has a field owner that has the user id
