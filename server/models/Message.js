const mongoose = require('mongoose');
const MessagesSchema =  new mongoose.Schema({
    content : String,
    from : Object, 
    socketid : String,
    time : String, 
    date : String,
    to : String
})

const Message = mongoose.model('Message',MessagesSchema);
module.exports = Message;