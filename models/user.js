import mongoose from "mongoose"

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

export default new mongoose.model("user", schema)