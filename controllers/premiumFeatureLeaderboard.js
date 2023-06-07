const myTable = require('../models/userTable')



const fetchUserLeaderBoard = async (req, res) => {
    try {
      const leaderboardOfUsers = await myTable.find().sort({ totalExpenses: -1 });
  
      res.status(200).json(leaderboardOfUsers);
    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
  };


module.exports = {
    fetchUserLeaderBoard
}

