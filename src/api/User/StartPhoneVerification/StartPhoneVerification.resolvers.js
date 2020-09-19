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
