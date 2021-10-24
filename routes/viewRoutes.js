const path = require("path");

module.exports = function(app) {
    //this shows the home page 
    app.get("/", function(req, res) {
        res.sendFile(path.join(__dirname, "../views/index.html"));
    });

    //this shows the add an exercise page
    app.get("/exercise", function(req, res) {
        res.sendFile(path.join(__dirname, "../views/exercise.html"));
    });

    //this shows the dashboard / stats page 
    app.get("/stats", function(req, res) {
        res.sendFile(path.join(__dirname, "../views/stats.html"));
    });

};