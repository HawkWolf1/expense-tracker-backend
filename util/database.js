const mongoose = require('mongoose');


const mongoConnect = async (callback) => {
    try {
      const client = await mongoose.connect(
        'mongodb+srv://iamhoneysights:Bucketone23@learnmongodb.llpq2yu.mongodb.net/?retryWrites=true&w=majority'
      );
      console.log('MongoDB connected!');
      callback(client);
    } catch (err) {
      console.log(err);
    }
  };




module.exports = mongoConnect
