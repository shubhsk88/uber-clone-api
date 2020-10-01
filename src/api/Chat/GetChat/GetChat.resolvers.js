const { default: Chat } = require('../../../models/Chat');
const { default: authResolvers } = require('../../../utils/authResolvers');

const resolvers = {
  Query: {
    getChat: authResolvers(async (_, args, { req }) => {
      const { user } = req;
      const { chatId } = args;

      try {
        const chat = await Chat.findOne({ _id: chatId }).populate(
          'passenger driver messages'
        );
        if (chat) {
          if (chat.passenger.id === user.id || chat.driver.id === user.id) {
            return { ok: true, error: null, chat };
          } else
            return {
              ok: false,
              eror: 'User not authorized to chat',
              chat: null,
            };
        } else {
          return { ok: false, error: 'Chat Not found', chat: null };
        }
      } catch (error) {
        return { ok: false, error: error.message, chat: null };
      }
    }),
  },
};

export default resolvers;
