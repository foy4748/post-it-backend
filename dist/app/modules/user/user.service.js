"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SloginUser = exports.ScreateUser = void 0;
// import { JwtPayload } from 'jsonwebtoken';
const AppError_1 = __importDefault(require("../../error/AppError"));
const user_model_1 = __importDefault(require("./user.model"));
const bcryptjs_1 = __importDefault(require("bcryptjs"));
// import config from '../../config';
// import moment from 'moment';
const ScreateUser = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    //payload.passwordHistory = [String(payload.password)];
    const response = yield user_model_1.default.create(payload);
    return response.toObject();
});
exports.ScreateUser = ScreateUser;
const SloginUser = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = payload;
    const currentUser = yield user_model_1.default.findOne({ email });
    if (!currentUser) {
        throw new AppError_1.default(404, `User doesn't exists with email ${email}`);
    }
    const isPasswordMatched = yield bcryptjs_1.default.compare(String(password), String(currentUser === null || currentUser === void 0 ? void 0 : currentUser.password));
    if (!isPasswordMatched) {
        throw new AppError_1.default(403, `Invalid Access`);
    }
    return currentUser.toObject();
});
exports.SloginUser = SloginUser;
//export const SchangeUserPassword = async (
//  payload: JwtPayload,
//  passwordReplacement: TPasswordReplacement,
//) => {
//  const { _id: userId } = payload;
//  const currentUser = await User.findById(userId);
//  //console.log(currentUser);
//  const isPasswordMatched = await bcrypt.compare(
//    String(passwordReplacement.currentPassword),
//    String(currentUser?.password),
//  );
//  const errorString = `Password change failed. Ensure the new password is unique and not among the last 2 used (last used on ${moment(
//    currentUser?.updatedAt,
//  ).format('YYYY-MM-DD')} at ${moment(currentUser?.updatedAt).format(
//    'hh:mm A',
//  )}.`;
//  if (!isPasswordMatched) {
//    throw new Error(errorString);
//  }
//  if (passwordReplacement.currentPassword == passwordReplacement.newPassword) {
//    throw new Error(errorString);
//  }
//  for (const oldPassword of currentUser?.passwordHistory as string[]) {
//    const isPasswordMatched = await bcrypt.compare(
//      String(passwordReplacement.newPassword),
//      String(oldPassword),
//    );
//    if (isPasswordMatched) {
//      throw new Error(errorString);
//    }
//  }
//  const newPassword = await bcrypt.hash(
//    passwordReplacement.newPassword as string,
//    Number(config?.bcrypt_salt_rounds),
//  );
//  currentUser?.passwordHistory?.push(String(currentUser?.password));
//  if (Number(currentUser?.passwordHistory?.length) > 2) {
//    currentUser?.passwordHistory?.shift();
//  }
//  const updatedUser = await User.findByIdAndUpdate(
//    userId,
//    {
//      //$addToSet: { passwordHistory: currentUser?.password },
//      $set: {
//        password: newPassword,
//        passwordHistory: currentUser?.passwordHistory,
//      },
//    },
//    { new: true },
//  );
//  return updatedUser?.toObject();
//};
