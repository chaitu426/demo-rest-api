import mongoose from "mongoose";

const querySchema = new mongoose.Schema({
  que: {
    type: String,
    required: true,
    trim: true,
  },
  src: {
    type: String,
    required: true,
  },
  ans: {
    type: String,
    required: true,
  }
}, { _id: false }); // Avoid creating separate _id for each subdocument if not needed

const chatSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
    minlength: 3,
    maxlength: 50
  },
  query: {
    type: [querySchema], // Array of question-answer objects
    required: true,
    validate: (v: unknown) => Array.isArray(v) && v.length > 0
  },
  images:{
    type: [String], // Array of image URLs
    required: false,
    validate: (v: unknown) => Array.isArray(v)
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
}, { timestamps: true });

const Chat = mongoose.model('Chat', chatSchema);
export default Chat;
