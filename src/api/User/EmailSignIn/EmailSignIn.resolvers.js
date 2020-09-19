const { default: User } = require('../../../models/User');

const resolvers = {
  Mutation: {
    emailSignIn: async (_, args) => {
      const { email } = args;
      try {
        const user = await User.findOne({ email });
        if (!user) {
          return {
            ok: false,
            token: 'User not found',
            error: null,
          };
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
