import model from "./model.js";
import { ObjectId } from 'mongodb'; 

export const createQuiz = (quiz) => {
  quiz.id = new ObjectId().toString();
  delete quiz._id;
  return model.create(quiz);

};

export const findAllQuizzes = () => model.find();

export const findQuizzesByCourse = (course) => model.find({ course: course });

export const findQuizById = (quizId) => model.findById(quizId);

export const deleteQuiz = (quizId) => model.deleteOne({ _id: quizId });

export const updateQuiz = (quizId, quiz) =>
  model.updateOne({ _id: quizId }, { $set: quiz });
