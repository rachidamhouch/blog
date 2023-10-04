import mongoose from "mongoose"
import encrypt from "mongoose-encryption"
import {config} from "dotenv"

config()
const schema = new mongoose.Schema({
    msg: {
        type: String,
        required: true,
        trim: true
    },
    uid:
    {
        type: String,
        required: true,
        trim: true
    }
})
schema.plugin(encrypt, {secret: process.env.SECRET, excludeFromEncryption: []});
export default new mongoose.model("secret", schema)