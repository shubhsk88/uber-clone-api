const { default: Ride } = require('../../../models/Ride');
const { default: authResolvers } = require('../../../utils/authResolvers');

const resolvers = {
  Query: {
    getNearbyRide: authResolvers(async (_, __, { req }) => {
      const { user } = req;
      const { lastLat, lastLng } = user;
      if (user.isDriving) {
        try {
          const ride = await Ride.findOne({
            status: 'REQUESTING',
            pickupLat: { $gte: lastLat - 0.05, $lte: lastLat + 0.05 },

            pickupLng: { $gte: lastLng - 0.05, $let: lastLng + 0.05 },
          });
          if (ride) {
            return { ok: true, error: null, ride };
          } else {
            return { ok: true, error: null, ride: null };
          }
        } catch (error) {
          return { ok: false, error: error.message, ride: null };
        }
      } else {
        return { ok: false, error: 'You are not a driver', ride: null };
      }
    }),
  },
};

export default resolvers;
