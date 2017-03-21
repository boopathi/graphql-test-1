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
