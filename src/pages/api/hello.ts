// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { PrismaClient } from '@prisma/client';
import type { NextApiRequest, NextApiResponse } from 'next';
import bcrypt from "bcrypt";

const prisma = new PrismaClient();


export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {

  const { providedEmail, providedPassword } = req.body;

  const dbquery = await prisma.user.findFirst({
    where: {
      email: providedEmail,
    },
    select: {
      email: true,
      password: true,
    }
  });

  const checkLogin = await bcrypt.compare(dbquery?.password as string, providedPassword);

  if (checkLogin === true) res.send({match: checkLogin})
}
