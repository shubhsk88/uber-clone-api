const { default: Ride } = require('../../../models/Ride');
const { default: authResolvers } = require('../../../utils/authResolvers');

const resolvers = {
  Query: {
    getNearbyRides: authResolvers(async (_, __, { req }) => {
      const { user } = req;
      const { lastLat, lastLng } = user;
      if (user.isDriving) {
        try {
          const rides = await Ride.find({
            pickupLat: { $gte: lastLat - 0.05, $lte: lastLat + 0.05 },

            pickupLng: { $gte: lastLng - 0.05, $let: lastLng + 0.05 },
          });
          return { ok: true, error: null, rides };
        } catch (error) {
          return { ok: false, error: error.message, rides: null };
        }
      } else {
        return { ok: false, error: 'You are not a driver', rides: null };
      }
    }),
  },
};

export default resolvers;
