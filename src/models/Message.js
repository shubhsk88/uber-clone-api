import mongoose, { Schema } from 'mongoose';
import { USER, MESSAGE, CHAT } from '../constants';

let messageSchema = new Schema(
  {
    text: {
      type: String,
      required: true,
    },
    user: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: USER,
    },
    chat: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: CHAT,
    },
  },
  { timestamps: true }
);

const Message = mongoose.model(MESSAGE, messageSchema);
export default Message;
