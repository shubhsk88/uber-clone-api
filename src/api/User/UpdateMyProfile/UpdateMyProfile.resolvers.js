import authResolvers from '../../../utils/authResolvers';
import cleanNullArgs from '../../../utils/cleanNullArgs';

const { default: User } = require('../../../models/User');

const resolvers = {
  Mutation: {
    updateMyProfile: authResolvers(async (_, args, { req }) => {
      const { user } = req;

      try {
        if (args.password !== null) {
          user.password = args.password;
          user.save();
        }
        const notNull = cleanNullArgs(args);
        await User.findOneAndUpdate({ _id: user._id }, { ...notNull });
        return { ok: true, error: null };
      } catch (error) {
        return { ok: false, error: error.message };
      }
    }),
  },
};

export default resolvers;
