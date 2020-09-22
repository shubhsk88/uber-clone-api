import User from '../../../models/User';
import createJWT from '../../../utils/createJWT';
import { sendVerificationEmail } from '../../../utils/sendEmail';
import Verification from '../../../models/Verification';

const resolvers = {
  Mutation: {
    emailSignUp: async (_, args) => {
      let { email, phoneNumber } = args;
      try {
        let existingUser = await User.findOne({ email });
        if (existingUser) {
          return {
            ok: false,
            token: null,
            error: 'User already exists.Please try Login instead.',
          };
        } else {
          const phoneVerification = await Verification.findOne({
            phoneNumber,
            verified: true,
          });
          if (phoneVerification) {
            const newUser = await User.create({ ...args });
            const verification = await Verification.create({
              payload: newUser.email,
              target: 'EMAIL',
            });
            sendVerificationEmail(
              verification.key,
              newUser.email,
              newUser.fullName
            );

            const token = createJWT(newUser.id);
            return { ok: true, token, error: null };
          } else {
            return {
              ok: false,
              error: 'You have not verified your number',
              token: null,
            };
          }
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
