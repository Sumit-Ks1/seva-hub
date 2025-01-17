import mongoose, {Schema} from "mongoose";
import jwt from "jsonwebtoken"
import bcrypt from "bcrypt"

const organisationSchema = new Schema(
    {
        name: {
            type: String,
            required: [true, "Name is required"],
            trim: true,
            index: true
        },
        email: {
            type: String,
            required: [true, "Email is required"],
            unique: true,
            lowecase: true,
            trim: true, 
        },
        // leader_mail: {
        //     type: String,
        //     required: true,
        //     unique: true,
        //     lowecase: true,
        //     trim: true, 
        // },
        started_at: {
            type: Date,
            required: false,
        },
        description: {
            type: String,
            required: false,
            trim: true,
            default: "",
        },
        members: [
            {
                type: String,
                // ref: "User"
            }
        ],
        docs: [
            {
                type: String,
                required: false,
            }
        ],
        rating: {
            type: Number,
            required: false,
            default: 2.5,
        },
        password: {
            type: String,
            required: [true, 'Password is required']
        },
    },
    {
        timestamps: true
    }
)

organisationSchema.pre("save", async function (next) {
    if (!this.isModified("password")) return next();

    this.password =await bcrypt.hash(this.password, 10)
    next()
})



organisationSchema.methods.isPasswordCorrect = async function (password) {

  return await bcrypt.compare(password, this.password);
};

organisationSchema.methods.generateAccessToken = function () {
    return jwt.sign(
        {
            _id: this._id,
            email: this.email,
            username: this.username,
            fullName: this.fullName
        },
        process.env.ACCESS_TOKEN_SECRET,
        {
            expiresIn: process.env.ACCESS_TOKEN_EXPIRY
        }
    )
}
organisationSchema.methods.generateRefreshToken = function () {
    return jwt.sign(
        {
            _id: this._id,

        },
        process.env.REFRESH_TOKEN_SECRET,
        {
            expiresIn: process.env.REFRESH_TOKEN_EXPIRY
        }
    )
}


export const Organisation = mongoose.model("Organisation", organisationSchema)