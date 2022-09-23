import { authOptions } from "@/pages/api/auth/[...nextauth]";
import Comment from "models/comment";
import connectDB from "utils/connectDB";
import { unstable_getServerSession } from "next-auth/next";

export default async function handler(req, res) {
  const session = await unstable_getServerSession(req, res, authOptions);

  if (!session) {
    res.status(401).json({ message: "You must be logged in." });
    return;
  }

  if (req.method === "POST") {
    await connectDB();

    const newComment = {
      qid: req.body.qid,
      content: req.body.content,
      userName: session.user.name,
      userEmail: session.user.email,
      userImg: session.user.image,
    };
    const savedDoc = await Comment.create(newComment);
    await res.revalidate(`/questions/${req.body.qid}`);
    return res.status(200).send({ message: "1 doc inserted", savedDoc });
  } else return res.status(418).send({ message: "invalid method" });
}
