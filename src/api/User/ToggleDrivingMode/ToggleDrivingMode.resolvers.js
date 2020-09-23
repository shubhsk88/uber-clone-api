const { default: authResolvers } = require('../../../utils/authResolvers');

const resolvers = {
  Mutation: {
    toggleDrivingMode: authResolvers(async (_, __, { req }) => {
      const { user } = req;
      user.isDriving = !user.isDriving;
      user.save();
      return { ok: true, error: null };
    }),
  },
};

export default resolvers;
