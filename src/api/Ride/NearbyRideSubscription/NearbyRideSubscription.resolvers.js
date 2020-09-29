import { withFilter } from 'graphql-yoga';

const resolvers = {
  Subscription: {
    nearbyRideSubscription: {
      subscribe: withFilter(
        (_, __, { pubSub }) => pubSub.asyncIterator('rideRequest'),
        (payload, _, { context }) => {
          const {
            lastLng: userLastLng,
            lastLat: userLastLat,
          } = context.currentUser;
          const { pickupLat, pickupLng } = payload.nearbyRideSubscription;

          return (
            pickupLat >= userLastLat - 0.05 &&
            pickupLat <= userLastLat + 0.05 &&
            pickupLng >= userLastLng - 0.05 &&
            pickupLng <= userLastLng + 0.05
          );
        }
      ),
    },
  },
};

export default resolvers;
