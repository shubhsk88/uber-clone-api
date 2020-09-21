import jwt from 'jsonwebtoken';
import User from '../models/User';

const decodeJWT = async (token) => {
  try {
    const decoded = jwt.verify(token, process.env.JWT_TOKEN);
    const { id } = decoded;

    const user = await User.findOne({ _id: id });

    return user;
  } catch (error) {
    return undefined;
  }
};

export default decodeJWT;
