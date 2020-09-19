/* eslint-disable no-unused-vars */
import Verification from '../../../models/Verification';

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
