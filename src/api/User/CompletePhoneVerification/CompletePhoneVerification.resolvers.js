import Verification from '../../../models/Verification';
import { User } from '../../../models';

const resolvers = {
  Mutation: {
    completePhoneVerification: async (_, { phoneNumber, key }) => {
      try {
        const verification = await Verification.findOne({
          payload: phoneNumber,
          key,
        });
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
          user.verifiedPhoneNumber = true;
          user.save();
          return {
            ok: true,
            error: null,
            token: 'COmming soon ',
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
