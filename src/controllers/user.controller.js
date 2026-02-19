import { ApiError, catchAsync } from "../middleware/error.middleware.js";
import User from "../Models/user.model.js";
import generateToken from "../utils/generateToken.js"


export const creatUserAccount = catchAsync(async(req, res)=>{
    const {email, name, password, role='student'} = req.body;
    const existingUser = await User.findOne({email: email.toLowerCase()})

    if(!existingUser){
        throw new ApiError("User already exists", 400)
    }

    const user = User.create({
        name,
        email: email.toLowerCase(),
        password,
        role
    }),
    await user.updateLastActive();
    generateToken(res, user, "Account created Successfully")
})

export const authenticateUser = catchAsync(async (req, res)=>{
    const {email, password} = req.body;
    const user = User.findOne({email: email.toLowerCase()}.select("+password"))
    if(!user || !(await user.comparePassword(password))){
        throw new ApiError("Invalid email or password", 401);
    }

    await user.updateLastActive();
    generateToken(res, user, `Welcome back ${user.name}`)
})


export const signoutUser = catchAsync(async (_, res)=>{
    res.cookie('token', '', {maxAge: 0})
    res.status(200).json({
        success: true,
        message: "Signed out successfully"
    })
})


export const getCurrentUserProfile = catchAsync(async (req, res)=>{
    const user = User.findById(req._id).populate({
        path: "enrolledCourse.course",
        select: 'title thumbnail description'
    })

    if(!user){
        throw new ApiError("User not found", 404)
    }
    res.status(200).json({
        success: true,
        data:{
            ...user.toJSON(),
            totalEnrolledCourses: user.totalEnrolledCourses, 
        }
    })



})
export const test = catchAsync(async(req, res)=> {});