import { Request, Response } from 'express';
import mongoose from 'mongoose';

const read = async (userModel: string, req: Request, res: Response) => {
  const User = mongoose.model(userModel);

  // Find document by id
  const tmpResult = await User.findOne({
    _id: req.params.id,
    removed: false,
  }).exec();

  // If no results found, return document not found
  if (!tmpResult) {
    return res.status(404).json({
      success: false,
      result: null,
      message: 'No document found ',
    });
  } else {
    // Return success response
    let result = {
      _id: tmpResult._id,
      enabled: tmpResult.enabled,
      email: tmpResult.email,
      name: tmpResult.name,
      surname: tmpResult.surname,
      photo: tmpResult.photo,
      role: tmpResult.role,
    };

    return res.status(200).json({
      success: true,
      result,
      message: 'we found this document ',
    });
  }
};

export default read;
