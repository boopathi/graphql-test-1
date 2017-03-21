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


[![Greenkeeper badge](https://badges.greenkeeper.io/boopathi/graphql-test-1.svg)](https://greenkeeper.io/)