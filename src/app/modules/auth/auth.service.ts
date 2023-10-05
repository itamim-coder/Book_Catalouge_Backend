import { PrismaClient, User } from '@prisma/client';
import { ILoginUser, ILoginUserResponse } from './auth.interface';
import ApiError from '../../../errors/apiError';
import httpStatus from 'http-status';
import { compare } from 'bcrypt';
import { Secret, sign } from 'jsonwebtoken';
import config from '../../../config';


const prisma = new PrismaClient();


const loginUser = async (data: ILoginUser): Promise<ILoginUserResponse> => {
    const { email, password } = data;
  
    try {
      // Find the user by phoneNumber using Prisma
      const user = await prisma.user.findUnique({
        where: { email },
      });
  
      if (!user) {
        throw new ApiError(httpStatus.NOT_FOUND, 'User does not exist');
      }
  
      if (!user.password) {
        throw new ApiError(httpStatus.UNAUTHORIZED, 'User password not set');
      }
  
      // Compare the provided password with the hashed password in the database
    //   const passwordMatch = await compare(password, user.password);
  
    //   if (!passwordMatch) {
    //     throw new ApiError(httpStatus.UNAUTHORIZED, 'Password is incorrect');
    //   }
  
      // Create access token & refresh token
      const { id: userId, email: userEmail, role } = user;
      const accessToken = sign(
        { userId, userEmail, role },
        config.jwt.secret as Secret,
        { expiresIn: '3h' }
      );
  
      const refreshToken = sign(
        { userId, userEmail, role },
        config.jwt.secret as Secret,
        { expiresIn: '7d' } // Set an expiration time for the refresh token
      );
  
      return {
        accessToken,
        refreshToken,
      };
    } catch (error) {
      throw error;
    } finally {
      await prisma.$disconnect();
    }
  };

  export const AuthService = {
    loginUser
  }