 const SchoolBoard = require("../../controller/school/board")

 const express = require("express");
 const router = express.Router();
 const auth = require("../../middleware/Auth");

 // Route to get all school boards
 router
   .route("/all_boards")
   .get(auth.isAuthenticateUser, SchoolBoard.getAllBoards);

 // Route to add a new school board
 router.route("/add_board").post(auth.isAuthenticateUser, SchoolBoard.addBoard);

 // Route to get a school board by its ID
 router
   .route("/board/:id")
   .get(auth.isAuthenticateUser, SchoolBoard.getBoardById);

 // Route to update a school board by its ID
 router
   .route("/update_board/:id")
   .put(auth.isAuthenticateUser, SchoolBoard.updateBoard);

 // Route to delete a school board by its ID
 router
   .route("/delete_board/:id")
   .delete(auth.isAuthenticateUser, SchoolBoard.deleteBoard);

 module.exports = router;
