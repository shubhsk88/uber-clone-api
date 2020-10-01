import mongoose, { Schema } from 'mongoose';
import { USER, MESSAGE, CHAT, RIDE } from '../constants';

const chatSchema = new Schema(
  {
    messages: [{ type: Schema.Types.ObjectId, ref: MESSAGE }],
    passenger: { type: Schema.Types.ObjectId, ref: USER },
    driver: { type: Schema.Types.ObjectId, ref: USER },
    ride: { type: Schema.Types.ObjectId, ref: RIDE, required: true },
  },
  { timestamps: true }
);

const Chat = mongoose.model(CHAT, chatSchema);
export default Chat;
