import model from "./model.js";
import { ObjectId } from 'mongodb'; 

export const createModule = async (module) => {
    module.id = new ObjectId().toString();
    delete module._id;
    return model.create(module);
};

export const findAllModules = () => model.find();

export const findModulesByCourse = (course) => 
    model.find({ course: course});

export const deleteModule = (moduleId) => 
    model.deleteOne({_id: moduleId});

export const updateModule = (moduleId, module) => 
    model.updateOne({_id: moduleId}, {$set: module});