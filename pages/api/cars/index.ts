import { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../../prisma/client";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const { method } = req;

  switch (method) {
    case "GET":
      const cars = await prisma.car.findMany();
      res.status(200).json(cars);
      break;
    case "POST":
      const newCar = await prisma.car.create({
        data: {
          model: req.body.model,
          name: req.body.name,
          year: +req.body.year,
        },
      });
      res.status(200).json(newCar);
      break;
    default:
      res.status(405).end(`Method ${method} Not Allowed`);
  }
};

export default handler;
