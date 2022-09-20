import { Schema, model, models } from "mongoose";

const questionSchema = new Schema(
  {
    title: { type: "String", required: true },
    content: { type: "String", required: true },
    tags: { type: "Array", required: true },
    userName: { type: "String", required: true },
    userId: { type: "String", required: true },
    userImg: { type: "String", required: true },
  },
  {
    timestamps: true,
  }
);

const Question = models.Question || model("Question", questionSchema);

export default Question;
