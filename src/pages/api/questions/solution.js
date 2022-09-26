import { authOptions } from "@/pages/api/auth/[...nextauth]";
import Comment from "models/comment";
import connectDB from "utils/connectDB";
import { unstable_getServerSession } from "next-auth/next";
import Question from "models/question";

export default async function handler(req, res) {
  const session = await unstable_getServerSession(req, res, authOptions);

  if (!session) {
    res.status(401).json({ message: "You must be logged in." });
    return;
  }

  if (req.method === "POST") {
    await connectDB();

    console.log(req.body.qid);

    await Question.findOneAndUpdate(
      { _id: req.body.qid },
      { solution: req.body.cid }
    );
    await res.revalidate(`/questions/${req.body.qid}`);
    return res.status(200).send({ message: "1 doc modified" });
  } else return res.status(418).send({ message: "invalid method" });
}
