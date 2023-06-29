const mongoose = require("mongoose");
mongoose.set("strictQuery", false);


const connectDb = () => { 
    mongoose
      .connect(process.env.DB_URI, {
        usenewurlparser: true,
        useunifiedtopology: true,
      })
      .then(() => {
        console.log("Connected to MongoDB Database");
      })
      .catch((err) => {
        console.log(err, "unable to connect to MongoDB Database");
      });
}
module.exports = connectDb