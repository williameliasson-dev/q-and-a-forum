import { Schema, model, models } from "mongoose";

const questionSchema = new Schema({
  title: { type: "String", requierd: true },
  content: { type: "String", requierd: true },
  userName: { type: "String", requierd: true },
  userId: { type: "String", requierd: true },
  userImg: { type: "String", requierd: true },
});

const Question = models.Question || model("Question", questionSchema);

export default Question;
