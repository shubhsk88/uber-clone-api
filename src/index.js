import { GraphQLServer } from 'graphql-yoga';
import 'dotenv/config';
import schema from './schema';
import morgan from 'morgan';
import helmet from 'helmet';
import cors from 'cors';
import mongoose from 'mongoose';

mongoose.connect(process.env.MONGO_APP_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
const PORT = process.env.PORT || 3000;
const server = new GraphQLServer({ schema });
const options = {
  port: PORT,
  endpoint: '/graphql',

  playground: '/playground',
};

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));

server.express.use(morgan('dev'));
server.express.use(helmet());
server.express.use(cors());

db.once('open', function () {
  server.start(options, () =>
    console.log(`the app is listening to port ${PORT}`)
  ); // we're connected!
});
