import path from 'path';
import {
  loadFilesSync,
  mergeTypeDefs,
  mergeResolvers,
  makeExecutableSchema,
} from 'graphql-tools';

const allTypes = loadFilesSync(path.join(__dirname, './api/**/*.graphql'));
const allResolvers = loadFilesSync(
  path.join(__dirname, './api/**/*.resolvers.*')
);

const mergedTypes = mergeTypeDefs(allTypes);
const mergedResolvers = mergeResolvers(allResolvers);

const schema = makeExecutableSchema({
  typeDefs: mergedTypes,
  resolvers: mergedResolvers,
});

export default schema;
