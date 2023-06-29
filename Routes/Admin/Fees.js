const express = require("express");
const router = express.Router();
const auth = require("../../middleware/Auth");
const Data = require("../../controller/Admin/Fee");

// add fees
router.post(
  "/addfee",
  auth.isAuthenticateUser,
  auth.authorizeRole("admin"),
  Data.AddFees
);

// get all fees
router.get(
  "/allfees",
  auth.isAuthenticateUser,
  auth.authorizeRole("admin", "superadmin", "teacher"),
  Data.SeeAllFee
);

// get fees by class ID
router.get(
  "/feesbyclassid/:id",
  auth.isAuthenticateUser,
  Data.GetFeesByClassName
);

// update fees
router.put(
  "/updatefee",
  auth.isAuthenticateUser,
  auth.authorizeRole("admin"),
  Data.UpdateFees
);

// get my fees (for students)
router.get(
  "/myfees",
  auth.isAuthenticateUser,
  auth.authorizeRole("student"),
  Data.MyFees
);

// get my school fees (for admin and teacher)
router.get(
  "/myschoolfees",
  auth.isAuthenticateUser,
  auth.authorizeRole("admin", "teacher"),
  Data.MySchoolFees
);

module.exports = router;
