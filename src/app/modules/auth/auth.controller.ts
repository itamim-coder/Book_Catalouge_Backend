import { Request, RequestHandler, Response } from 'express';
import { AuthService } from './auth.service';
import config from '../../../config';
import sendResponse from '../../../shared/response';
import { ILoginUserResponse, IRefreshTokenResponse } from './auth.interface';
import catchAsync from '../../../shared/catchAsync';

const loginUser = catchAsync(async (req: Request, res: Response) => {
  try {
    const { ...loginData } = req.body;
    console.log(loginData);
    const result = await AuthService.loginUser(loginData);
    const { refreshToken, ...others } = result;

    // set refresh token into cookie
    const cookieOptions = {
      secure: config.env === 'production',
      httpOnly: true
    };
    console.log(req);
    res.cookie('refreshToken', refreshToken, cookieOptions);

    sendResponse<ILoginUserResponse>(res, {
      statusCode: 200,
      success: true,
      message: 'User logged in successfully !',
      data: others
    });
  } catch (err) {
    // next(err);
  }
});
// const refreshToken = catchAsync(async (req: Request, res: Response) => {
//   const { refreshToken } = req.cookies;

//   const result = await AuthService.refreshToken(refreshToken);

//   // set refresh token into cookie

//   const cookieOptions = {
//     secure: config.env === 'production',
//     httpOnly: true,
//   };

//   res.cookie('refreshToken', refreshToken, cookieOptions);

//   sendResponse<IRefreshTokenResponse>(res, {
//     statusCode: 200,
//     success: true,
//     message: 'User log in successfully !',
//     data: result,
//   });
// });

export const AuthController = {
  loginUser
};
