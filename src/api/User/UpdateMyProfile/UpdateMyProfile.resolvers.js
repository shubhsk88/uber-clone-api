import authResolvers from '../../../utils/authResolvers';

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
        await User.findOneAndUpdate({ _id: user._id }, { ...args });
        return { ok: true, error: null };
      } catch (error) {
        return { ok: false, error: error.message };
      }
    }),
  },
};

export default resolvers;
