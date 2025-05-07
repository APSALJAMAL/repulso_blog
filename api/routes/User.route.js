import express from 'express'
import { deleteUser, getAllUser, getUser, updateUser, updateUserRole } from '../controllers/User.controller.js'
import upload from '../config/multer.js'
import { authenticate } from '../middleware/authenticate.js'

const UserRoute = express.Router()

UserRoute.use(authenticate)

UserRoute.get('/get-user/:userid', getUser)
UserRoute.put('/update-user/:userid', upload.single('file'), updateUser)
UserRoute.get('/get-all-user', getAllUser)
UserRoute.delete('/delete/:id', deleteUser)
UserRoute.patch('/update-role/:id',  updateUserRole);




export default UserRoute