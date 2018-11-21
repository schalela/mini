const express = require('express')
const next = require('next')
const { ApolloServer, gql } = require('apollo-server-express')

const dev = process.env.NODE_ENV !== 'production'
const nextApp = next({ dir: './frontend', dev })
const handle = nextApp.getRequestHandler()

const ProfilesAPI = require('./services/profiles')

const typeDefs = gql`
  type Query {
    profiles: [String]
  }
`

const resolvers = {
  Query: {
    profiles: async (_source, { id }, { dataSources }) => {
      return dataSources.profilesAPI.getProfiles()
    }
  }
}

nextApp.prepare()
  .then(() => {
    const app = express()
    const server = new ApolloServer({
      typeDefs,
      resolvers,
      dataSources: () => {
        return {
          profilesAPI: new ProfilesAPI()
        }
      },
      context: () => {
        return {
          token: 'token2'
        }
      }
    })

    app.get('*', (req, res) => {
      return handle(req, res)
    })

    server.applyMiddleware({ app })

    app.listen(3000, (err) => {
      if (err) throw err
      console.log('> Ready on http://localhost:3000')
    })
  })
  .catch((ex) => {
    console.error(ex.stack)
    process.exit(1)
  })
