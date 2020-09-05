import { GraphQLServer } from 'graphql-yoga';
import schema from './schema';
import morgan from 'morgan';
import helmet from 'helmet';
import cors from 'cors';

const PORT = process.env.PORT || 3000;
const server = new GraphQLServer({ schema });
const options = {
  port: PORT,
  endpoint: '/graphql',

  playground: '/playground',
};

server.express.use(morgan('dev'));
server.express.use(helmet());
server.express.use(cors());

server.start(options, () =>
  console.log(`the app is listening to port ${PORT}`)
);
