const graphql = require("graphql")

const { GraphQLObjectType, GraphQLID, GraphQLString, GraphQLInt, GraphQLFloat, GraphQLList, GraphQLSchema } = graphql

const Products = require('./models/product');
const Categories = require('./models/category')

const products = [
	{ id: "1", "name": "Milk", "description": "Milk (regular), (0.25 liter)", "price": 0.22, "quantity": 15, "categoryId": "61d9e9d533baf00baedf3640" },
	{ id: "2", "name": "Loaf of Fresh White Bread (125.00 g)", "description": "White Bread", "price": 0.69, "quantity": 40, "categoryId": "61d9ead333baf00baedf3641" },
  { id: "3", "name": "Rice", "description": "Rice (white), (0.10 kg)", "price": 4.00, "quantity": 30, "categoryId": "61d9eaf933baf00baedf3642" },
  { id: "4", "name": "Eggs", "description": "Eggs (grade A, large) (dozen)", "price": 1.48, "quantity": 8, "categoryId": "61d9eb2933baf00baedf3643" },
  { id: "5", "name": "Cheese", "description": "Local Cheese (0.10 kg)", "price": 1.11, "quantity": 20, "categoryId": "61d9e9d533baf00baedf3640" },
  { id: "6", "name": "Chicken", "description": "Chicken Fillets (0.15 kg)", "price": 1.40, "quantity": 30, "categoryId": "61d9eb5833baf00baedf3644" },
  { id: "7", "name": "Beef Round", "description": "Beef Round (0.15 kg)", "price": 1.94, "quantity": 20, "categoryId": "61d9eb5833baf00baedf3644" },
  { id: "8", "name": "Apples", "description": "Apples (1.0 kg)", "price": 4.57, "quantity": 30, "categoryId": "61d9eb7e33baf00baedf3645" },
  { id: "9", "name": "Banana", "description": "Banana (1.0 kg)", "price": 1.56, "quantity": 15, "categoryId": "61d9eb7e33baf00baedf3645" },
  { id: "10", "name": "Oranges", "description": "Oranges (1.0 kg)", "price": 4.00, "quantity": 25, "categoryId": "61d9eb7e33baf00baedf3645" },
  { id: "11", "name": "Tomato", "description": "Tomato (1.0 kg)", "price": 4.30, "quantity": 10, "categoryId": "61d9eb9d33baf00baedf3646" },
  { id: "12", "name": "Potato", "description": "Potato (1.0 kg)", "price": 2.60, "quantity": 15, "categoryId": "61d9eb9d33baf00baedf3646" },
  { id: "13", "name": "Onion", "description": "Onion (1.0 kg)", "price": 2.60, "quantity": 10, "categoryId": "61d9eb9d33baf00baedf3646" },
  { id: "14", "name": "Lettuce", "description": "Lettuce (1 head)", "price": 1.65, "quantity": 10, "categoryId": "61d9eb9d33baf00baedf3646" }
]

const categories = [
	{ id: "1", "name": "Dairy" }, // 61d9e9d533baf00baedf3640
	{ id: "2", "name": "Bakery" }, // 61d9ead333baf00baedf3641
  { id: "3", "name": "Cereals" }, // 61d9eaf933baf00baedf3642
  { id: "4", "name": "Eggs" }, // 61d9eb2933baf00baedf3643
  { id: "5", "name": "Meat" }, // 61d9eb5833baf00baedf3644
  { id: "6", "name": "Fruits" }, // 61d9eb7e33baf00baedf3645
  { id: "7", "name": "Vegetables" } // 61d9eb9d33baf00baedf3646
]

const ProductType = new GraphQLObjectType({
  "name": "Product",
  fields: () => ({
    id: { type: GraphQLID },
    "name": { type: GraphQLString },
    "description": { type: GraphQLString },
    "price": { type: GraphQLFloat },
    "quantity": { type: GraphQLInt },
    category: {
      type: CategoryType,
      resolve(parent, args) {
				return Categories.findById(parent.categoryId)
			}
    }
  }),
})

const CategoryType = new GraphQLObjectType({
  "name": "Category",
  fields: () => ({
    id: { type: GraphQLID },
    "name": { type: GraphQLString },
    products: {
			type: new GraphQLList(ProductType),
			resolve(parent, args) {
				return Products.find({ categoryId: parent.id })
			},
		},
  }),
})

const Query = new GraphQLObjectType({
  "name": "Query",
  fields: {
    product: {
      type: ProductType,
      args: { id: { type: GraphQLID } },
      resolve(parent, args) {
        return Products.findById(args.id)
      },
    },
    category: {
      type: CategoryType,
      args: { id: { type: GraphQLID } },
      resolve(parent, args) {
        return Categories.findById(args.id)
      },
    },
    products: {
			type: new GraphQLList(ProductType),
			resolve(parent, args) {
				return Products.find({})
			}
		},
		categories: {
			type: new GraphQLList(CategoryType),
			resolve(parent, args) {
				return Categories.find({})
			}
		}
  }
})

module.exports = new GraphQLSchema({
  query: Query,
})