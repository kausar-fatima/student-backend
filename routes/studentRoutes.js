import express from "express";
import multer from "multer";
import {
    createStudent,
    getStudents,
    updateStudent,
    deleteStudent,
} from "../controllers/studentController.js";

const router = express.Router();

const upload = multer({ dest: "uploads/" });

router.post("/", upload.single("picture"), createStudent);
router.get("/", getStudents);
router.put("/:id", upload.single("picture"), updateStudent);
router.delete("/:id", deleteStudent);

export default router;