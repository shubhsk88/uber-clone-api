import { withFilter } from 'graphql-yoga';

const resolvers = {
  Subscription: {
    rideStatusSubscription: {
      subscribe: withFilter(
        (_, __, { pubSub }) => pubSub.asyncIterator('rideUpdate'),
        (payload, _, { context }) => {
          const user = context.currentUser;
          const { driverId, passengerId } = payload.rideStatusSubscription;

          return (
            user.id === driverId.toString() ||
            user.id === passengerId.toString()
          );
        }
      ),
    },
  },
};

export default resolvers;
