const express = require("express");
const app = express();
const db = require('./models'); 


//this creates a new exercise 
app.post("/exercise", ({ body }, res) => {
    // console.log(body); 
    db.Workout.create(body)
      .then(data => {
        res.json(data);
      })
      .catch(err => {
        res.json(err);
      });
  });