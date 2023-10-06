import { PrismaClient, User } from '@prisma/client';
import { ILoginUser, ILoginUserResponse, IRefreshTokenResponse } from './auth.interface';
import ApiError from '../../../errors/apiError';
import httpStatus from 'http-status';
import { compare } from 'bcrypt';
import { Secret, sign } from 'jsonwebtoken';
import config from '../../../config';
import { JwtHelper } from '../../../helpers/jwtHelper';

const prisma = new PrismaClient();

const loginUser = async (data: ILoginUser): Promise<ILoginUserResponse> => {
  const { email, password } = data;

  try {
    // Find the user by phoneNumber using Prisma
    const user = await prisma.user.findUnique({
      where: { email }
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
    const accessToken = sign({ userId, userEmail, role }, config.jwt.secret as Secret, {
      expiresIn: '365d'
    });

    const refreshToken = sign(
      { userId, userEmail, role },
      config.jwt.secret as Secret,
      { expiresIn: '365d' } // Set an expiration time for the refresh token
    );

    return {
      accessToken,
      refreshToken
    };
  } catch (error) {
    throw error;
  } finally {
    await prisma.$disconnect();
  }
};
// const refreshToken = async (token: string): Promise<IRefreshTokenResponse> => {
//   //verify token
//   // invalid token - synchronous
//   let verifiedToken = null;
//   try {
//     verifiedToken = JwtHelper.verifyToken(
//       token,

//     );
//   } catch (err) {
//     throw new ApiError(httpStatus.FORBIDDEN, 'Invalid Refresh Token');
//   }

//   const { userId } = verifiedToken;

//   // tumi delete hye gso  kintu tumar refresh token ase
//   // checking deleted user's refresh token

//   const isUserExist = await prisma.user.findUnique({
//     where: {
//       id: userId,
//     },
//   });
//   if (!isUserExist) {
//     throw new ApiError(httpStatus.NOT_FOUND, 'User does not exist');
//   }
//   //generate new token

//   const newAccessToken = JwtHelper.createToken(
//     {
//       id: isUserExist.id,
//       role: isUserExist.role,
//     },
//     config.jwt.secret as Secret,
//     config.jwt.secret as string
//   );

//   return {
//     accessToken: newAccessToken,
//   };
// };

export const AuthService = {
  loginUser
};
