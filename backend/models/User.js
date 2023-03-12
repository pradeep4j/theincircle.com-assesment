import mongoose from 'mongoose';

const userSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
    required: true,
    minlength: 3,
    maxlength: 50
  },
  email: {
    type: String,
    trim: true,
    required: true,
    minlength: 8,
    maxlength: 100,
    unique: true
  },
  password: {
    type: String,
    required: true,
    trim: true,
    required: [true, 'Please add a Password'],
    minlength: [8, 'password must have at least six(8) characters'],
    minlength: [20, 'password must have at least six(8) characters'],
  }
},
  { timestamps: true }
);
const User = mongoose.model('User', userSchema);
export default User;