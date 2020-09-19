const { default: User } = require('../../../models/User');

const resolvers = {
  Mutation: {
    emailSignIn: async (_, args) => {
      const { email, password } = args;
      try {
        const user = await User.findOne({ email });
        if (!user) {
          return {
            ok: false,
            token: 'User not found',
            error: null,
          };
        }
        const checkPassword = await user.comparePassword(password);
        if (checkPassword) {
          return {
            ok: true,
            token: 'Coming Soon',
            error: null,
          };
        } else {
          return { ok: false, error: 'Password is incorrect', token: null };
        }
      } catch (error) {
        return {
          ok: false,
          token: null,
          error: error.message,
        };
      }
    },
  },
};
export default resolvers;
