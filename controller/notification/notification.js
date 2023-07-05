const Notification = require("../../model/notification/notification");
const Notification2 = require("../../model/notification/notification2");
const Trycatch = require("../../middleware/TryCatch");
const User = require("../../model/User/User");

// Get a specific notification by ID
// Create a new notification
const createNotification = Trycatch(async (req, res, next) => {
  req.body.createdByUser = req.user.id;
  req.body.schoolId = req.user.schoolId;
  const notification = await Notification.create(req.body);

  const schoolId = req.user.schoolId;
  if (notification.for) {
    var role = notification.for;
    var searchQuery = {
      schoolId,
      role,
    };
  }
  if (!notification.for) {
    var searchQuery = {
      schoolId,
    };
  }

  const data = await User.find(searchQuery);
  const toteluser = await data.length;
  for (let i = 0; i < data.length; i++) {
    const user = data[i];
    var notificationsend = await Notification2.create({
      notificationId: notification._id,
      userId: user._id,
    });
  }
  res.status(201).json({
    message: "Notification send successfully",
    send: `send notification to ${toteluser} , role is ${role}`,
    notification,
  });
});

// Get all notifications
const getAllNotifications = Trycatch(async (req, res) => {
  const schoolId = req.user.schoolId;
  var searchQuery = {
    schoolId,
  };
  const notifications = await Notification.find(searchQuery);
  const totalNotification = await notifications.length;
  res.json({ totalNotification, notifications });
});

// Get a specific notification by ID

const getNotificationById = Trycatch(async (req, res) => {
  const { id } = req.params;
  const userId = req.user.id;

  const notification = await Notification.findById(id);

  if (!notification) {
    return res.status(404).json({ message: "Notification not found" });
  }

  await Notification2.findOneAndUpdate(
    { notificationId: id, userId },
    { isview: true }
  );

  const updatedNotification2 = await Notification2.findOne({
    notificationId: id,
    userId,
  });

  const isview = updatedNotification2.isview;

  const updatedNotification = { ...notification.toObject(), isview };

  res.json({ notification: updatedNotification });
});


// Update a notification
const updateNotification = Trycatch(async (req, res) => {
  const { id } = req.params;
  const { title, description, status, isview } = req.body;
  const notification = await Notification.findByIdAndUpdate(
    id,
    {
      title,
      description,
      status,
      isview,
    },
    { new: true }
  );
  if (!notification) {
    return res.status(404).json({ message: "Notification not found" });
  }
  res.json(notification);
});

// Delete a notification
const deleteNotification = Trycatch(async (req, res, next) => {
  const { id } = req.params;
  const notification = await Notification.findByIdAndDelete(id);
  if (!notification) {
    return res.status(404).json({ message: "Notification not found" });
  }
  res.json({ message: "Notification deleted successfully" });
});


// mynotification
const mynotification = Trycatch(async (req, res, next) => {
  const userId = req.user.id;
  const searchQuery = {
    userId: userId,
  };

  const notificationIds = await Notification2.find(searchQuery)
    .distinct("notificationId")
    .exec();
  const notifications = await Notification.find({
    // _id: { $in: notificationIds }
    _id: notificationIds,
  });
  const totalNotification = await notifications.length;

  res.json({ totalNotification, notifications });
});

module.exports = {
  createNotification,
  getAllNotifications,
  getNotificationById,
  updateNotification,
  deleteNotification,
  mynotification,
};
