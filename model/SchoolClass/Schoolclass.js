const mongoose = require("mongoose");
const SchoolClass = new mongoose.Schema({
  className: {
    type: String,
    required: [true, "please Enter className"],
    unique: [true , "this class is already exist"],
  },
});

module.exports = mongoose.model("Class",SchoolClass) 


// const mongoose = require("mongoose");

// const SchoolClass = new mongoose.Schema({
//   className: {
//     type: String,
//     required: [true, "Please enter className"],
//     unique: [true, "This class already exists"],
//   },
//   subjects: [
//     {
//       name: {
//         type: String,
//         required: true,
//       },
//     },
//   ],
// });

// module.exports = mongoose.model("Class", SchoolClass);

// const Class = require("./path/to/your/class/model");

// const class11 = new Class({
//   className: "11th",
//   subjects: [
//     { name: "Physics" },
//     { name: "Chemistry" },
//     { name: "Maths" },
//     { name: "Biology" },
//   ],
// });

// class11.save((err) => {
//   if (err) {
//     console.error(err);
//   } else {
//     console.log("Class 11 created successfully.");
//   }
// });
