const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    const mongoURI = process.env.MONGO_URI ||
      "mongodb+srv://amreenshaik1689_db_user:amreen@project.hthgsur.mongodb.net/?appName=project";

    // Modern mongoose (and the underlying driver) no longer accept
    // the legacy `useNewUrlParser` or `useUnifiedTopology` options.
    // Connect using the URI only; additional options can be added
    // if needed (e.g. serverSelectionTimeoutMS).
    await mongoose.connect(mongoURI);

    console.log("MongoDB Connected");
  } catch (error) {
    console.error("MongoDB connection error:", error);
    process.exit(1);
  }
};

module.exports = connectDB;