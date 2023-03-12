import User from '../models/User.js';
import Student from '../models/Student.js';
import bcryptsjs from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { createError } from '../utils/error.js';
//////users section of api start 
export const createUsers = async (req, res, next) => {
    const email = await User.findOne({ email: req.body.email });
    if (email) {
        return res.send("409");
    }
    const salt = bcryptsjs.genSaltSync(10);
    const passhash = bcryptsjs.hashSync(req.body.password, salt);
    try {
        const user = {
            name: req.body.name,
            email: req.body.email,
            password: passhash,
        }
        const newUser = new User(user);
        await newUser.save();
        res.status(201).json(newUser);   ////if data saved properly then code 201
    } catch (error) {
        //console.log(error.message)
        // res.status(409).json({ message: error.message }); ////if data saved fails  then code 409
        next(error);
    }
}
export const login = async (req, res, next) => {
    try {
        const user = await User.findOne({ email: req.body.email });
        if (!user) {
            //next(createError(404,"User Not Found!"));
            return res.send("404");
        }
        const passwordDB = user.password;
        const matchPasswotd = await bcryptsjs.compare(req.body.password, passwordDB);

        if (matchPasswotd === false) {
            return res.send("400");
        }

        //now remove Password from User get from query as follows   
        //since in output of return response.json({...otherDetails}); I am getting collectable values in _doc variable so
        const { password, ...otherDetails } = user._doc;
        //now I have to install a jwt here. first install npm install jsonwebtoken and create jwt via openssl>rand -base64 32 and put it to .env file for privacy. And now create token with sign jwt token with user id and isadmin as
        const token = jwt.sign({ id: user._id }, process.env.JWT);
        //now put this token in a cookie by installing npm install cookie-parser. After this initialize this cookie-parser in index.js as app.use() and send back a cookie in response to browser with created token
        //res.cookie('access_token',token,{expire : 36000 + Date.now(), httpOnly:true}).status(200).json({...otherDetails});
        otherDetails.access_token = token;
        res.cookie('access_token', token, { maxAge: 7 * 24 * 3600 * 1000, httpOnly: true }).status(201).json({ ...otherDetails });

    } catch (error) {
        next(error);
    }

}
export const usersProfileById = async (req, res, next) => {
    try {
        const userProfile = await User.findOne({ _id: req.params.id });
        if (userProfile) {
            res.status(201).json(userProfile);
        }
        else {
            res.status(204).json(`OOps!...No Record Found on this ID ${request.params.id} !!`);
        }
    } catch (error) {
        next(error)
    }

}
export const updateUsersProfileById = async (request, response, next) => {
    try {
        if (request.body.password != '') {
            const salt = bcryptsjs.genSaltSync(10);
            const passhash = bcryptsjs.hashSync(request.body.password, salt);
        }
        let user = {};
        let salt = '';
        let passhash = '';
        if (request.body.password != '') {
            salt = bcryptsjs.genSaltSync(10);
            passhash = bcryptsjs.hashSync(request.body.password, salt);
        }
        if (request.body.password != '') {
            user = {
                name: request.body.name,
                email: request.body.email,
                password: passhash
            };
        }
        else {
            user = {
                name: request.body.name,
                email: request.body.email,
            };
        }
        await User.updateOne({ _id: request.params.id }, user);
        user._id = request.params.id; //adding user id to result
        const token = jwt.sign({ id: user._id }, process.env.JWT);
        const { password, ...updatedUsers } = user; //removing password from user object
        updatedUsers.access_token = token; //adding access token to updated user's data
        response.status(201).json(updatedUsers);
    } catch (error) {
        next(error);
    }
}

export const deleteUsers = async (request, response, next) => {
    try {
        const res = await User.deleteOne({ _id: request.params.id });

        response.status(201).json("User deleted Successfully!asas");
    } catch (error) {
        next(error);
    }
}
export const logout = async (request, response, next) => {
    const token = request.cookies.access_token;
    try {
        if (token) {
            response.clearCookie('access_token');
            response.status(201).json('User Log out successfully!!');
        }
        else {
            response.status(208).json('User already Logged out successfully!!');
        }
    } catch (error) {
        // response.status(404).json({ message: error.message })
        next(error);
    }
}
//////users section of api ends

//////students section of api starts
export const createStudents = async (req, res, next) => {
    const email = await Student.findOne({ email: req.body.email });
    if (email) {
        return res.send("409");
    }
    const requestBody = req.body;
    try {
        const user = {
            name: requestBody.name,
            occupation: requestBody.occupation,
            email: requestBody.email,
            phone: requestBody.phone,
            description: requestBody.description,
            age: requestBody.age,
            gender: requestBody.gender
        };
        const newUser = new Student(user);
        await newUser.save();
        res.status(201).json(newUser);   ////if data saved properly then code 201
    } catch (error) {
        // res.status(409).json({message:error.message}); ////if data saved fails  then code 409
        next(error);
    }

}
export const getStudents = async (request, response, next) => {
    try {
        const students = await Student.find();
        response.status(201).json(students);
    } catch (error) {
        res.status(409).json({ message: error.message });
        next(error);
    }
}
export const getStudentById = async (request, response, next) => {
    try {
        const students = await Student.findOne({ _id: request.params.id });
        if (students)
            response.status(201).json(students);
        else {
            response.status(204).json(`OOps!...No Record Found on this ID ${request.params.id} !!`);
        }
    } catch (error) {
        next(error);
    }
}
export const updateStudentById = async (request, response, next) => {
    try {
        const requestBody = request.body;

        let student = {};
        student = {
            name: requestBody.name,
            occupation: requestBody.occupation,
            email: requestBody.email,
            phone: requestBody.phone,
            age: requestBody.age,
            gender: requestBody.gender,
            description: requestBody.description
        };
        await Student.updateOne({ _id: request.params.id }, student);
        response.status(201).json(student);
    } catch (error) {
        next(error);
    }
}
export const deleteStudentById = async (request, response, next) => {
    try {
        const res = await Student.deleteOne({ _id: request.params.id });
        response.status(201).json("Student deleted Successfully!!");
    } catch (error) {
        next(error);
    }
}
export const searchStudentRecordsNav = async (request, response, next) => {
    try {
        const students = await Student.find({
            $or: [{ name: { $regex: '.*' + request.body.searchValue + '.*', $options: 'i' } },
            { email: { $regex: '.*' + request.body.searchValue + '.*', $options: 'i' } }
            ]
        });
        response.status(201).json(students);
    } catch (error) {
        response.status(404).json({ message: error.message })
        next(error);
    }
}
//////students section of api ends


