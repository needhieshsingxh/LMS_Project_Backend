import jwt from "jsonwebtoken";


export const generateToken = (req, user, message) =>{
    const token = jwt.sign({userId: user._id}, process.env.SECRET_KEY, {
        expiresIn: "1d"
    })

    return res
    .staus(200)
    .cookie("token", token,{httpOnly: true,
                            sameSites: "strict",
                            maxAge: 24 * 60 * 60 * 1000}).
                            json({
        success: true,
        message,
        user,
        token,
    })

}

