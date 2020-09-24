const { default: User } = require('../../../models/User');
const { default: authResolvers } = require('../../../utils/authResolvers');

const resolvers = {
  Query: {
    getMyPlaces: authResolvers(async (_, __, { req }) => {
      const { user } = req;
      try {
        const resUser = await User.findOne({ _id: user._id });
        if (resUser) {
          console.log(resUser);
          return { ok: true, error: null, places: resUser.places };
        } else
          return { ok: false, error: 'User not able to find', places: null };
      } catch (error) {
        return { ok: false, error: error.message, places: null };
      }
    }),
  },
};

export default resolvers;
