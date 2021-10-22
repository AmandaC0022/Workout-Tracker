const express = require("express");
const logger = require("morgan");
const mongoose = require("mongoose");
const app = express();
const path = require('path');  
// const router = express.Router(); 
const db = require('./models'); 
// const connectionString = "mongodb+srv://AmandaC0022:<Thebig21>@cluster0.rpywh.mongodb.net/workout?retryWrites=true&w=majority";  
const PORT = process.env.PORT || 3000;

app.use(logger("dev"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(express.static("public"));

mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/workout", { useNewUrlParser: true });

mongoose.connection.once('open', function() {
  console.log('Connection has been made!'); 
})
.on('error', function(error) {
  console.log("Connection Error:", error); 
}); 

app.post("/newWorkout", ({ body }, res) => {
  // res.json(body); 
  db.Workout.create(body)
    .then(data => {
      res.json(data);
    })
    .catch(err => {
      res.json(err);
    });
});

//this shows all workouts 
app.get("/", (req, res) => {
  db.Workout.find({})
    .populate("exercises")
    .then(data => {
      res.sendFile(path.join(__dirname, '/views/index.html'), data); 
    })
    .catch(err => {
      res.json(err);
    });
});

//
app.get('/showWorkouts', (req, res) => {
  db.Workout.find({})
  .then(data => {
    res.json(data); 
  })
  .catch(err => {
    res.json(err); 
  })
})


// this renders the exercise page
app.get("/exercise", (req, res) => {
  res.sendFile(path.join(__dirname + '/views/exercise.html'));
});

//this renders the stats page 
// app.get("/stats", (req, res) => {
//   res.sendFile(path.join(__dirname + '/public/stats.html'));
// });

app.post("/exercise", ({ body }, res) => {
  db.Workout.create(body)
    .then(dbexercise => {
      res.json(dbexercise);
    })
    .catch(err => {
      res.json(err);
    });
});

app.listen(PORT, () => {
  console.log(`App running on port ${PORT}!`);
});