import { Schema, model, models } from "mongoose";

const questionSchema = new Schema({
  title: String,
  content: String,
  userName: String,
  userId: String,
});

const Question = models.question || model("Question", questionSchema);

export default Question;
