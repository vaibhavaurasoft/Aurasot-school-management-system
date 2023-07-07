const TryCatch = require("../../middleware/TryCatch");
const User = require("../../model/User/User");
const ErrorHandler = require("../../utils/errorHandel");
const sendToken = require("../../utils/jwtToken");
const checkPostBody = require("../../utils/QueryCheck");
const Fee = require("../../model/admin/Fee");
const SchoolClass = require("../../model/SchoolClass/Schoolclass");
const SchoolExam = require("../../model/ExamSchema/exammodel");
const nodemailer = require("nodemailer");
const multer = require("multer")
const upload = require("../../middleware/multer");


// create user
const AddUser1 = TryCatch(async (req, res, next) => {
  // Check required fields based on the user role
  const role = req.user.role;
  if (role === "admin") {
    await checkPostBody(["email", "password"], req);
  } else if (role === "teacher") {
    await checkPostBody(["email", "password", "classId", "name"], req);
  }

  // image upload section

  const storage = multer.diskStorage({
    destination: "uploads",
    filename: (req, file, cb) => {
      cb(null, file.originalname);
    },
  });

  const upload = multer({ storage }).single("testImage");

    upload(req, res, (err) => {
      if (err) {
        console.log(err);
        return res.status(500).json({ error: err });
      }

      const image = new ImageModel({
        name: req.body.name,
        image: {
          data: req.file.filename,
          contentType: "image/png"
        }
      });
      image.save()
    })

  // image upload section end

  // Set additional request body fields
  req.body.CreateByuser = req.user.id;
  req.body.schoolId = req.user.schoolId;

  // Create user
  const user = await User.create(req.body);
  // sending mail
  let testAccount = await nodemailer.createTestAccount();

  const transporter = nodemailer.createTransport({
    //  host: "smtp.ethereal.email",
    //  port: 587,
    service: "gmail",
    port: 587,
    secure: false,
    auth: {
      //  user: "isai.thompson93@ethereal.email",
      user: "vaibhav.aurasoft@gmail.com",
      pass: "avjulakvbjgyfdmg",
    },
  });
  const info = await transporter.sendMail({
    from: '"vaibhav rathore" <isai.thompson93@ethereal.email>', // sender address
    to: `${user.email}`, // list of receivers
    subject: `Account created for ${req.body.role} `, // Subject line
    text: "created account", // plain text body
    html: `Here is your creadencial <br> email - ${user.email} <br> password - ${req.body.password} `, // html body
  });

  res.status(201).json({
    success: true,
    user,
  });
});
// teting
const AddUser = TryCatch(async (req, res, next) => {
  // Check required fields based on the user role
  const role = req.user.role;
  if (role === "admin") {
    await checkPostBody(["email", "password"], req);
  } else if (role === "teacher") {
    await checkPostBody(["email", "password", "classId", "name"], req);
  }

  // image upload section


  // image upload section end

  // Set additional request body fields
  req.body.CreateByuser = req.user.id;
  req.body.schoolId = req.user.schoolId;
  //  req.body.profilepic = req.file.filename;

  // Create user
  const user = await User.create(req.body);
  // sending mail
  let testAccount = await nodemailer.createTestAccount();

  const transporter = nodemailer.createTransport({
    //  host: "smtp.ethereal.email",
    //  port: 587,
    service: "gmail",
    port: 587,
    secure: false,
    auth: {
      //  user: "isai.thompson93@ethereal.email",
      user: "vaibhav.aurasoft@gmail.com",
      pass: "avjulakvbjgyfdmg",
    },
  });
  const info = await transporter.sendMail({
    from: '"vaibhav rathore" <isai.thompson93@ethereal.email>', // sender address
    to: `${user.email}`, // list of receivers
    subject: `Account created for ${req.body.role} `, // Subject line
    text: "created account", // plain text body
    html: `Here is your creadencial <br> email - ${user.email} <br> password - ${req.body.password} `, // html body
  });

  res.status(201).json({
    success: true,
    user,
  });
});

// const AddUser = TryCatch(async (req, res, next) => {
//   // Check required fields based on the user role
//   const role = req.user.role;
//   if (role === "admin") {
//     await checkPostBody(["email", "password"], req);
//   } else if (role === "teacher") {
//     await checkPostBody(["email", "password", "classId", "name"], req);
//   }

//   // File upload
//   upload.single("profilepic")(req, res, (err) => {
//     if (err) {
//       // Handle multer error
//       return res.status(400).json({
//         success: false,
//         error: "Error uploading file",
//       });
//     }

//     // Set additional request body fields
//     req.body.CreateByuser = req.user.id;
//     req.body.schoolId = req.user.schoolId;
//     req.body.profilepic = req.file ? req.file.filename : null;

//     // Create user
//     const user =  User.create(req.body);

//     // Sending mail
//     // ...

//     res.status(201).json({
//       success: true,
//       user,
//     });
//   });
// });




