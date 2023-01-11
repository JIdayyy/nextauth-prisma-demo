import { NextApiResponse } from "next";
import { NextApiRequest } from "next";
import prisma from "../../../prisma/client";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const { method } = req;
  const { id } = req.query;

  switch (method) {
    case "GET":
      const car = await prisma.car.findUnique({
        where: {
          id: id as string,
        },
      });
      res.status(200).json(car);
      break;
    case "POST":
      res.status(200).json({ message: "POST" });
      break;
    default:
      res.status(405).end(`Method ${method} Not Allowed`);
  }
};

export default handler;
