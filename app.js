const express = require("express");
const app = express();
const cors = require("cors");
const Error = require("./middleware/error");
const multer = require("multer")


//  middelwear
 


 
// parse
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");

// classroutes
const SchoolClass = require("./Routes/schoolClass/schoolclass.js")

// fees routes
// const Fees = require("./Routes/collection/totalFee")
const Fees = require("./Routes/Admin/Fees")

// admin panel
const AdminPanel = require("./Routes/Adminpanel/AdminPanel");


// superadmin routes 
const School = require("./Routes/SuperAdmin/Schoolroute");
const addadmin = require("./Routes/SuperAdmin/Adminroute");


// admin routes 
const addTeacher = require("./Routes/Admin/AddTeacher");
const Exam = require("./Routes/ExamRoutes/Exam")

// teacher routes
const addstudent = require("./Routes/Teacher/AddStudent"); 
// 
// routes
const User = require("./Routes/User/user");

// expreess use
app.use(express.json());
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: true }));

// school Class
app.use("/",SchoolClass)

// Fee collection
app.use("/",Fees)

// super admin
app.use("/", School);
app.use("/", addadmin);
app.use("/", AdminPanel);


// admin
app.use("/", addTeacher);
app.use("/",Exam)

// teacher
app.use("/", addstudent);

// calling apis
app.use("/", User);

app.get("/",(req,res)=>{
    res.status(200).json({sucess :  "data is working properly"})
})

// middelwear for error
app.use(Error);
app.use(cors());


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




