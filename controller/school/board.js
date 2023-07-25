const SchoolBoard =  require("../../model/school/board")
const TryCatch = require("../../middleware/TryCatch");
const ErrorHandler = require("../../utils/errorHandel");


// Controller function to add a new school board
const addBoard = async (req, res, next) => {
  try {
    const { boardname, state } = req.body;
    const board = await SchoolBoard.create({ boardname, state });
    res.status(201).json(board);
  } catch (err) {
    next(err);
  }
};

// Controller function to get all school boards
const getAllBoards = async (req, res, next) => {
  try {
    const boards = await SchoolBoard.find();
    res.status(200).json(boards);
  } catch (err) {
    next(err);
  }
};


// Controller function to get a school board by its ID
const getBoardById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const board = await SchoolBoard.findById(id);
    if (!board) {
      return res.status(404).json({ message: "Board not found" });
    }
    res.status(200).json(board);
  } catch (err) {
    next(err);
  }
};

// Controller function to update a school board by its ID
const updateBoard = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { boardname, state } = req.body;

    const board = await SchoolBoard.findByIdAndUpdate(
      id,
      { boardname, state },
      { new: true }
    );

    if (!board) {
      return res.status(404).json({ message: "Board not found" });
    }

    res.status(200).json(board);
  } catch (err) {
    next(err);
  }
};

// Controller function to delete a school board by its ID
const deleteBoard = async (req, res, next) => {
  try {
    const { id } = req.params;

    const board = await SchoolBoard.findByIdAndDelete(id);
    if (!board) {
      return res.status(404).json({ message: "Board not found" });
    }

    res.status(200).json({ message: "Board deleted successfully" });
  } catch (err) {
    next(err);
  }
};

module.exports = {
  getAllBoards,
  addBoard,
  getBoardById,
  updateBoard,
  deleteBoard,
};