// Get user by ID
const UserbyId = TryCatch(async (req, res, next) => {
  const { id } = req.params;

  const role = req.user.role;
  if (role === "superAdmin" || role === "admin" || role === "teacher") {
    const user = await User.findById(id);
    if (!user) {
      return next(new ErrorHandler("User not found", 404));
    }
    res.json({ user });

    // const user = await User.findById(id);

    // console.log(user);

    // if (!user) {
    //   return next(new ErrorHandler("User not found", 404));
    // }

    // // Creating a copy of the user object and excluding the name field
    // const userToSend = { ...user.toObject(), email: undefined };

    // res.json({ user: userToSend });




  }

  // Find user by ID
  const user = await User.findById(id);
  if (!user) {
    return next(new ErrorHandler("User not found", 404));
  }

  // Find class
  const classid = await user.classId;
  const classfind = await SchoolClass.findOne(classid);

  // Find fee
  const schoolId = await user.schoolId;
  const classFees = await Fee.findOne({ schoolId, classId: classid });
  // if(role==="student"){
  var totalFess = classFees.fees;
  var totalpaidfee = user.feesinstall1 + user.feesinstall2 + user.feesinstall3;

  var remingfees = totalFess - totalpaidfee;

  // }

  // Find exams
  const searchQuery = {
    schoolId,
    classId: classid,
  };
  const exams = await SchoolExam.find(searchQuery);

  const alldata = {
    ...user.toObject(),
    classs: classfind.className,
    allfess: totalFess,
    pandingFee: remingfees,
    exams,
  };

  res.status(200).json({
    success: true,
    alldata,
  });
});


// find all student by class Id

const StudentByClassID = TryCatch(async (req, res, next) => {
  const { id } = req.params;
  const schoolId = req.user.schoolId;
  const searchQuery = {
    classId: id,
    schoolId,
  };
  const classdetails = await SchoolClass.findById(id);

  const user = await User.find(searchQuery);
  const toteluser = user.length
  res.json({ toteluser, class: classdetails.className, user });
});

// Get all users  
const AllUser = TryCatch(async (req, res) => {
  if (req.user.role == "superAdmin") {
    // Super admin fetching all users
    const query = req.query;
    const data = (await User.find(query)).reverse();
    const totalUser = data.length;

    res.status(200).json({ totalUser: totalUser, data });
  } else if (req.user.role === "admin") {
    // Admin/Owner fetching users
    const query = req.query;
    const schoolId = req.user.schoolId;
    const roleFilter = ["admin", "principal", "teacher", "student"];
    const searchQuery = {
      role: { $in: roleFilter },
      schoolId,
      ...query,
    };

    const data = await User.find(searchQuery);
    const totalUser = data.length;

    res.status(200).json({ totalUser, data });
  } else if (req.user.role == "principal") {
    // Principal fetching users
    const query = req.query;
    const schoolId = req.user.schoolId;
    const roleFilter = ["principal", "teacher", "student"];
    const searchQuery = {
      role: { $in: roleFilter },
      schoolId,
      ...query,
    };

    const data = await User.find(searchQuery);
    const totalUser = data.length;

    res.status(200).json({ totalUser, data });
  } else if (req.user.role == "teacher") {
    // Teacher fetching users
    const query = req.query;
    const schoolId = req.user.schoolId;
    const roleFilter = ["teacher", "student"];
    const searchQuery = {
      role: { $in: roleFilter },
      schoolId,
      ...query,
    };

    const data = await User.find(searchQuery);
    const totalUser = data.length;

    res.status(200).json({ totalUser, data });
  }
});

// Update user
const UpdateUser = TryCatch(async (req, res) => {
  const userId = req.params.id;
  var user = await User.findById(userId);
  if (!user) {
    return next(new ErrorHandler("User not found", 404));
  }
  var user = await User.findByIdAndUpdate(
    userId,
    { $set: req.body },
    { new: true }
  );
  res.status(200).json({
    success: true,
    message: "User updated successfully",
    user,
  });
});

// Delete user
const DeleteUser = TryCatch(async (req, res) => {
  const userId = req.params.id;
  var user = await User.findById(userId);
  if (!user) {
    return next(new ErrorHandler("User not found", 404));
  }
  var user = await User.findByIdAndDelete(userId);
  res.status(200).json({
    success: true,
    message: "User deleted successfully",
    user,
  });
});

// User login
const UserLogin = TryCatch(async (req, res, next) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return next(new ErrorHandler(`Please enter email or password`, 400));
  }

  // Find user by email
  const user = await User.findOne({ email }).select("+password");
  if (!user) {
    return res.status(500).json({ error: "Invalid email" });
  }

  // Compare passwords
  const passMatch = await user.comparePassword(password);
  if (!passMatch) {
    return res.status(500).json({ error: "Invalid Password" });
  }

  // Generate and send token
  sendToken(user, 200, res);
});

// Logout user
const LogOut = TryCatch(async (req, res, next) => {
  await res.clearCookie("token", { path: "/" });
  await res.status(200).send("User Logout");
});

// Get user details
const UserDetails = TryCatch(async (req, res, next) => {
  const user = await User.findById(req.user.id);
  res.status(200).json({
    sucess: true,
    user,
  });
});

module.exports = {
  AddUser,
  AllUser,
  UserLogin,
  UpdateUser,
  DeleteUser,
  LogOut,
  UserDetails,
  UserbyId,
  StudentByClassID,
};
