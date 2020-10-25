import User from '../../../models/User';
import createJWT from '../../../utils/createJWT';

const resolvers = {
  Mutation: {
    facebookConnect: async (_, data) => {
      const { fbId } = data;
      try {
        const existingUser = await User.findOne({ fbId });
        if (existingUser) {
          const token = createJWT(existingUser._id);
          return {
            ok: true,
            error: null,
            token,
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
        const newUser = await User.create({
          ...data,
          profilePhoto: `http://graph.facebook.com/${fbId}/picture?type=square`,
        });
        const token = createJWT(newUser.id);
        return {
          ok: true,
          error: null,
          token,
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
