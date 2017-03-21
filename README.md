Nothing to see here. Random experiments


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
