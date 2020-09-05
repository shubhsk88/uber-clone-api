import express from 'express';
import { ApolloServer } from 'apollo-server-express';
import schema from './schema';
import morgan from 'morgan';
import helmet from 'helmet';
import cors from 'cors';
const app = express();

const server = new ApolloServer({ schema, playground: true });

server.applyMiddleware({ app, path: '/api/graphql' });

app.use(cors());
app.use(morgan('dev'));
app.use(helmet());

app.listen(3000, () => console.log('THe app is listening to port'));
