var express = require('express');
var Schema = require('./schema');
var graphQLHTTP = require('express-graphql');

var app = express();
var port = process.env.PORT || 8080;

app.use('/', graphQLHTTP({
  schema: Schema,
  pretty: true,
  graphiql: true
}));

app.listen(port, (err) => {
  if (err) {
    console.error(err);
    return;
  }
  console.log(`GraphQL Server is now running on localhost:${process.env.PORT || 8080}`);
});
