import cloudinary from "../config/cloudinary.js"
import { handleError } from "../helpers/handleError.js"
import User from "../models/user.model.js"
import bcryptjs from 'bcryptjs'

export const getUser = async (req, res, next) => {
    try {
        const { userid } = req.params
        const user = await User.findOne({ _id: userid }).lean().exec()
        if (!user) {
            next(handleError(404, 'User not found.'))
        }
        res.status(200).json({
            success: true,
            message: 'User data found.',
            user
        })
    } catch (error) {
        next(handleError(500, error.message))
    }
}


export const updateUser = async (req, res, next) => {
    try {
        const data = JSON.parse(req.body.data)
        const { userid } = req.params

        const user = await User.findById(userid)
        user.name = data.name
        user.email = data.email
        user.bio = data.bio

        if (data.password && data.password.length >= 8) {
            const hashedPassword = bcryptjs.hashSync(data.password)
            user.password = hashedPassword
        }

        if (req.file) {
            // Upload an image
            const uploadResult = await cloudinary.uploader
                .upload(
                    req.file.path,
                    { folder: 'yt-mern-blog', resource_type: 'auto' }
                )
                .catch((error) => {
                    next(handleError(500, error.message))
                });

            user.avatar = uploadResult.secure_url
        }

        await user.save()

        const newUser = user.toObject({ getters: true })
        delete newUser.password
        res.status(200).json({
            success: true,
            message: 'Data updated.',
            user: newUser
        })
    } catch (error) {
        next(handleError(500, error.message))
    }
}


export const getAllUser = async (req, res, next) => {
    try {
        const user = await User.find().sort({ createdAt: -1 })
        res.status(200).json({
            success: true,
            user
        })
    } catch (error) {
        next(handleError(500, error.message))
    }
}
export const deleteUser = async (req, res, next) => {
    try {
        const { id } = req.params
        const user = await User.findByIdAndDelete(id)
        res.status(200).json({
            success: true,
            message: 'Data deleted.'
        })
    } catch (error) {
        next(handleError(500, error.message))
    }
}



export const updateUserRole = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { role } = req.body;

    if (!['user', 'admin', 'owner'].includes(role)) {
      return res.status(400).json({ message: 'Invalid role specified.' });
    }

    const user = await User.findByIdAndUpdate(id, { role }, { new: true });

    if (!user) {
      return res.status(404).json({ message: 'User not found.' });
    }

    res.status(200).json({ message: 'Role updated successfully.', user });
  } catch (error) {
    next(error);
  }
};
