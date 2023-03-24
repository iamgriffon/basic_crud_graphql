import { prisma } from "@/server/utils/prisma";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(req: NextApiRequest, res: NextApiResponse){

  const {name, image, email} = req.body;
  console.log(req.body)

  await prisma.user
  .create({
    data: {
      name: name,
      image: image,
      email: email
    },
  })
  res.send('Done')
}