const express = require("express");
const logger = require("morgan");
const mongoose = require("mongoose");
const app = express();
const path = require('path'); 
// const router = express.Router(); 
const db = require('./models'); 
const PORT = process.env.PORT || 3000;

app.use(logger("dev"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public"));

app.set("views", path.join(__dirname, "views")); 

// app.use('/', router); 

mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/workoutdb", { useNewUrlParser: true });

mongoose.connection.once('open', function() {
  console.log('Connection has been made!'); 
})
.on('error', function(error) {
  console.log("Connection Error:", error); 
}); 

app.get("/", (req, res) => {
  db.Workout.find({})
    .then(dbWorkout => {
      res.json(dbWorkout);
    })
    .catch(err => {
      res.json(err);
    });
});

// this renders the exercise page
app.get("/exercise", (req, res) => {
  res.sendFile(path.join(__dirname + '/public/exercise.html'));
});

//this renders the stats page 
// app.get("/stats", (req, res) => {
//   res.sendFile(path.join(__dirname + '/public/stats.html'));
// });

// app.post("/exercise", ({ body }, res) => {
//   Exercise.create(body)
//     .then(dbexercise => {
//       res.json(dbexercise);
//     })
//     .catch(err => {
//       res.json(err);
//     });
// });

app.listen(PORT, () => {
  console.log(`App running on port ${PORT}!`);
});