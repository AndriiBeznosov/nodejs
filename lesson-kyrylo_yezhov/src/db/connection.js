const mongoose = require("mongoose");

const connectMongo = async () => {
  return mongoose.connect(process.env.HOST_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
  });
};

module.exports = {
  connectMongo,
};
