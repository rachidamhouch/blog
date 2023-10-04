import mongoose from "mongoose"
import encrypt from "mongoose-encryption"
import passportLocalMongoose from "passport-local-mongoose"
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
    },
})
schema.plugin(encrypt, {secret: process.env.SECRET, excludeFromEncryption: ['password', 'salt', 'hash']});
schema.plugin(passportLocalMongoose);
export default new mongoose.model("user", schema)