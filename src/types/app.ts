export type User = {
  id: number,
  name: string;
  email: string;
  image: string;
  tasks: Task[];
};

export type Task = {
  id: number;
  task: string;
  userId?: number;
  finished: boolean;
};
