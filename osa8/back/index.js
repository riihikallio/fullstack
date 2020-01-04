const { ApolloServer, UserInputError, AuthenticationError, gql } = require('apollo-server')
const mongoose = require('mongoose')
//const uuid = require('uuid/v1')
require('dotenv').config()
const jwt = require('jsonwebtoken')
const JWT_SECRET = 'NEED_HERE_A_SECRET_KEY'
const Author = require('./models/author')
const Book = require('./models/book')
const User = require('./models/user')

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
  type User {
    username: String!
    favoriteGenre: String!
    id: ID!
  }
  type Token {
    value: String!
  }
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
    me: User
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
    createUser(
      username: String!
      favoriteGenre: String!
    ): User
    login(
      username: String!
      password: String!
    ): Token
  }
`

const addBook = async (root, args, context) => {
  if (!context.user) {
    throw new AuthenticationError('Not logged in')
  }
  let author = await Author.findOne({ name: args.author })
  if (!author) {
    author = await new Author({ name: args.author }).save()
      .catch(error => {
        throw new UserInputError(error.message, {
          invalidArgs: args,
        })
      })
  }
  let book = new Book({ ...args, author: author })
  book = await book.save()
    .catch(error => {
      throw new UserInputError(error.message, {
        invalidArgs: args,
      })
    })
  author.books = [...author.books, book.id]
  author = await author.save()
    .catch(error => {
      throw new UserInputError(error.message, {
        invalidArgs: args,
      })
    })
  return book
}

// books.forEach(b => addBook(0, b));

const editAuthor = async (root, args, context) => {
  if (!context.user) {
    throw new AuthenticationError('Not logged in')
  }
  let author = await Author.findOne({ name: args.name })
  if (!author) {
    return null
  }
  author.born = args.setBornTo
  return author.save()
    .catch(error => {
      throw new UserInputError(error.message, {
        invalidArgs: args,
      })
    })
}

const createUser = (root, args) => {
  const user = new User({ username: args.username })
  return user.save()
    .catch(error => {
      throw new UserInputError(error.message, {
        invalidArgs: args,
      })
    })
}

//createUser(0, { username: "petri" })

const login = async (root, args) => {
  const user = await User.findOne({ username: args.username })
  if (!user || args.password !== 'secret') {
    throw new UserInputError("wrong credentials")
  }
  const userForToken = {
    username: user.username,
    id: user._id,
  }
  return { value: jwt.sign(userForToken, JWT_SECRET) }
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
    me: (root, args, context) => context.currentUser,
  },
  Author: {
    bookCount: (root) => {
      return root.books.length
    }
  },
  Mutation: {
    addBook: addBook,
    editAuthor: editAuthor,
    createUser: createUser,
    login: login,
  }
}

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: async ({ req }) => {
    const auth = req ? req.headers.authorization : null
    if (auth && auth.toLowerCase().startsWith('bearer ')) {
      const decodedToken = jwt.verify(
        auth.substring(7), JWT_SECRET
      )
      const currentUser = await User.findById(decodedToken.id)
      return { currentUser }
    }
  }
})

server.listen().then(({ url }) => {
  console.log(`Server ready at ${url}`)
})