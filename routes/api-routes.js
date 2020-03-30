var path = require("path");
var db = require("../models")

function apiRoutes(app) {

    app.get("/", function (req, res) {
        res.sendFile(path.join(__dirname, "../public/index.html"))
        db.Workout.find({}).sort({ day: 1 }).limit(1)
            .then(dbLatest => {
                res.json(dbWorkout);
            })
    })

    app.get("/exercise", function (req, res) {
        res.sendFile(path.join(__dirname, "../public/exercise.html"))
    })

    app.get("/stats", function (req, res) {
        res.sendFile(path.join(__dirname, "../public/stats.html"))
    })

    app.get("/api/workouts", function (req, res) {
        db.Workout.find({})
        .then (dbWorkout => {
            res.json(dbWorkout);
        })
    })

    app.put("/api/workouts/:id", function (req, res) {
        console.log(req.body);
        db.Workout.findByIdAndUpdate(req.params.id, {
          $inc: { totalDuration: req.body.duration },
          $push: { exercises: req.body }
        })
          .then(dbWorkout => {
            console.log(dbWorkout);
            res.json(dbWorkout);
          })
          .catch(err => {
            res.status(400).json(err);
          });
      })

    app.post("/api/workouts", function (req, res) {
        db.Workout.create(req.body).then(function (data) {
            db.Workout.findOneAndUpdate({ _id: data._id }, { $push: { exercises: req.body } }, function (error, success) {
                res.json(success)
            })
        })
    })

    app.get("/api/workouts/range", function (req, res){
        db.Workout.find({})
        .then (dbWorkout => {
            res.json(dbWorkout);
        })
    })

    
}

module.exports = apiRoutes;