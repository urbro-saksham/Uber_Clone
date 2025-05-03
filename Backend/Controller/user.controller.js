const userModel = require('../Models/user');
const userService = require('../Services/user.service')

module.exports.registerUser = async (req, res, next) => {
   const {fullname, email, password} = req.body;

   const normalizedEmail = email.toLowerCase();

   const isAlreadyExists = await userModel.findOne({ email });

   if (isAlreadyExists) {
     return res.status(400).json({ message: 'User already exists' });
   }   

   const hashedpassword = await userModel.hashPassword(password);

   const user = await userService.createUser({
        firstname: fullname.firstname,
        lastname: fullname.lastname,
        email,
        password: hashedpassword
    });

    const token = user.generateAuthToken();

    res.status(201).json({ token, user });
}