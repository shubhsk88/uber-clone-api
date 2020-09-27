const { default: authResolvers } = require('../../../utils/authResolvers');

const resolvers = {
  Query: {
    getNearByDrivers: authResolvers(async (_, __, { req }) => {
      const { user } = req;
      const { lastLng, lastLat } = user;
      try {
        const drivers = await User.find({
          isDriving: true,
          lastLat: { $gte: lastLat - 0.05, $lte: lastLat + 0.05 },
          lastLng: { $gte: lastLng - 0.05, $let: lastLng + 0.05 },
        });
        return { ok: true, error: null, drivers };
      } catch (error) {
        return { ok: false, error: error.message, user: null };
      }
    }),
  },
};
export default resolvers;
