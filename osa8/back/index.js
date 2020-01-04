const { ApolloServer, gql } = require('apollo-server')
const mongoose = require('mongoose')
//const uuid = require('uuid/v1')
require('dotenv').config()
const Author = require('./models/author')
const Book = require('./models/book')

mongoose.set('useFindAndModify', false)
console.log('connecting to', process.env.MONGODB_URI)
mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true })
  .then(() => {
    console.log('connected to MongoDB')
  })
  .catch((error) => {
    console.log('error connection to MongoDB:', error.message)
  })

const typeDefs = gql`
  type Author {
    name: String!
    born: Int
    id: ID!
    bookCount: Int
  }
  type Book {
    title: String!
    published: Int
    author: Author!
    id: ID!
    genres: [String!]
  }
  type Query {
    bookCount: Int!
    authorCount: Int!
    allBooks(author: String, genre: String): [Book]
    allAuthors: [Author]
  }
  type Mutation {
    addBook(
      title: String!
      author: String!
      published: Int
      genres: [String!]
    ): Book,
    editAuthor(
      name: String!
      setBornTo: Int!
    ): Author
  }
`

const addBook = async (root, args) => {
  let author = await Author.findOne({ name: args.author })
  if (!author) {
    try {
      author = await new Author({ name: args.author }).save()
    } catch (error) {
      throw new UserInputError(error.message, {
        invalidArgs: args,
      })
    }
  }
  let book = new Book({ ...args, author: author })
  try {
    book = await book.save()
  } catch (error) {
    throw new UserInputError(error.message, {
      invalidArgs: args,
    })
  }
  author.books = [...author.books, book.id]
  try {
    author = await author.save()
  } catch (error) {
    throw new UserInputError(error.message, {
      invalidArgs: args,
    })
  }
  return book
}

// books.forEach(b => addBook(0, b));

const editAuthor = async (root, args) => {
  let author = await Author.findOne({ name: args.name })
  if (!author) {
    return null
  }
  author.born = args.setBornTo
  try {
    return await author.save()
  } catch (error) {
    throw new UserInputError(error.message, {
      invalidArgs: args,
    })
  }
}

const resolvers = {
  Query: {
    bookCount: () => Book.collection.countDocuments(),
    authorCount: () => Author.collection.countDocuments(),
    allBooks: (root, args) => {
      let filter = {}
      if (args.author) { filter = { 'author.name': args.author } } // Ei toimi näin
      if (args.genre) { filter = { ...filter, genres: args.genre } }
      return Book.find(filter).populate('author')
    },
    allAuthors: () => Author.find({}).populate('books'),
  },
  Author: {
    bookCount: (root) => {
      return root.books.length
    }
  },
  Mutation: {
    addBook: addBook,
    editAuthor: editAuthor
  }
}

const server = new ApolloServer({
  typeDefs,
  resolvers,
})

server.listen().then(({ url }) => {
  console.log(`Server ready at ${url}`)
})