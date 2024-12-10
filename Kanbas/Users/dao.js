import model from "./model.js";
export const findAllUsers = () => model.find();

// Create a new user
export const createUser = (user) => {
  delete user._id;  // 移除可能存在的 _id 字段
  return model.create(user);
};


// Find user by ID
export const findUserById = (userId) => model.findById(userId);


// Find user by username
export const findUserByUsername = async (username) => {
    return await model.findOne({ username: username });
};

// Find user by credentials (username and password)
export const findUserByCredentials = async (username, password) => {
    return await model.findOne({ username, password });
};

export const findUsersByRole = (role) => model.find({ role: role }); // or just model.find({ role })

// 按名字搜索用户（支持部分匹配和大小写不敏感）
export const findUsersByPartialName = (partialName) => {
  const regex = new RegExp(partialName, "i");
  return model.find({
    $or: [
      { firstName: { $regex: regex } },
      { lastName: { $regex: regex } }
    ]
  });
};

export const updateUser = (userId, user) => {
  return model.updateOne({ _id: userId }, { $set: user });
};

// Delete user
export const deleteUser = async (userId) => {
    return await model.deleteOne({ _id: userId });
};