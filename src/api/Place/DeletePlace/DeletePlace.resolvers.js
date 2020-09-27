const { default: Place } = require('../../../models/Place');
const { default: authResolvers } = require('../../../utils/authResolvers');

const resolvers = {
  Mutation: {
    deletePlace: authResolvers(async (_, args, { req }) => {
      const { user } = req;
      try {
        const place = await Place.findOne({
          _id: args.placeID,
        });
        
        if (place.userPrimary.toString() === user.id) {
          place.remove();
          return { ok: true, error: null };
        } else {
          return { ok: false, error: 'Place not found' };
        }
      } catch (error) {
        return { ok: false, error: error.message };
      }
    }),
  },
};

export default resolvers;
