const authResolvers = (Inputresolvers) => async (
  parent,
  args,
  context,
  info
) => {
  if (!context.req.user) {
    throw new Error('No token found.Please try again');
  }
  const result = await Inputresolvers(parent, args, context, info);
  return result;
};
export default authResolvers;
