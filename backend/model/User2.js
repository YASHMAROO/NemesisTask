const mongoose=require('mongoose');
const Schema=mongoose.Schema;

const userDetailsSchema= new Schema({
    username: { type: String, required: true },
    number: { type: String, required: true },
    email: { type: String, unique: true, required: true },
    address: { type: String, required: true }
})

module.exports = mongoose.model("details", userDetailsSchema);