const { default: Verification } = require('../../../models/Verification');
const { default: authResolvers } = require('../../../utils/authResolvers');

const resolvers = {
  Mutation: {
    completeEmailVerification: authResolvers(async (_, args, { req }) => {
      const { user } = req;
      const { key } = args;
      if (user.email) {
        try {
          const verified = await Verification.findOne({
            key,
            payload: user.email,
          });
          if (verified) {
            user.verifiedEmail = true;
            user.save();
            return { ok: true, error: null };
          } else {
            return { ok: false, error: "Can't verify email" };
          }
        } catch (error) {
          return { ok: false, error: error.messages };
        }
      } else {
        return { ok: false, error: "User Email doesn't exist" };
      }
    }),
  },
};

export default resolvers;
