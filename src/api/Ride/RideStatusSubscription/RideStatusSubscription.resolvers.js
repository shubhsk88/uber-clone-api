import { withFilter } from 'graphql-yoga';

const resolvers = {
  Subscription: {
    rideStatusSubscription: {
      subscribe: withFilter(
        (_, __, { pubSub }) => pubSub.asyncIterator('rideUpdate'),
        (payload, _, { context }) => {
          const user = context.currentUser;
          const { driver, passenger } = payload.rideStatusSubscription;

          return (
            user.id === driver.toString() || user.id === passenger.toString()
          );
        }
      ),
    },
  },
};

export default resolvers;
