import Ride from '../../../models/Ride';
import authResolvers from '../../../utils/authResolvers';

const resolvers = {
  Mutation: {
    updateRideStatus: authResolvers(async (_, args, { req, pubSub }) => {
      const { rideID, status } = args;
      const { user } = req;

      if (user.isDriving) {
        try {
          let ride;
          if (status === 'ACCEPTED') {
            ride = await Ride.findOne({
              _id: rideID,
              status: 'REQUESTING',
            });

            if (ride) {
              ride.driver = user._id;
              user.isTaken = true;
              user.save();
            }
          } else {
            ride = await Ride.findOne({
              _id: rideID,
              driver: user,
            });
          }
          if (ride) {
            ride.status = status;
            ride.save();

            pubSub.publish('rideUpdate', {
              rideStatusSubscription: ride,
            });

            return { ok: true, error: null };
          } else {
            return { ok: false, error: "Can't Update Ride" };
          }
        } catch (error) {
          return { ok: false, error: error.message };
        }
      } else {
        return { ok: false, error: 'You are not driving' };
      }
    }),
  },
};
export default resolvers;
