import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";

const prisma = new PrismaClient();

async function getHashedPassword(password: string){
   const result = await bcrypt.hash(password, 2).then((res) => res);
   return result
}

const tasks = [
  "Tomar café da manhã",
  "Estudar para provas",
  "Andar 3km",
  "Cuidar da Morgana",
  "Fazer pelo menos 3 commits por dia",
  "Beber 2L de água",
  "Fazer mercado",
  "Tirar o lixo as terças, quintas e sábados",
];

async function main() {

  await prisma.user.create({
    data: {
      name: "test name",
      email: "example@email.com",
      password: await getHashedPassword('testpassword'),
      image: "https://api.lorem.space/image/movie",
    },
  });

  await prisma.user.create({
    data: {
      name: "Gustavo",
      email: "guusilveira@gmail.com",
      password: await getHashedPassword('aoba123'),
      image: "https://github.com/iamgriffon.png",
    },
  });

  tasks.forEach(async (task) => {
    await prisma.task.create({
      data: {
        finished: false,
        task: task,
        userId: 1,
      },
    });
  });

  tasks.forEach(async (task) => {
    await prisma.task.create({
      data: {
        finished: false,
        task: task,
        userId: 2,
      },
    });
  });
}


prisma.task.deleteMany();
prisma.user.deleteMany();
main();