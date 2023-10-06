import { RequestHandler } from 'express';
import { ProfileService } from './profile.service';
import sendResponse from '../../../shared/response';
import httpStatus from 'http-status';
const getProfile: RequestHandler = async (req, res, next) => {
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
  } catch (err) {
    next(err);
  }
};

export const ProfileController = {
  getProfile
};
