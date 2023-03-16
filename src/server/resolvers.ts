type Task = {
  id: number;
  userId: number;
  task: string;
};

export const resolvers = {
  Query: {
    user() {
      const user = {
        id: 1,
        name: "test",
        email: "test@test.com",
        password: "test",
        image: "https://github.com/iamgriffon.png",
        tasks: [] as Task[],
      };
      console.log('Resolvers')
      return user;
    },
  },
};
