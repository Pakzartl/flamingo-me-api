import User from '../controllers/user';
const Resolvers = {
  Query: {
    getAllUser: async () => {
      const users = await User.findAll();
      return users;
    },

    getUserByEmail: async (_: any, args: any) => {
      
      const user = await User.findByEmail(args["email"]);
      return user
    },
  }
};

export default Resolvers;