import model from "./model.js";
import { ObjectId } from 'mongodb'; 

export const createAssignment = (assignment) => {
    assignment.id = new ObjectId().toString();
    delete assignment._id;
    return model.create(assignment);
};

export const findAllAssignments = () => model.find();

export const findAssignmentsByCourse = (course) => model.find({ course: course });

export const deleteAssignment = (assignmentId) => model.deleteOne({_id: assignmentId});

export const updateAssignment = (assignmentId, assignment) => model.updateOne({_id: assignmentId}, {$set: assignment});