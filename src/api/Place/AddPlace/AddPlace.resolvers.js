const { default: Place } = require('../../../models/Place');
const { default: authResolvers } = require('../../../utils/authResolvers');

const resolvers = {
  Mutation: {
    addPlace: authResolvers(async (_, args, { req }) => {
      const { user } = req;

      try {
        await Place.create({ ...args, user });
        return { ok: true, error: null };
      } catch (error) {
        return {
          ok: false,
          error: error.message,
        };
      }
    }),
  },
};

export default resolvers;
