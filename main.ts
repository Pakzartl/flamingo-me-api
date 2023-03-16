import express, { urlencoded } from 'express';
import User from './src/controllers/user';
import * as MysqlConnector from './src/services/mysql-connector';
import cors from 'cors';
import compression from 'compression';
import { ApolloServer, gql } from 'apollo-server-express';
import Schemas from './src/graphql/Schema';
import Resolvers from './src/graphql/Resolver';
import { ApolloServerPluginLandingPageGraphQLPlayground } from '@apollo/server-plugin-landing-page-graphql-playground';
import { json } from 'body-parser';
import { expressMiddleware } from '@apollo/server/express4';


require('dotenv').config({ path: `.env.${process.env.NODE_ENV}` })

const typeDefs = Schemas
const resolvers = Resolvers

const app = express();
app.use(compression());
app.use(express.json());
app.use(urlencoded({ extended: true }));
app.use(cors())

interface Context {
  token?: string;
}

MysqlConnector.init();

const server = new ApolloServer<Context>({ 
  typeDefs, 
  resolvers,
});

server.start().then(self => {
  server.applyMiddleware({ app });
})

// app.use('/graphql', cors<cors.CorsRequest>(), json(), expressMiddleware(server));

app.listen(process.env.PORT, async () => {
  
  console.log(`Server is running on port ${process.env.PORT}`);
  console.log(`Environment: ${process.env.NODE_ENV}`);
  console.log(`Graphql: http://localhost:${process.env.PORT}${server.graphqlPath}`);
  
});