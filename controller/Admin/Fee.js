const Fee = require("../../model/admin/Fee"); // Fee model
const TryCatch = require("../../middleware/TryCatch"); // TryCatch middleware
const ErrorHandler = require("../../utils/errorHandel"); // ErrorHandler utility
const SchoolClass = require("../../model/SchoolClass/Schoolclass"); // SchoolClass model
const School = require("../../model/SuperAdmin/School"); // School model
const user = require("../../model/User/User")

// add fees
const AddFees = TryCatch(async (req, res) => {
  const schoolId = req.user.schoolId;
  const { classId, fees } = req.body;
// class find
    const className = await SchoolClass.findById(classId);
    const Feeclass = await className.className;


  // find class
  const findClass = await SchoolClass.findOne({ _id: classId });
  // Check if class already exists for the school
  const existingClass = await Fee.findOne({ schoolId, classId });
  if (existingClass) {
    return res.status(400).json({
      success: false,
      message: `Class ${findClass.className} already exists for the school please update class fee`,
    });
  }

  // Create a new class entry
  const SchoolFeeByClass = await Fee.create({
    classId,
    fees,
    schoolId,
    classname: Feeclass,
  });

  res.status(200).json({
    success: true,
    message: `School class - ${findClass.className} fees have been added`,
    SchoolFeeByClass,
  });
});

// see all fees
const SeeAllFee = TryCatch(async (req, res) => {
  if (req.user.role == "superadmin") {
    const schoolFees = await Fee.find();
    res.json({ success: true, schoolFees });
  }
  // admin
  else if (req.user.role === "admin" || req.user.role === "teacher") {
    const schoolId = req.user.schoolId;
    const searchQuery = {
      schoolId,
    };
    const schoolcheck = await School.findById(schoolId);
    const data = await Fee.find(searchQuery);
    // total fees of school
    var total = 0
    const TottalAllClassFee = data.map((e)=>{
      total = total + e.fees
    })
// toal paid fees

    const totalClass = data.length;
    res
      .status(200)
      .json({ School: schoolcheck.schoolname,totalfee : total ,TotalClass: totalClass, data });
  }
});

// GetFeesByClassName
const GetFeesByClassName = TryCatch(async (req, res) => {
  const schoolId = req.user.schoolId;
  const { id } = req.params;

  const existingClass = await Fee.findOne({ schoolId, classId: id });

  if (!existingClass) {
    return res.status(404).json({
      success: false,
      message: "Class not found",
    });
  }

  const data = existingClass.fees;
  res.status(200).json({
    success: true,
    message: "School fees fetch successful",
    existingClass,
    fees: data,
  });
});

// update fees
const UpdateFees = TryCatch(async (req, res) => {
  const schoolId = req.user.schoolId;

  const { classId, fees } = req.body;

  const existingClass = await Fee.findOne({ schoolId, classId });
  console.log(existingClass);

  // If the class doesn't exist, return an error
  if (!existingClass) {
    return res.status(404).json({
      success: false,
      message: "Class not found",
    });
  }

  // Update the fees for the class
  existingClass.fees = fees;
  await existingClass.save();

  res.status(200).json({
    success: true,
    message: "Fees updated successfully",
    updatedClass: existingClass,
  });
});

// my school Fees
const MySchoolFees = TryCatch(async (req, res) => {
  const schoolId = req.user.schoolId;
  const searchQuery = {
    schoolId,
  };
  const existingClass = await Fee.findOne(searchQuery);

  const allData = {
    existingClass,
  };

  res.status(200).json({
    allData,
  });
});

// my fees
const MyFees = TryCatch(async (req, res) => {
  const schoolId = req.user.schoolId;
  const classId = req.user.classId;
  const searchQuery = {
    schoolId,
    classId,
  };
  const existingClass = await Fee.findOne(searchQuery);
  const TotalFees = existingClass.fees;
  const install1 = req.user.feesinstall1;
  const install2 = req.user.feesinstall2;
  const install3 = req.user.feesinstall3;

  const totalPaidFee =
    req.user.feesinstall1 + req.user.feesinstall2 + req.user.feesinstall3;
  const remainingFees = TotalFees - totalPaidFee;

  const allData = {
    TotalFees,
    install1,
    install2,
    install3,
    remainingFees,
    totalPaidFee,
  };

  res.status(200).json({
    allData,
  });
});

module.exports = {
  AddFees,
  SeeAllFee,
  UpdateFees,
  GetFeesByClassName,
  MyFees,
  MySchoolFees,
};
