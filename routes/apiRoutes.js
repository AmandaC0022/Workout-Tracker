// const express = require("express");
// const router = require('express').Router(); 
const db = require('../models'); 

module.exports = function(app) {

//this creates a new Workout 
app.post("/api/workouts", ({ body }, res) => {
// console.log(body); 
db.Workout.create(body)
    .then(data => {
    res.json(data);
    })
    .catch(err => {
    res.json(err);
    });
});

//Simple test for a connection
// app.get('/api/test', (req, res) => {
//     res.json("this works!"); 
// }); 

//gets all Workouts 
app.get("/workouts", (req, res) => {
db.Workout.find({})
.then(data => {
    res.json(data); 
})
.catch(err => {
    res.json(err); 
});
}); 

//this updates a Workout using the POST method using the Workout's ID 
app.post("/workouts/:id", (req, res) => {
db.Workout.update(
    {
    _id: mongojs.ObjectId(req.params.id)
    },
    {
    $set: {
        type: req.body.type,
        name: req.body.name, 
        duration: req.body.duration, 
        weight: req.body.weight, 
        reps: req.body.reps,
        sets: req.body.sets,
        distance: req.body.distance
    }
    },
    (error, data) => {
    if (error) {
        res.send(error);
    } else {
        res.send(data);
    }
    });
});

//deletes a workout from database 
app.delete("/delete/:id", (req, res) => {
db.Workout.remove(
    {
    _id: mongojs.ObjectId(req.params.id)
    },
    (error, data) => {
    if (error) {
        res.send(error);
    } else {
        res.send(data);
    }
    });
}); 

//This DELETEs all of the workouts 
app.delete("/clearall", (req, res) => {
db.Workout.remove({}, (error, response) => {
    if (error) {
    res.send(error);
    } else {
    res.send(response);
    }
});
});

}; 

// module.exports = router; 

