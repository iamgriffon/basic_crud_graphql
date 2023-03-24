import { prisma } from "./utils/prisma";

type Task = {
  id: number;
  userId: number;
  task: string;
};

export const resolvers = {
  Query: {
    user: async (_parent, args, context) => {
      const { id } = args;

      const user = await prisma.user.findFirst({
        where: {
          id: id,
        },
        include: {
          tasks: true,
        },
      });

      if (!user) {
        throw new Error(`No user found with id: ${id}`);
      }

      return user;
    },

    users: async () => {
      const users = await prisma.user.findMany({
        select: {
          name: true,
          email: true,
          tasks: true,
          image: true,
        },
      });
      return users;
    },

    tasks: async (_parent, args, context) => {
      const { email } = args;

      const tasks = await context.prisma.task.findMany({
        where: {
          User: {
            email: email,
          },
        },
      });

      return tasks;
    },
  },

  Mutation: {
    addUser: async (_parent, args, context) => {
      const { name, email, image } = args;
      await prisma.user
        .create({
          data: {
            name: name,
            image: image,
            email: email
          },
        })
        .then((res) => console.log("Response from server: ", res));
      const updatedUsers = await prisma.user.findMany({
        include: {
          tasks: true,
        },
      });
      console.log('Updated Users', updatedUsers)
      return updatedUsers
    },

    updateUser: async (_parent, args, context) => {
      const { name, email, image } = args;
      const user = await prisma.user.findFirstOrThrow({
        where: {
          email: email,
        },
      });

      if (!user) {
        throw new Error(`No user found with email: ${email}`);
      }

      await prisma.user.update({
        where: {
          id: user.id,
        },
        data: {
          name: name,
          email: email,
          image: image,
        },
      });
      const updatedUsers = await prisma.user.findMany({
        include: {
          tasks: true
        }
      });
      return updatedUsers;
    },

    deleteUser: async(_parent, args, context) => {
      const { name, email, image } = args;
      const user = await prisma.user.findFirstOrThrow({
        where: {
          email: email,
        },
      });

      if (!user) {
        throw new Error(`No user found with email: ${email}`);
      }

      await prisma.user.delete({
        where: {
          id: user.id,
        },
      });
      const updatedUsers = await prisma.user.findMany({
        include: {
          tasks: true
        }
      });
      return updatedUsers;
    },

    addTask: async (_parent, args, context) => {
      const { email, task } = args;

      const user = await context.prisma.user.findUnique({
        where: {
          email: email,
        },
      });

      if (!user) {
        throw new Error(`No user found with email: ${email}`);
      }

      const updatedTasks = await context.prisma.user.update({
        where: {
          id: user.id,
        },
        data: {
          tasks: {
            create: {
              task: task,
              finished: false,
            },
          },
        },
        include: {
          tasks: true,
        },
      });
      return updatedTasks.tasks;
    },

    deleteTask: async (_parent, args, context) => {
      const { email, taskId } = args;

      const user = await prisma.user.findUnique({
        where: {
          email: email,
        },
        include: {
          tasks: true,
        },
      });

      if (!user) {
        throw new Error(`No user found with email: ${email}`);
      }
      const taskToDelete = user.tasks.find((task) => task.id == taskId);

      console.log("User Tasks", user.tasks);

      if (!taskToDelete) throw new Error(`No task was found`);

      await prisma.task.delete({
        where: {
          id: taskToDelete.id,
        },
      });

      const updatedTasks = user;

      if (!updatedTasks) throw new Error(`Could not find Tasks`);

      return updatedTasks.tasks;
    },

    finishTask: async (_parent, args, context) => {
      const { email, taskId } = args;

      const user = await context.prisma.user.findUnique({
        where: {
          email: email,
        },
      });

      if (!user) {
        throw new Error(`No user found with email: ${email}`);
      }

      const task = await context.prisma.task.findUnique({
        where: {
          id: taskId,
        },
        select: {
          id: true,
          finished: true,
        },
      });

      if (!task) {
        throw new Error(`No task was found`);
      }

      const updatedTasks = await context.prisma.task.update({
        where: {
          id: taskId,
        },
        data: {
          finished: !task.finished,
        },
      });

      return updatedTasks;
    },

    updateTask: async (_parent, args, context) => {
      const { email, task, taskId } = args;

      const user = await context.prisma.user.findUnique({
        where: {
          email: email,
        },
        include: {
          tasks: true,
        },
      });

      if (!user) {
        throw new Error(`No user found with email: ${email}`);
      }

      const taskToUpdate = user.tasks.find((task) => task.id === taskId);

      if (!taskToUpdate) {
        throw new Error(`No task was found`);
      }

      await context.prisma.task.update({
        where: {
          id: taskId,
        },
        data: {
          task: task,
        },
      });

      const updatedTasks = await context.prisma.user.findUnique({
        where: {
          email: email,
        },
        include: {
          tasks: true,
        },
      });

      if (!updatedTasks) throw new Error(`Could not find Tasks`);

      return updatedTasks.tasks;
    },
  },
};
