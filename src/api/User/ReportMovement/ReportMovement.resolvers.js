import User from '../../../models/User';
import authResolvers from '../../../utils/authResolvers';
import cleanNullArgs from '../../../utils/cleanNullArgs';

const resolvers = {
  Mutation: {
    reportMovement: authResolvers(async (_, args, { req, pubSub }) => {
      const { user } = req;
      const { lng, lat, orientation } = args;
      const last = { lastLng: lng, lastLat: lat, orientation };
      const notNull = cleanNullArgs(last);

      try {
        await User.update({ _id: user._id }, { ...notNull });
        const updatedUser = await User.findById(user._id);

        pubSub.publish('driverUpdate', { driverSubscription: updatedUser });
        return { ok: true, error: null };
      } catch (error) {
        return { ok: false, error: error.message };
      }
    }),
  },
};

export default resolvers;
