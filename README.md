Nothing to see here. Random experiments

[resolver.js](resolver.js) explains what I'm trying to do here

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

