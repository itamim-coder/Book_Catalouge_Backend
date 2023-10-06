import { PrismaClient } from '@prisma/client';
import jwt, { JwtPayload } from 'jsonwebtoken';
import config from '../../../config';

const prisma = new PrismaClient();

const getProfile = async (token: string) => {
  const decodedToken: JwtPayload | string = jwt.verify(token, config.jwt.secret);

  if (typeof decodedToken === 'string') {
    // Handle the case where decodedToken is a string (e.g., an error occurred during token verification)
    throw new Error('Invalid token');
  }

  // Assuming the token contains user information like userId and role
  const userId = decodedToken.userId;
  const result = await prisma.user.findUnique({
    where: {
      id: userId
    },
    select: {
      id: true,
      name: true,
      email: true,
      role: true,
      contactNo: true,
      address: true,
      profileImg: true
    }
  });
  return result;
};

export const ProfileService = {
  getProfile
};
