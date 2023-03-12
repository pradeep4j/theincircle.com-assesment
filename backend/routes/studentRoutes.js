import express from "express";
import { getStudents, createStudents, getStudentById, updateStudentById, deleteStudentById, searchStudentRecordsNav } from '../controllers/Posts.js';
const router = express.Router();

router.route('/students').get(getStudents);
router.route('/add-student').post(createStudents);
router.route('/edit-student/:id').get(getStudentById);
router.route('/searchStudentRecords').post(searchStudentRecordsNav);
router.route('/studentUpdate/:id').put(updateStudentById);
router.route('/deleteStudent/:id').delete(deleteStudentById);

export default router;
