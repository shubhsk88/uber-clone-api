import User from '../../../models/User';
import createJWT from '../../../utils/createJWT';
import { sendVerificationEmail } from '../../../utils/sendEmail';
import Verification from '../../../models/Verification';

const resolvers = {
  Mutation: {
    emailSignUp: async (_, args) => {
      let { email } = args;
      try {
        let existingUser = await User.findOne({ email });
        if (existingUser) {
          return {
            ok: false,
            token: null,
            error: 'User already exists.Please try Login instead.',
          };
        } else {
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
