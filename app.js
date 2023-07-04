const express = require("express");
const app = express();
const cors = require("cors");
const Error = require("./middleware/error");
const multer = require("multer");

//  testing
const nodemailer = require("nodemailer");

app.get("/mail", async (req, res) => {
  let testAccount = await nodemailer.createTestAccount();

  const transporter = nodemailer.createTransport({
    host: "smtp.ethereal.email",
    port: 587,
    auth: {
      user: "isai.thompson93@ethereal.email",
      pass: "Y96vCQCWG1J1t5cMbH",
    },
  });
  const info = await transporter.sendMail({
    from: '"vaibhav rathore" <isai.thompson93@ethereal.email>', // sender address
    to: "vaibhavrathorema@gmail.com", // list of receivers
    subject: "Hello vaibhav rahteo", // Subject line
    text: "good morning mail", // plain text body
    html: "<b>this is vaibav rathore</b>", // html body
  });
  console.log("Message sent: %s", info.messageId);
  res.json("vaibhav", info);
});

// parse
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");

// expreess use
app.use(cors());

app.use(express.json());
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: true }));

// classroutes
const SchoolClass = require("./Routes/schoolClass/schoolclass.js");

// fees routes
// const Fees = require("./Routes/collection/totalFee")
const Fees = require("./Routes/Admin/Fees");

// admin panel
const AdminPanel = require("./Routes/Adminpanel/AdminPanel");

// superadmin routes
const School = require("./Routes/SuperAdmin/Schoolroute");
const addadmin = require("./Routes/SuperAdmin/Adminroute");

// admin routes
const addTeacher = require("./Routes/Admin/AddTeacher");
const Exam = require("./Routes/ExamRoutes/Exam");

// teacher routes
const addstudent = require("./Routes/Teacher/AddStudent");
//
// routes
const User = require("./Routes/User/user");

// school Class
app.use("/", SchoolClass);

// Fee collection
app.use("/", Fees);

// super admin
app.use("/", School);
app.use("/", addadmin);
app.use("/", AdminPanel);

// admin
app.use("/", addTeacher);
app.use("/", Exam);

// teacher
app.use("/", addstudent);

// calling apis
app.use("/", User);

app.get("/", (req, res) => {
  res.status(200).json({ sucess: "data is working properly" });
});

// middelwear for error
app.use(Error);

module.exports = app;

// const ImageModel = require("../model/imageuploadmodel")

// // Storage
// const storage = multer.diskStorage({
//   destination: "uploads",
//   filename: (req, file, cb) => {
//     cb(null, file.originalname);
//   }
// });

// const upload = multer({ storage }).single("testImage");

// app.post("/upload", (req, res) => {
//   upload(req, res, (err) => {
//     if (err) {
//       console.log(err);
//       return res.status(500).json({ error: err });
//     }

//     const image = new ImageModel({
//       name: req.body.name,
//       image: {
//         data: req.file.filename,
//         contentType: "image/png"
//       }
//     });

//     image
//       .save()
//       .then(data => {
//         res.json({
//           image: data,
//           message: "Image upload successful"
//         });
//       })
//       .catch(err => {
//         console.log(err);
//         res.status(500).json({ error: err });
//       });
//   });
// });

// // Assuming you have already required the necessary modules and defined the ImageModel schema

// app.get("/image/:id", (req, res) => {
//   const imageId = req.params.id;

//   ImageModel.findById(imageId)
//     .then((image) => {
//       if (!image) {
//         return res.status(404).json({ message: "Image not found" });
//       }

//       const imagePath = `uploads/${image.image.data}`;
//       res.sendFile(imagePath, { root: __dirname });
//     })
//     .catch((err) => {
//       console.log(err);
//       res.status(500).json({ error: err });
//     });
// });
