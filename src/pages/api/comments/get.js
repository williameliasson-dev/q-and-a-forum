import { authOptions } from "@/pages/api/auth/[...nextauth]";
import Comment from "models/comment";
import connectDB from "utils/connectDB";

export default async function handler(req, res) {
  if (req.method === "GET") {
    await connectDB();
    const comments = await Comment.find({ qid: req.query.qid });
    return res.status(200).json(await comments);
  } else return res.status(418).send({ message: "invalid method" });
}
