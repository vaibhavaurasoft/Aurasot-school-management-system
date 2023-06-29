const mongoose = require("mongoose");

const ExamSchema = new mongoose.Schema({
  subject: {
    type: String,
    required: [true, "please enter subject nane"],
  },
  date: {
    type: Date,
    required: [true, "please enter Date"],
  },
  duration: {
    type: Number,
    required: [true, "please enter exam time"],
  },
  totalMarks: {
    type: Number,
    required: [true, "please enter Toal marks"],
  },
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "users",
    required: [true, "please enter created by id"],
  },
  schoolId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "schools",
    required: [true, "please enter School  id"],
  },
  classId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "classs",
    required: [true, "please enter class  id"],
  },
  status: {
    type: String,
    enum: ["upcoming", "history"],
    default: "upcoming",
  },
  classname: {
    type: String,
  },
});

const Exam = mongoose.model("Exam", ExamSchema);

module.exports = Exam;
