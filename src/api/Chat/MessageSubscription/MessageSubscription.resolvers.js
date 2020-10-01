import { withFilter } from 'graphql-yoga';
import Chat from '../../../models/Chat';

const resolvers = {
  Subscription: {
    messageSubscription: {
      subscribe: withFilter(
        (_, __, { pubSub }) => pubSub.asyncIterator('newChatMessage'),
        async (payload, _, { context }) => {
          const user = context.currentUser;
          const { chat: chatID } = payload.messageSubscription;

          try {
            const chat = await Chat.findOne({ _id: chatID });

            if (chat) {
              return (
                chat.passenger.toString() === user.id ||
                chat.driver.toString() === user.id
              );
            } else return false;
          } catch (error) {
            return false;
          }
        }
      ),
    },
  },
};

export default resolvers;
