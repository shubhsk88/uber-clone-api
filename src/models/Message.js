import mongoose, { Schema } from 'mongoose';
import { USER, MESSAGE, CHAT } from '../constants';

let messageSchema = new Schema(
  {
    text: {
      type: String,
    },
    user: {
      type: Schema.Types.ObjectId,

      ref: USER,
    },
    chat: {
      type: Schema.Types.ObjectId,
      ref: CHAT,
    },
  },
  { timestamps: true }
);

const Message = mongoose.model(MESSAGE, messageSchema);
export default Message;
