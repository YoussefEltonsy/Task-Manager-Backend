import { getProfile, updateProfile, deleteProfile } from '../controllers/userController.js'
import express from 'express'

const router = express.Router();

router.get('/profile', protect, getProfile)
router.patch('/profile', protect, updateProfile)
router.delete('/profile', protect, deleteProfile)

export default router;