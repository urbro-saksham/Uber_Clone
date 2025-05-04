const userModel = require('../Models/user');

module.exports.createUser = async ({ fullname, email, password }) => {
  const { firstname, lastname } = fullname || {};

  if (!firstname || !email || !password) {
    throw new Error('All fields are required');
  }

  const user = await userModel.create({
    fullname: {
      firstname,
      lastname: lastname || '',
    },
    email,
    password,
  });

  return user;
};