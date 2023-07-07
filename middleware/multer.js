const multer = require("multer");
// const path = require("path");
// const fs = require("fs");

const multerStorage = multer.diskStorage({
  destination: "uploads",
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },
});

// Use diskstorage option in multer
const upload = multer({ storage: multerStorage });

module.exports = upload;

// Set storage for multer
// const storage = multer.diskStorage({
//   destination: function (req, file, cb) {
//     cb(null, "uploads/");
//   },
//   filename: function (req, file, cb) {
//     const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
//     const ext = path.extname(file.originalname);
//     cb(null, uniqueSuffix + ext);
//   },
// });

// // File filter for multer
// const fileFilter = (req, file, cb) => {
//   if (
//     file.mimetype === "image/jpeg" ||
//     file.mimetype === "image/jpg" ||
//     file.mimetype === "image/png"
//   ) {
//     cb(null, true);
//   } else {
//     cb(null, false);
//   }
// };

// // Set upload middleware
// const upload = multer({ storage: storage, fileFilter: fileFilter });
