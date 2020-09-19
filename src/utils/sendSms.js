import Twilio from 'twilio';

const twilioClient = Twilio({
  accountSid: process.env.TWILIO_SID,
  authToken: TWILIO_TOKEN,
});

export const sendSMS = (to, body) => {
  return twilioClient.messages.create({
    to,
    body,
    from: process.env.TWILIO.PHONE,
  });
};

export const sendVerificationSMS = (to, key) =>
  sendSMS(to, (body = `Your verification key is ${key}`));
