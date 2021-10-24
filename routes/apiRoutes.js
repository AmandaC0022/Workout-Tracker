const db = require('../models'); 
const mongojs = require("mongojs"); 

module.exports = function(app) {

//this creates a new Workout 
app.post("/api/workouts", async ({ body }, res) => {
// console.log(body); 
await db.Workout.create(body)
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

//this updates a Workout using the PUT method and the Workout's ID 
app.put("/api/workouts/:id", ({ body, params }, res) => {
    // console.log(body, params)
    const workoutId = params.id;
    let savedExercises = [];

    // gets all the currently saved exercises in the current workout
    db.Workout.find({_id: workoutId})
        .then(dbWorkout => {
            // console.log(dbWorkout)
            savedExercises = dbWorkout[0].exercises;
            res.json(dbWorkout[0].exercises);
            let allExercises = [...savedExercises, body]; 
            // console.log(allExercises); 
            updateWorkout(allExercises); 
        })
        .catch(err => {
            res.json(err);
        });

    function updateWorkout(exercises){
        db.Workout.findByIdAndUpdate(workoutId, {exercises: exercises}, 
            function(err, doc){
                if(err){
                    console.log(err)
                }
            })
        }      
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

