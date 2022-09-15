import { authOptions } from "@/pages/api/auth/[...nextauth]";
import Question from "models/question";
import connectDB from "utils/connectDB";
import { unstable_getServerSession } from "next-auth/next";

export default async function handler(req, res) {
  const session = await unstable_getServerSession(req, res, authOptions);

  if (!session) {
    res.status(401).json({ message: "You must be logged in." });
    return;
  }

  console.log(session);

  if (req.method === "POST") {
    await connectDB();

    const newQuestion = {
      title: req.body.title,
      content: req.body.content,
      userName: session.user.name,
      userId: session.user.name,
      userImg: session.user.image,
    };
    Question.create(newQuestion);
    res.status(200).send({ message: "1 document inserted" });
    return;
  } else return res.status(418).send({ message: "invalid method" });
}
