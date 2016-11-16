var mongoose = require('mongoose');
var graphql = require('graphql');
var GraphQLObjectType = graphql.GraphQLObjectType;
var GraphQLBoolean = graphql.GraphQLBoolean;
var GraphQLID = graphql.GraphQLID;
var GraphQLString = graphql.GraphQLString;
var GraphQLList = graphql.GraphQLList;
var GraphQLNonNull = graphql.GraphQLNonNull;
var GraphQLSchema = graphql.GraphQLSchema;

// MongoDB URI: mongodb://user:pass@host:port/db
var dbConfig = {
  "USER": "admin",
  "PASS": "80fACy3wvi",
  "HOST": "52.52.197.9",
  "PORT": "27017",
  "DATABASE": "main"
};
var dbPath = "mongodb://" +
  dbConfig.USER + ":" +
  dbConfig.PASS + "@" +
  dbConfig.HOST + ":" +
  dbConfig.PORT + "/" +
  dbConfig.DATABASE;

mongoose.connect(dbPath, function(error) {
  if (error) console.error(error);
  else console.log('MongoDB connected');
});

// Mongoose Schema definition
var COMMENT = mongoose.model('Todo', {
  id: mongoose.Schema.Types.ObjectId,
  author: String,
  text: String
});

var CommentType = new GraphQLObjectType({
  name: 'comment',
  fields: () => ({
    id: {
      type: GraphQLID,
      description: 'Comment id'
    },
    author: {
      type: GraphQLString,
      description: 'Comment author'
    },
    text: {
      type: GraphQLString,
      description: 'Comment text'
    }
  })
});

var promiseListAll = () => {
  return new Promise((resolve, reject) => {
    COMMENT.find((err, comments) => {
      if (err) reject(err);
      else resolve(comments);
    });
  });
}

var QueryType = new GraphQLObjectType({
  name: 'Query',
  fields: () => ({
    comments: {
      type: new GraphQLList(CommentType),
      resolve: () => {
        return promiseListAll()
      }
    }
  })
});

var MutationAdd = {
  type: CommentType,
  description: 'Add a comment',
  args: {
    author: {
      name: 'Comment author',
      type: new GraphQLNonNull(GraphQLString)
    },
    text: {
      name: 'Comment text',
      type: new GraphQLNonNull(GraphQLString)
    },
  },
  resolve: (root, args) => {
    var newComment = new COMMENT({
      author: args.author,
      text: args.text
    });
    newComment.id = newComment._id
    return new Promise((resolve, reject) => {
      newComment.save(function(err) {
        if (err) reject(err);
        else resolve(newComment);
      });
    });
  }
}

var MutationType = new GraphQLObjectType({
  name: 'Mutation',
  fields: {
    add: MutationAdd
  }
});

module.exports = new GraphQLSchema({
  query: QueryType,
  mutation: MutationType
});
