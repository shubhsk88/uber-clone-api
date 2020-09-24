const { default: Place } = require('../../../models/Place');
const { default: authResolvers } = require('../../../utils/authResolvers');
const { default: cleanNullArgs } = require('../../../utils/cleanNullArgs');

const resolvers = {
  Mutation: {
    editPlace: authResolvers(async (_, args, { req }) => {
      const { user } = req;
      const { placeID } = args;
      try {
        const place = await Place.findOne({ _id: placeID, user: user._id });
        if (place) {
          const notNull = cleanNullArgs(args);
          await Place.update({ _id: placeID }, { ...notNull });
          return { ok: true, error: null };
        } else {
          return { ok: false, error: 'User is not authorized' };
        }
      } catch (error) {
        return { ok: false, error: error.message };
      }
    }),
  },
};

export default resolvers;