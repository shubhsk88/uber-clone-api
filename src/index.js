import { GraphQLServer, PubSub } from 'graphql-yoga';
import 'dotenv/config';
import schema from './schema';
import morgan from 'morgan';
import helmet from 'helmet';
import cors from 'cors';
import mongoose from 'mongoose';
import decodeJWT from './utils/decodeJWT';

mongoose.connect(process.env.MONGO_APP_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
const PORT = process.env.PORT || 5000;

const pubSub = new PubSub();
pubSub.ee.setMaxListeners(99);
const server = new GraphQLServer({
  schema,
  context: (req) => {
    return { req: req.request, pubSub };
  },
});

const options = {
  port: PORT,
  endpoint: '/graphql',

  playground: '/playground',
};

const jwtmiddleware = async (req, res, next) => {
  const token = req.get('X-JWT');

  if (token) {
    const user = await decodeJWT(token);
    if (user) {
      req.user = user;
    } else req.user = undefined;
  }
  next();
};

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));

server.express.use(morgan('dev'));
server.express.use(helmet());
server.express.use(cors());
server.express.use(jwtmiddleware);

db.once('open', function () {
  server.start(options, () =>
    console.log(`the app is listening to port ${PORT}`)
  ); // we're connected!
});
