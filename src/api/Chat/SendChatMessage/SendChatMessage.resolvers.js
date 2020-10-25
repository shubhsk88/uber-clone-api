const { default: Chat } = require('../../../models/Chat');
const { default: Message } = require('../../../models/Message');
const { default: authResolvers } = require('../../../utils/authResolvers');

const resolvers = {
  Mutation: {
    sendChatMessage: authResolvers(async (_, args, { req, pubSub }) => {
      const { user } = req;
      const { chatId, text } = args;

      try {
        const chat = await Chat.findOne({ _id: chatId }).populate('messages');
        if (chat) {
          if (
            chat.passenger.toString() === user.id ||
            chat.driver.toString() === user.id
          ) {
            const getData = await Message.create({ text, user, chat });
            const message = await Message.findOne({
              _id: getData._id,
            });
            
            chat.messages.push(message);
            chat.save();
            pubSub.publish('newChatMessage', { messageSubscription: message });

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
