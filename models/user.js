import mongoose from "mongoose"
import encrypt from "mongoose-encryption"
import passportLocalMongoose from "passport-local-mongoose"
import findOrCreate from "mongoose-findorcreate"
import {config} from "dotenv"

config()
const schema = new mongoose.Schema({
    fname: {
        type: String,
        trim: true
    },
    username:{
        type: String,
        trim: true,
    },
    password: {
        type: String,
    },
    googleId: String
})
schema.plugin(encrypt, {secret: process.env.SECRET, excludeFromEncryption: ['password', 'salt', 'hash', 'googleId', 'username']});
schema.plugin(passportLocalMongoose);
schema.plugin(findOrCreate);
export default new mongoose.model("user", schema)