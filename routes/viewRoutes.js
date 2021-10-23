const path = require("path");

module.exports = function(app) {
    app.get("/", function(req, res) {
        res.sendFile(path.join(__dirname, "../views/index.html"));
    });

    app.get("/exercise", function(req, res) {
        res.sendFile(path.join(__dirname, "../views/exercise.html"));
    });

    app.get("/stats", function(req, res) {
        res.sendFile(path.join(__dirname, "../views/stats.html"));
    });

};