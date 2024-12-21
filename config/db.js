import ongoose from "mongoose";

const dbConfig = {
  uri: process.env.MONGO_URI,
  options: {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,  // Optional in newer Mongoose versions
  }
};

const connectDB = async () => {
  try {
    await mongoose.connect(dbConfig.uri, dbConfig.options);
    console.log('✅ MongoDB Connected using db.js');
  } catch (err) {
    console.error('❌ Error connecting to MongoDB:', err);
    process.exit(1); // Exit process with failure
  }
};

module.exports = connectDB;
