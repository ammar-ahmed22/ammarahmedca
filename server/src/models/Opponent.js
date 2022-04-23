import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import crypto from "crypto";
import { runInThisContext } from "vm";

const OpponentSchema = new mongoose.Schema({
    name: {
        first: { type: String, required: true },
        last: { type: String, required: true },
        middle: String
    },
    email: {type: String, required: [true, "Please provide an e-mail"], unique: true, match: [/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/, "Please provide a valid e-mail"]},
    password: {type: String, required: [true, "Please provide a password"], minlength: 6, select: false},
    signedupAt: { type: Date, required: true},
    permissions: Array,
    currentGameID: String,
    resetPasswordExpire: Date,
    resetPasswordToken: String,
    gameHistory: [{ gameID: String, won: Boolean, tie: Boolean}],
    allGameIDs: Array
}, { timestamps: true })

// Called before saved to DB
// Checks if password was modified and hashes it 
OpponentSchema.pre("save", async function (next){
    if (!this.isModified("password")){
        next();
    }

    const salt = await bcrypt.genSalt(10);

    this.password = await bcrypt.hash(this.password, salt);

})

// Checks password on login
OpponentSchema.methods.matchPasswords = async function(password){
    return await bcrypt.compare(password, this.password);
}

// Provides signed JWT
OpponentSchema.methods.getSignedJWT = function(){
    return jwt.sign({ id: this._id, permissions: this.permissions }, process.env.JWT_SECRET)
}

// Creates reset token and expiry date
OpponentSchema.methods.getResetPasswordToken = function(){
    const resetToken = crypto.randomBytes(20).toString("hex");
    this.resetPasswordToken = crypto.crypto.createHash("sha256").update(resetToken).digest("hex");
    this.resetPasswordExpire = Date.now() + 10 * (60 * 1000) // 10 mins

}

const Opponent = mongoose.model("Opponent", OpponentSchema);

export default Opponent;