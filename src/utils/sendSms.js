import Twilio from 'twilio';

const accountSid = process.env.TWILIO_SID;
const authToken = process.env.TWILIO_TOKEN;

const twilioClient = Twilio(accountSid, authToken);

export const sendSMS = (to, body) => {
  return twilioClient.messages.create({
    to,
    body,
    from: process.env.TWILIO_PHONE,
  });
};

export const sendVerificationSMS = (to, key) =>
  sendSMS(to, `Your verification key is ${key}`);
