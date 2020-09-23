import Verification from '../../../models/Verification';
import User from '../../../models/User';
import createJWT from '../../../utils/createJWT';

const resolvers = {
  Mutation: {
    completePhoneVerification: async (_, { phoneNumber, key }) => {
      try {
        const verification = await Verification.findOne({
          payload: phoneNumber,
          key,
        });
        console.log(verification);
        if (!verification) {
          return {
            ok: false,
            error: 'Verification key not found',
            token: null,
          };
        } else {
          verification.verified = true;
          verification.save();
        }
      } catch (error) {
        return {
          ok: false,
          error: error.message,
          token: null,
        };
      }

      try {
        const user = await User.findOne({ phoneNumber });

        if (user) {
          const token = createJWT(user.id);
          user.verifiedPhoneNumber = true;
          user.save();
          return {
            ok: true,
            error: null,
            token,
          };
        } else {
          return {
            ok: true,
            error: null,
            token: null,
          };
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
