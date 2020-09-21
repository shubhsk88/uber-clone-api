import jwt from 'jsonwebtoken';
console.log(process.env.JWT_TOKEN);
const createJWT = (id) => {
  const token = jwt.sign({ id }, process.env.JWT_TOKEN);
  return token;
};

export default createJWT;
