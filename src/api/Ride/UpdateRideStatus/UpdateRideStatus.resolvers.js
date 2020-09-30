import Ride from '../../../models/Ride';
import authResolvers from '../../../utils/authResolvers';

const resolvers = {
  Mutation: {
    updateRideStatus: authResolvers(async (_, args, { req }) => {
      const { rideID, status } = args;
      const { user } = req;

      if (user.isDriving) {
        try {
          const ride = await Ride.findOne({
            _id: rideID,
            status: 'REQUESTING',
          });
          if (ride) {
            ride.status = status;
            ride.save();
            return { ok: true, error: null };
          } else {
            return { ok: false, error: "Can't Update Ride" };
          }
        } catch (error) {
          return { ok: false, error: error.message };
        }
      }
    }),
  },
};
export default resolvers;
