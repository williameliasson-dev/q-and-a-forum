import { authOptions } from "@/pages/api/auth/[...nextauth]";
import Vote from "models/vote";
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

    const userQuestionVotes = await Vote.findOne({
      qid: req.body.qid,
      userEmail: session.user.email,
    });

    if (!userQuestionVotes) {
      const newVote = {
        qid: req.body.qid,
        type: req.body.type,
        userId: session.user._id,
      };
      const savedVote = await Vote.create(newVote);
      res.status(200).send({ message: "1 doc inserted", savedVote });
    } else if (userQuestionVotes.type != req.body.type) {
      let type = () => {
        if (userQuestionVotes.type === "up") {
          return "down";
        } else return "up";
      };

      await Vote.findOneAndUpdate(
        {
          qid: req.body.qid,
          userEmail: session.user.email,
        },
        { type: type() }
      );
      await res.revalidate(`/questions/${req.body.qid}`);
      return res.json({ revalidated: true });
    } else return res.status(401).send({ message: "vote already casted" });
  } else return res.status(418).send({ message: "invalid method" });
}
