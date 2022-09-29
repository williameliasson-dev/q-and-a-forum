import { Schema, model, models } from "mongoose";

const questionSchema = new Schema(
  {
    title: { type: "String", required: true },
    content: { type: "String", required: true },
    solution: { type: "String", required: false },
    tags: { type: [String], required: false },
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
