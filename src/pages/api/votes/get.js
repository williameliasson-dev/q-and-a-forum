import { authOptions } from "@/pages/api/auth/[...nextauth]";
import Vote from "models/vote";
import connectDB from "utils/connectDB";

export default async function handler(req, res) {
  if (req.method === "GET") {
    await connectDB();
    const votes = await Vote.find({ qid: req.query.qid });
    return res.status(200).json(await votes);
  } else return res.status(418).send({ message: "invalid method" });
}
