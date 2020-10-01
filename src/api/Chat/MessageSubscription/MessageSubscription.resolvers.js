import { withFilter } from 'graphql-yoga';

const resolvers = {
  Subscription: {
    messageSubscription: {
      subscribe: withFilter(
        (_, __, { pubSub }) => pubSub.asyncIterator('newChatMessage'),
        (payload, _, { context }) => {
          const user = context.currentUser;
          const { chat } = payload.messageSubscription;
          console.log(chat);
          return (
            chat.passenger.toString() === user.id ||
            chat.driver.toString() === user.id
          );
        }
      ),
    },
  },
};

export default resolvers;
