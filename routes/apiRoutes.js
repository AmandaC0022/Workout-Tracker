const db = require('../models'); 
const mongojs = require("mongojs"); 

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
app.get('/test', (req, res) => {
    res.json("this works!"); 
}); 

//gets all Workouts 
app.get("/api/workouts", (req, res) => {
db.Workout.find({})
.then(data => {
    res.json(data); 
})
.catch(err => {
    res.json(err); 
});
}); 

//route for stats page
app.get("/api/workouts/range", (req, res) => {
    db.Workout.find({})
    .then(data => {
        res.json(data); 
    })
    .catch(err => {
        res.json(err); 
    });
}); 

//this updates a Workout using the POST method using the Workout's ID 
app.post("/api/workouts/:id", (req, res) => {
    db.Workout.updateOne({_id: mongojs.ObjectId(req.params.id)}, 
        {$set: {
            type: req.body.type,
            name: req.body.name, 
            duration: req.body.duration, 
            weight: req.body.weight, 
            reps: req.body.reps,
            sets: req.body.sets,
            distance: req.body.distance
        }}, 
        (err, data) => {
            if (err) {
                res.json(err)
            } else {
                res.json("Workout was updated" + data); 
            }
        }); 
});

//deletes a workout from database 
app.delete("/api/delete/:id", (req, res) => {
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
app.delete("/api/clearall", (req, res) => {
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

