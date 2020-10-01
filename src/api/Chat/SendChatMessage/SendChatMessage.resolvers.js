const { default: Chat } = require('../../../models/Chat');
const { default: Message } = require('../../../models/Message');
const { default: authResolvers } = require('../../../utils/authResolvers');

const resolvers = {
  Mutation: {
    sendChatMessage: authResolvers(async (_, args, { req }) => {
      const { user } = req;
      const { chatId, text } = args;

      try {
        const chat = await Chat.findOne({ _id: chatId }).populate('messages');
        if (chat) {
          if (
            chat.passenger.toString() === user.id ||
            chat.driver.toString() === user.id
          ) {
            const message = await Message.create({ text, user, chat });
            chat.messages.push(message);
            chat.save();
            message.populate('user chat');

            return { ok: true, message, error: null };
          } else
            return { ok: false, error: 'Not allowed to chat', message: null };
        } else return { ok: false, error: 'Chat not found', message: null };
      } catch (error) {
        return {
          ok: false,
          error: error.message,
          message: null,
        };
      }
    }),
  },
};

export default resolvers;
