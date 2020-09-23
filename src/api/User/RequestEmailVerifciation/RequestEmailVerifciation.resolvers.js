const { default: Verification } = require('../../../models/Verification');
const { default: authResolvers } = require('../../../utils/authResolvers');
const { sendVerificationEmail } = require('../../../utils/sendEmail');

const resolvers = {
  Mutation: {
    requestEmailVerification: authResolvers(async (_, __, { req }) => {
      const { user } = req;
      if (user.email && !user.verifiedEmail) {
        try {
          const oldVerification = await Verification.findOne({
            payload: user.email,
          });
          if (oldVerification) {
            oldVerification.remove();
          }
          const newVerification = await Verification.create({
            payload: user.email,
            target: 'EMAIL',
          });

          await sendVerificationEmail(
            newVerification.key,
            user.email,
            user.fullName
          );

          return { ok: true, error: null };
        } catch (error) {
          return {
            ok: false,
            error: error.message,
          };
        }
      } else {
        return {
          ok: false,
          error: "User doesn't have verification code",
        };
      }
    }),
  },
};

export default resolvers;
