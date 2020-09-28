const { default: authResolvers } = require('../../../utils/authResolvers');

const resolvers = {
  Mutation: {
    requestRide: authResolvers(async (_, args, { req }) => {
      const { user } = req;
      try {
        const ride = await Ride.create({ ...args, passenger: user });
        return {
          ok: true,
          error: null,
          ride,
        };
      } catch (error) {
        return {
          ok: false,
          error: error.message,
          ride: null,
        };
      }
    }),
  },
};

export default resolvers;
