import Mailgun from 'mailgun-js';

const mailgunClient = new Mailgun({
  apiKey: process.env.MAILGUN_KEY,
  domain: process.env.MAILGUN_DOMAIN,
});

const sendEmail = (subject, html, to) => {
  const data = {
    from: 'shubham88singh@gmail.com',
    to,
    subject,
    html,
  };
  return mailgunClient.messages().send(data);
};

export const sendVerificationEmail = (key, to, fullName) => {
  const emailSubject = `Please Verify your email Address`;
  const emailBody = `Hi ${fullName}, your verification key is ${key}`;
  return sendEmail(emailSubject, emailBody);
};
