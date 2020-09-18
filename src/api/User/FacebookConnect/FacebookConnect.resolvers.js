import User from '../../../models/User';

const resolvers = {
  Mutation: {
    facebookConnect: async (_, { input }) => {
      const { fbId } = input;
      try {
        const existingUser = await User.findOne({ fbId });
        if (existingUser) {
          return {
            ok: true,
            error: null,
            token: 'Update Later',
          };
        }
      } catch (error) {
        return {
          ok: false,
          error: error.message,
          token: null,
        };
      }
      try {
        await User.create({
          ...input,
          profilePhoto: `http://graph.facebook.com/${fbId}/picture?type=square`,
        });

        return {
          ok: true,
          error: null,
          token: 'User Created',
        };
      } catch (error) {
        return {
          ok: true,
          error: error.message,
          token: null,
        };
      }
    },
  },
};

export default resolvers;
