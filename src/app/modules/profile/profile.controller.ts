import { Request, RequestHandler, Response } from 'express';
import { ProfileService } from './profile.service';
import sendResponse from '../../../shared/response';
import httpStatus from 'http-status';
import catchAsync from '../../../shared/catchAsync';
const getProfile = catchAsync(async (req: Request, res: Response) => {
  try {
    const token = req.headers.authorization;
    if (!token) {
      return res.status(401).json({
        success: false,
        statusCode: 401,
        message: 'Token is required for this operation'
      });
    }
    const result = await ProfileService.getProfile(token);
    sendResponse<any>(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Profile Retrieved successfully !',
      data: result
    });
  } catch (err) {}
});

export const ProfileController = {
  getProfile
};
