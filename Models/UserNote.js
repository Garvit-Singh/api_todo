const mongoose = require('mongoose');

const note = mongoose.Schema({
    id: Number,
    title: String,
    discription: String
})

const UserNoteSchema = mongoose.Schema({
    user: { type: String ,required: true},
    _id: mongoose.Schema.Types.ObjectId,
    password: { type: String ,required: true},
    email: { type: String ,required: true,unique: true,match:  /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/},
    notes: [note]
})

module.exports = mongoose.model('UserNote',UserNoteSchema);