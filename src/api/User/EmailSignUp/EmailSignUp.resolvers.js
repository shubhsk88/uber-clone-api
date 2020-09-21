import User from '../../../models/User';

const resolvers = {
  Mutation: {
    emailSignUp: async (_, args) => {
      let { email } = args;
      try {
        let existingUser = await User.findOne({ email });
        if (existingUser) {
          return {
            ok: false,
            token: null,
            error: 'User already exists.Please try Login instead.',
          };
        } else {
          await User.create({ ...args });
          return { ok: true, token: 'Comming Soon', error: null };
        }
      } catch (error) {
        return {
          ok: false,
          error: error.message,
          token: null,
        };
      }
    },
  },
};

export default resolvers;
