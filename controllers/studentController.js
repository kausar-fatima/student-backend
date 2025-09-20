import Student from "../models/Student.js";
import fs from "fs";

// CREATE student
export const createStudent = async (req, res) => {
  try {
    let base64Image = null;

    if (req.file) {
      const file = fs.readFileSync(req.file.path);
      base64Image = file.toString("base64");
    }

    const student = new Student({
      name: req.body.name,
      age: req.body.age,
      picture: base64Image,
    });

    await student.save();
    res.status(201).json(student);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// READ all students
export const getStudents = async (req, res) => {
  try {
    const students = await Student.find();
    res.json(students);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// UPDATE student
export const updateStudent = async (req, res) => {
  try {
    let base64Image = null;

    if (req.file) {
      const file = fs.readFileSync(req.file.path);
      base64Image = file.toString("base64");
    }

    const updateData = {
      name: req.body.name,
      age: req.body.age,
      ...(base64Image && { picture: base64Image }),
    };

    const student = await Student.findByIdAndUpdate(req.params.id, updateData, {
      new: true,
    });
    res.json(student);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// DELETE student
export const deleteStudent = async (req, res) => {
  try {
    const student = await Student.findByIdAndDelete(req.params.id);
    res.json({ message: "Student deleted", student });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
