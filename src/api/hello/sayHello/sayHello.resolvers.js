import Kitten from '../../../models/Kitty';

const resolvers = {
  Query: {
    hello: () => 'Hello World',
  },
  Mutation: {
    createCat: async (_, { name }) => {
      const cat = new Kitten({ name });
      await cat.save();
      console.log(cat.name);
      return cat;
    },
  },
};

export default resolvers;
