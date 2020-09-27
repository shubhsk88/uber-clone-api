const { default: Place } = require('../../../models/Place');
const { default: authResolvers } = require('../../../utils/authResolvers');

const resolvers = {
  Mutation: {
    addPlace: authResolvers(async (_, args, { req }) => {
      const { user } = req;
 

      try {
        const result = await Place.create({ ...args, userPrimary: user._id });
        user.places.push(result._id);
        user.save();
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
