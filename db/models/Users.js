const mongoose = require('mongoose');
const connection = require('../connection');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    cid: String,
    gender: String,
    age: String
});

const User = mongoose.model('user', userSchema);
module.exports = User;