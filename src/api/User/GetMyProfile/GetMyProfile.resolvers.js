import authResolvers from '../../../utils/authResolvers';
const resolvers = {
  Query: {
    getMyProfile: authResolvers(async (_, __, { req }) => {
      const { user } = req;

      return {
        ok: true,
        error: null,
        user,
      };
    }),
  },
};

export default resolvers;
