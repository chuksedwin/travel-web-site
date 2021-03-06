// mongoose connection by Edwin
const mongoose = require('mongoose');
//const url = "mongodb://localhost:27017/travelexperts";
const url = "mongodb+srv://akben:Accountconfig@sait-cms.zvbq1.azure.mongodb.net/travelexperts?retryWrites=true&w=majority";

// Set up a mongoose connection
mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true });
// Get the connection
const db = mongoose.connection;
// Bind connection to error event (to get notification of connection errors)
db.on('errorpage', console.error.bind(console, 'MongoDB connection error:'));

module.exports = mongoose