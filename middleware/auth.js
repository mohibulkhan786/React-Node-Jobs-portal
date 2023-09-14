import jwt from 'jsonwebtoken';
import { UnAuthenticatedError } from '../errors/index.js';

UnAuthenticatedError;
const auth = async (req, res, next) => {
  console.log(req.cookies);

  // const authHeader = req.headers.authorization;
  // if (!authHeader || !authHeader.startsWith('Bearer')) {
  //   throw new UnAuthenticatedError('Authentication Invalid');
  // }
  // const token = authHeader.split(' ')[1];

  const token = req.cookies.token;
  if (!token) {
    throw new UnAuthenticatedError('Authentication Invalid');
  }
  // rest of the code

  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET);
    
    // TEST USER
    const testUser = payload.userId === '64f436d3d9756b873bfc1dfd';
    req.user = { userId: payload.userId, testUser };
    // TEST USER
    next();
  } catch (error) {
    throw new UnAuthenticatedError('Authentication Invalid');
  }
};

export default auth;