# GraphQL Server
[![Build Status](http://54.67.109.20:8080/buildStatus/icon?job=graphql-server)](http://54.67.109.20:8080/job/graphql-server/)

This is a GraphQL server endpoint to fetch and update data from/to Mongo database.

## Current Access IP
`http://54.183.27.114:8080`

## Jenkins
Using Jenkins to automatically deploy to EC2 instance (indiv-database node)<br>
To view <b>Jenkins build status</b>, see badge on top of this README.md

## API

### GraphQL Schema
```graphql
{
  comments {
    id,
    author,
    text
  }
}
```

### Query
<b>URL:</b> `http://54.183.27.114:8080/?query=[query_context]`<br>
<b>Ex:</b> To query id and author of all comment, query_context should be:
```graphql
{
  comments {
    id,
    author
  }
}
```
So, you can fetch data via this URL: `http://54.183.27.114:8080/?query={comments{id,author}}`<br>
<b>Note that response for any query is in JSON type</b>

### Mutation
All available provided mutation is listed here
```graphql
add(author: String!, text: String!): comment
```
