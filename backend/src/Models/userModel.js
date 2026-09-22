// user schema 
import mongoose from "mongoose";
import bcrypt from "bcrypt";
import validator from "validator";
import crypto from "node:crypto";
import { kMaxLength } from "node:buffer";

const userSchema = new mongoose.Schema({
    name: {
        type: String, 
        required: [true, "Please enter your name"],
        trim: true,
        maxLength: [100, "Name cannot exceed 100 characters"]
    },
    email: {
        type: String,
        required: [true, "Please enter your email"],    
        unique: true,
        lowercase: true,
        validate: [validator.isEmail, "Please enter a valid email"]
    },
    password: {
        type: String,
        required: [true, "Please enter your password"], 
        minLength: [8, "Password must be at least 8 characters long"],
        select: false
    },
    passwordConfirm: {
        type: String,
        required: [true, "Please confirm your password"],  
        validate: {
            validator: function(el) {
                return el === this.password; 
    },
        message: "Passwords do not match"
}},
    phoneNumber: {
        type: String,
        required: [true, "Please enter your phone number"],
        trim: true
    },
    role: {
        type: String,
        enum: ["user", "admin"],
        default: "user"
    },
    avatar: {
        url: {type: String},
            public_id: {type: String}
                
            },
    passwordChangedAt: {type: Date},
    passwordResetToken: {type: String,
                select: false,
                index: true,
            },
    passwordResetExpires: {type: Date,select: false},
 },
 {timestamps: true}
)
//setting up a pre-save middleware to hash the password before saving it to the database
userSchema.set("toJSON", {
    transform: function(doc, ret) { 
        delete ret.password;
        delete ret.passwordConfirm;
        delete ret.passwordResetToken;
        delete ret.passwordResetExpires;
        delete ret.__v;
        return ret;
    }
})
 
//pre-save middleware to hash the password before saving it to the database
userSchema.pre("save", async function() {
    if (!this.isModified("password")) return;
    this.password = await bcrypt.hash(this.password, 12);
    this.passwordConfirm = undefined;
})

//logic check 
userSchema.methods.correctPassword = async function(candidatePassword, userPassword) {
    return await bcrypt.compare(candidatePassword, userPassword);
}   
//method to check if the password was changed after the token was issued
userSchema.methods.changedPasswordAfter = function(JWTTimestamp) {
    if (this.passwordChangedAt) {
        const changedTimestamp = this.passwordChangedAt.getTime() / 1000;
        return JWTTimestamp < changedTimestamp;
    }
    return false;
}
//method to create a password reset token
userSchema.methods.createPasswordResetToken = function() {
    const resetToken = crypto.randomBytes(32).toString("hex");  
    this.passwordResetToken = crypto.createHash("sha256").update(resetToken).digest("hex");
    this.passwordResetExpires = Date.now() + 10 * 60 * 1000;    
    return resetToken;
}

const User = mongoose.model("User", userSchema);
export {User}; 