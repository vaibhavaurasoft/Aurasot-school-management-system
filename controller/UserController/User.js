// const TryCatch = require("../../middleware/TryCatch");
// const User = require("../../model/User/User");
// const ErrorHandler = require("../../utils/errorHandel");
// const sendToken = require("../../utils/jwtToken");
// const checkPostBody = require("../../utils/QueryCheck");
// const Fee = require("../../model/admin/Fee");
// const Userclass = require("../../model/SchoolClass/Schoolclass");
// const SchoolExam = require("../../model/ExamSchema/exammodel")

// // create user
// const AddUser = TryCatch(async (req, res, next) => {
//   const role = req.user.role;
//   if (role === "admin") {
//     await checkPostBody(["email", "password"], req);
//   } else if (role === "teacher") {
//     await checkPostBody(["email", "password", "classId","name"], req);
//   }
//   req.body.CreateByuser = req.user.id;
//   req.body.schoolId = req.user.schoolId;
//   const user = await User.create(req.body);
//   res.status(201).json({
//     success: true,
//     user,
//   });
// });

// const UserbyId = TryCatch(async (req, res, next) => {
//   const { id } = req.params;
//   const user = await User.findById(id);
//   if (!user) {
//     return next(new ErrorHandler("user not found", 404));
//   }
//   // finding class
//   const classid = await user.classId;
//   const classfind = await Userclass.findOne(classid);

//   // finding fee
//   const schoolId = await user.schoolId;
//   const classFees = await Fee.findOne({ schoolId, classId: classid });
//   const totalFess = classFees.fees;
//   const totalpaidfee =
//     user.feesinstall1 + user.feesinstall2 + user.feesinstall3;

//   const remingfees = totalFess - totalpaidfee;

// // finding exam
//  const searchQuery = {
//    schoolId,
//    classId: classid,
//  };
//   const exams = await SchoolExam.find(searchQuery);

//   const alldata = {
//     ...user.toObject(),
//     classs: classfind.className,
//     allfess: totalFess,
//     pandingFee: remingfees,
//     exams,
//   };
//   res.status(200).json({
//     success: true,
//     alldata,
//   });
// });

// // get all use
// const AllUser = TryCatch(async (req, res) => {
//   // for super admin
//   if (req.user.role == "superAdmin") {
//     const query = req.query;
//     const data = await User.find(query);

//     const totalUser = data.length;
//     res.status(200).json({ totalUser: totalUser, data });
//   }

//   //  for admin / owner
//   else if (req.user.role === "admin") {
//     const query = req.query;
//     const schoolId = req.user.schoolId;
//     const roleFilter = ["admin", "principal", "teacher", "student"];
//     const searchQuery = {
//       role: { $in: roleFilter },
//       schoolId,
//       ...query,
//     };

//     const data = await User.find(searchQuery);
//     const totalUser = data.length;

//     res.status(200).json({ totalUser, data });
//   }

//   //  for principal / teacher
//   else if (req.user.role == "principal") {
//     const query = req.query;
//     const schoolId = req.user.schoolId;
//     const roleFilter = ["principal", "teacher", "student"];
//     const searchQuery = {
//       role: { $in: roleFilter },
//       schoolId,
//       ...query,
//     };

//     const data = await User.find(searchQuery);
//     const totalUser = data.length;

//     res.status(200).json({ totalUser, data });
//   }
//   //  for student
//   else if (req.user.role == "teacher") {
//     const query = req.query;
//     const schoolId = req.user.schoolId;
//     const roleFilter = ["teacher", "student"];
//     const searchQuery = {
//       role: { $in: roleFilter },
//       schoolId,
//       ...query,
//     };

//     const data = await User.find(searchQuery);
//     const totalUser = data.length;

//     res.status(200).json({ totalUser, data });
//   }
// });

// const UpdateUser = TryCatch(async(req,res)=>{
// const userId = req.params.id;
// var user = await User.findById(userId)
//  if (!user) {
//    return next(new ErrorHandler("User not found", 404));
//  }
//   var user = await User.findByIdAndUpdate(
//     userId,
//     {$set:req.body},
//     {new:true}
//   )
//  res.status(200).json({
//    success: true,
//    message: "Fees updated successfully",
//    user
//  });

// })

// const DeleteUser = TryCatch(async (req, res) => {
//   const userId = req.params.id;
//   var user = await User.findById(userId);
//   if (!user) {
//     return next(new ErrorHandler("User not found", 404));
//   }
//   var user = await User.findByIdAndDelete(
//     userId,
//   );
//   res.status(200).json({
//     success: true,
//     message: "Fees delete successfully",
//     user,
//   });
// });

// // // 2 login user
// const UserLogin = TryCatch(async (req, res, next) => {
//   const { email, password } = req.body;
//   if (!email || !password) {
//     return next(new ErrorHandler(`Please enter email or password`, 400));
//   }

//   const user = await User.findOne({ email }).select("+password");
//   if (!user) {
//     return res.status(500).json({ error: "Invalid email" });
//     // return next(new ErrorHandler(`Invalid email`, 401));
//   }

//   const passMatch = await user.comparePassword(password);
//   if (!passMatch) {
//     // return next(new ErrorHandler(`Invalid password`, 401));
//     return res.status(500).json({ error: "Invalid Password" });
//   }

//   // const token = user.getJWTToken();
//   sendToken(user, 200, res);
//   // sendToken(user);
// });

// // logout user
// const LogOut = TryCatch(async (req, res, next) => {
//   await res.clearCookie("token", { path: "/" });
//   await res.status(200).send("user Logout");
// });

// // user details
// const UserDetails = TryCatch(async (req, res, next) => {
//   const user = await User.findById(req.user.id);
//   res.status(200).json({
//     sucess: true,
//     user,
//   });
// });

// module.exports = {
//   AddUser,
//   AllUser,
//   UserLogin,
//   UpdateUser,
//   DeleteUser,
//   LogOut,
//   UserDetails,
//   UserbyId,
// };

const TryCatch = require("../../middleware/TryCatch");
const User = require("../../model/User/User");
const ErrorHandler = require("../../utils/errorHandel");
const sendToken = require("../../utils/jwtToken");
const checkPostBody = require("../../utils/QueryCheck");
const Fee = require("../../model/admin/Fee");
const Userclass = require("../../model/SchoolClass/Schoolclass");
const SchoolExam = require("../../model/ExamSchema/exammodel");

// create user
const AddUser = TryCatch(async (req, res, next) => {
  // Check required fields based on the user role
  const role = req.user.role;
  if (role === "admin") {
    await checkPostBody(["email", "password"], req);
  } else if (role === "teacher") {
    await checkPostBody(["email", "password", "classId", "name"], req);
  }

  // Set additional request body fields
  req.body.CreateByuser = req.user.id;
  req.body.schoolId = req.user.schoolId;

  // Create user
  const user = await User.create(req.body);
  res.status(201).json({
    success: true,
    user,
  });
});

// Get user by ID
const UserbyId = TryCatch(async (req, res, next) => {
  const { id } = req.params;

  const role = req.user.role;
  if (role === "superAdmin") {
    const user = await User.findById(id);
    if (!user) {
      return next(new ErrorHandler("User not found", 404));
    }
    res.json({ user });
  }

  // Find user by ID
  const user = await User.findById(id);
  if (!user) {
    return next(new ErrorHandler("User not found", 404));
  }

  // Find class
  const classid = await user.classId;
  const classfind = await Userclass.findOne(classid);

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

// test
const all = TryCatch(async(req,res,next)=>{
   
    res.json("this is testing on vercel")

})

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
  all
};
