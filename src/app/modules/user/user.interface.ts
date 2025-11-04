// models/User.ts
import { Schema, model, Document } from 'mongoose';
import bcrypt from 'bcryptjs';

export type TuserRole = 'user' | 'admin';

export interface ILoginUser {
  email: string;
  password: string;
}

export interface IUser extends Document {
  username: string;
  email: string;
  password: string;
  picture?: string;
  role: 'user' | 'moderator' | 'admin';
  // profile: {
  //   bio?: string;
  //   website?: string;
  //   location?: string;
  //   socialLinks: {
  //     twitter?: string;
  //     github?: string;
  //     linkedin?: string;
  //   };
  // };
  // preferences: {
  //   emailNotifications: boolean;
  //   pushNotifications: boolean;
  //   theme: 'light' | 'dark' | 'auto';
  // };
  // stats: {
  //   threadCount: number;
  //   postCount: number;
  //   reputation: number;
  //   joinedAt: Date;
  //   lastActive: Date;
  // };
  // isActive: boolean;
  // isVerified: boolean;
  createdAt: Date;
  updatedAt: Date;

  // comparePassword(candidatePassword: string): Promise<boolean>;
}

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
    // profile: {
    //   bio: {
    //     type: String,
    //     maxlength: [500, 'Bio cannot exceed 500 characters'],
    //     default: '',
    //   },
    //   website: String,
    //   location: String,
    //   socialLinks: {
    //     twitter: String,
    //     github: String,
    //     linkedin: String,
    //   },
    // },
    // preferences: {
    //   emailNotifications: { type: Boolean, default: true },
    //   pushNotifications: { type: Boolean, default: true },
    //   theme: { type: String, enum: ['light', 'dark', 'auto'], default: 'auto' },
    // },
    // stats: {
    //   threadCount: { type: Number, default: 0 },
    //   postCount: { type: Number, default: 0 },
    //   reputation: { type: Number, default: 0 },
    //   joinedAt: { type: Date, default: Date.now },
    //   lastActive: { type: Date, default: Date.now },
    // },
    // isActive: { type: Boolean, default: true },
    // isVerified: { type: Boolean, default: false },
  },
  {
    timestamps: true,
  },
);

// Indexes for better query performance
// userSchema.index({ email: 1 });
// userSchema.index({ username: 1 });
// userSchema.index({ 'stats.reputation': -1 });
// userSchema.index({ 'stats.lastActive': -1 });

// Password hashing middleware
// userSchema.pre('save', async function (next) {
//   if (!this.isModified('password')) return next();

//   try {
//     const salt = await bcrypt.genSalt(12);
//     this.password = await bcrypt.hash(this.password, salt);
//     next();
//   } catch (error: any) {
//     next(error);
//   }
// });

// Password comparison method
// userSchema.methods.comparePassword = async function (
//   candidatePassword: string,
// ): Promise<boolean> {
//   return bcrypt.compare(candidatePassword, this.password);
// };

export const User = model<IUser>('User', userSchema);
