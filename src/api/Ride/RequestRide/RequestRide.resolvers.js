import Ride from '../../../models/Ride';

const { default: authResolvers } = require('../../../utils/authResolvers');

const resolvers = {
  Mutation: {
    requestRide: authResolvers(async (_, args, { req, pubSub }) => {
      const { user } = req;
      if (!user.isRiding && !user.isDriving) {
        try {
          const ride = await Ride.create({ ...args, passenger: user });
          pubSub.publish('rideRequest', { nearbyRideSubscription: ride });
          user.isRiding = true;
          user.save();
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
      } else {
        return {
          ok: false,
          error: "You can't request two rides or you are driver",
          ride: null,
        };
      }
    }),
  },
};

export default resolvers;
