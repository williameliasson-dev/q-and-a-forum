import Question from "models/question";
import connectDB from "utils/connectDB";

export default async function handler(req, res) {
  if (req.method === "GET") {
    await connectDB();

    const results = await Question.find({
      $text: { $search: req.query.title },
    }).limit(5);
    return res.status(200).json(await results);
  } else return res.status(418).send({ message: "invalid method" });
}
