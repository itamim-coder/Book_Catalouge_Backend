import { RequestHandler } from 'express';
import { AuthService } from './auth.service';
import config from '../../../config';
import sendResponse from '../../../shared/response';
import { ILoginUserResponse } from './auth.interface';

const loginUser: RequestHandler = async (req, res, next) => {
  try {
    const { ...loginData } = req.body
    console.log(loginData)
    const result = await AuthService.loginUser(loginData);
    const { refreshToken, ...others } = result;

    // set refresh token into cookie
    const cookieOptions = {
      secure: config.env === 'production',
      httpOnly: true
    };

    res.cookie('refreshToken', refreshToken, cookieOptions);

    sendResponse<ILoginUserResponse>(res, {
      statusCode: 200,
      success: true,
      message: 'User logged in successfully !',
      data: others
    });
  } catch (err) {
    next(err);
  }
};

export const AuthController = {
  loginUser
};
