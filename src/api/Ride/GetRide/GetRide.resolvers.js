const { default: Ride } = require('../../../models/Ride');
const { default: authResolvers } = require('../../../utils/authResolvers');

const resolvers = {
  Query: {
    getRide: authResolvers(async (_, args, { req }) => {
      const { user } = req;
      const { rideID } = args;
      try {
        const ride = await Ride.findOne({ _id: rideID }).populate(
          'driver passenger'
        );

        if (ride) {
          if (
            ride.passenger._id.toString() === user.id ||
            ride.driver._id.toString() === user.id
          ) {
            return { ok: true, error: null, ride };
          } else {
            return { ok: false, error: 'You are not authorized', ride: null };
          }
        } else {
          return { ok: false, error: 'Ride not found', ride: null };
        }
      } catch (error) {
        return { ok: false, error: error.message, ride: null };
      }
    }),
  },
};

export default resolvers;
