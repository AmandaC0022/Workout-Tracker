const express = require("express");
const logger = require("morgan");
const mongoose = require("mongoose");
const app = express();
// const path = require('path');  
// const routes = require("./routes"); 
// const db = require('./models'); 
// const connectionString = "mongodb+srv://AmandaC0022:<Thebig21>@cluster0.rpywh.mongodb.net/workout?retryWrites=true&w=majority";  
const PORT = process.env.PORT || 3000;

app.use(logger("dev"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(express.static("public"));
// app.use(routes); 

mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/workout", { useNewUrlParser: true });

mongoose.connection.once('open', function() {
  console.log('Connection has been made!'); 
})
.on('error', function(error) {
  console.log("Connection Error:", error); 
}); 

require("./routes/apiRoutes")(app); 
require("./routes/viewRoutes")(app); 

// this renders the exercise page
// app.get("/exercise", (req, res) => {
//   res.sendFile(path.join(__dirname + '/views/exercise.html'));
// });

//this renders the stats page 
// app.get("/stats", (req, res) => {
//   res.sendFile(path.join(__dirname + '/public/stats.html'));
// });

app.listen(PORT, () => {
  console.log(`App running on port ${PORT}!`);
});