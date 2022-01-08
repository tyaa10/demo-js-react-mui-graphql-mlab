const graphql = require('graphql')

const { GraphQLObjectType, GraphQLString, GraphQLInt, GraphQLFloat, GraphQLSchema } = graphql

const ProductType = new GraphQLObjectType({
  name: 'Product',
  fields: () => ({
    id: { type: GraphQLString },
    name: { type: GraphQLString },
    description: { type: GraphQLString },
    price: { type: GraphQLFloat },
    quantity: { type: GraphQLInt },
  }),
})

const Query = new GraphQLObjectType({
  name: 'Query',
  fields: {
    movie: {
      type: ProductType,
      args: { id: { type: GraphQLString } },
      resolve(parent, args) {

      },
    },
  }
})

module.exports = new GraphQLSchema({
  query: Query,
})