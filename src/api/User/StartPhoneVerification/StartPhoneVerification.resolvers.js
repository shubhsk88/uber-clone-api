/* eslint-disable no-unused-vars */
import Verification from '../../../models/Verification';
import { sendVerificationSMS } from '../../../utils';

const resolvers = {
  Mutation: {
    createPhoneVerification: async (_, { phoneNumber }) => {
      try {
        const existingVerification = await Verification.findOne({
          payload: phoneNumber,
        });
        if (existingVerification) {
          existingVerification.remove();
        }
        const verification = await Verification.create({
          payload: phoneNumber,
          target: 'PHONE',
        });

        await sendVerificationSMS(verification.payload, verification.key);
        return { ok: true, error: null };
      } catch (error) {
        return {
          ok: false,
          error: error.message,
        };
      }
    },
  },
};

export default resolvers;
