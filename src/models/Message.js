import mongoose, { Schema } from 'mongoose';

let messageSchema = new Schema(
  {
    text: {
      type: String,
      required: true,
    },
    user: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: 'User',
    },
    chat: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: 'Chat',
    },
  },
  { timestamps: true }
);

const Message = mongoose.model('Message', messageSchema);
export default Message;
