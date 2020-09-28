import { withFilter } from 'graphql-yoga';

const resolvers = {
  Subscription: {
    driverSubscription: {
      subscribe: withFilter(
        (_, __, { pubSub }) => pubSub.asyncIterator('driverUpdate'),
        (payload, _, { context }) => {
          const {
            lastLng: userLastLng,
            lastLat: userLastLat,
          } = context.currentUser;
          const { lastLng: driverLastLng, lastLat: driverLastLat } = payload;

          return (
            driverLastLat >= userLastLat - 0.05 &&
            driverLastLat <= userLastLat + 0.05 &&
            driverLastLng >= userLastLng - 0.05 &&
            driverLastLng <= userLastLng + 0.05
          );
        }
      ),
    },
  },
};

export default resolvers;
