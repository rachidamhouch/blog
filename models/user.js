import mongoose from "mongoose"
import encrypt from "mongoose-encryption"
import {config} from "dotenv"


config()
const schema = new mongoose.Schema({
    fname: {
        type: String,
        required: true,
        trim: true
    },
    username:{
        type: String,
        required: true,
        trim: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
    }
})
schema.plugin(encrypt, {secret: process.env.SECRET});
export default new mongoose.model("user", schema)