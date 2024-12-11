import model from "./model.js";
import { ObjectId } from 'mongodb';


export const createCourse = (course) => {
    course.id = new ObjectId().toString();
    delete course._id;
    return model.create(course);
};

export const findAllCourses = () => model.find().select("id name number startDate endDate image");

// export const findAllCourses = () => model.find();

export const findCourseById = (id) => model.findOne({ id: id });

export const findCourseByNumber = (courseNumber) => 
    model.findOne({ number: courseNumber });

export const updateCourse = (courseId, course) => 
    model.updateOne({ _id: courseId }, { $set: course });

export const deleteCourse = (courseId) => model.deleteOne({_id: courseId});

