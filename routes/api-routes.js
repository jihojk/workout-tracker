var path = require("path");
var db = require("../models")

function apiRoutes(app) {

    app.get("/", (req, res) => {
        res.sendFile(path.join(__dirname, "../public", "index.html"));
      });
      
      //exercise route
      app.get("/exercise", (req, res) => {
        res.sendFile(path.join(__dirname, "../public", "exercise.html"));
      });
      //stats route
      app.get("/stats", function (req, res) {
        res.sendFile(path.join(__dirname, "../public/stats.html"))
    })

      // get all existing workouts
      app.get("/api/workouts", (req, res) => {
        db.Workout.find({}).then(data => {
          res.json(data);
        });
      });
      
      //create a new workout
      app.post("/api/workouts", (req, res) => {
        console.log(req.body);
        db.Workout.create({}).then(result => {
     
          res.json(result);
        });
      });
      

      app.put("/api/workouts/:id", (req, res) => {
        let id = req.params.id;
        let { body } = req;
        let increaseDuration = body.duration;
        db.Workout.findByIdAndUpdate(
          {
            _id: id
          },
          {
            $push: {
              exercises: body
            },
            $inc: {
              totalDuration: increaseDuration
            }
          }
        ).then(result => res.json(result));
      });

      app.get("/api/workouts/range", function (req, res){
        db.Workout.find({})
        .then (dbWorkout => {
            res.json(dbWorkout);
        })
    })



}

module.exports = apiRoutes;