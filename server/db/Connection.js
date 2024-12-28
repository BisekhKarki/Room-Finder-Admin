const mongoose = require("mongoose");

const databaseConnection = async () => {
  try {
    const database = await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    if (database) {
      console.log(`Database connected to: ${database.connection.host}`);
    } else {
      console.log("Database not connected");
    }
  } catch (error) {
    console.log(error);
  }
};

module.exports = databaseConnection;
