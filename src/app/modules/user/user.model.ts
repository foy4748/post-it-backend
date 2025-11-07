import { Schema, model } from 'mongoose';
import { IUser } from './user.interface';
import config from '../../config';
import bcrypt from 'bcryptjs';

// const userSchema = new Schema<IUser>(
//   {
//     username: { type: String, required: true, unique: true },
//     email: { type: String, required: true, unique: true },
//     password: { type: String, required: true },
//     role: { type: String, default: 'user', enum: ['user', 'admin'] },
//     passwordHistory: { type: [String] },
//   },
//   {
//     versionKey: false,
//     timestamps: true,
//   },
// );
const userSchema = new Schema<IUser>(
  {
    username: {
      type: String,
      required: [true, 'Username is required'],
      unique: true,
      trim: true,
      minlength: [3, 'Username must be at least 3 characters'],
      maxlength: [30, 'Username cannot exceed 30 characters'],
    },
    email: {
      type: String,
      required: [true, 'Email is required'],
      unique: true,
      trim: true,
      lowercase: true,
      match: [
        /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/,
        'Please enter a valid email',
      ],
    },
    password: {
      type: String,
      required: [true, 'Password is required'],
      minlength: [6, 'Password must be at least 6 characters'],
    },
    picture: {
      type: String,
      default: null,
    },
    role: {
      type: String,
      enum: ['user', 'moderator', 'admin'],
      default: 'user',
    },
  },
  {
    timestamps: true,
  },
);
// ----------------------------------- Defining Mongoose Middlewares -----------------------------------

// Hashing Password | During User CREATION
userSchema.pre('save', async function (next) {
  this.password = await bcrypt.hash(
    this.password as string,
    Number(config?.bcrypt_salt_rounds),
  );
  //this.passwordHistory = [this.password];
  next();
});

// Discarding Password and unnecessary fields | During User FIND
userSchema.pre('find', function (next) {
  this.projection({
    password: 0,
    passwordHistory: 0,
    createdAt: 0,
    updatedAt: 0,
  });
  next();
});

// -----------------------------
const User = model<IUser>('User', userSchema);

export default User;
