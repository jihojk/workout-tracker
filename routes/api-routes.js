const path = require("path");
const db = require("../models")

function apiRoutes(app) {

    app.get("/", (req, res) => {
        res.sendFile(path.join(__dirname, "../public", "index.html"))
        db.Workout.find({}).sort({day: 1}).limit(1).then(dbLatest => {
          res.json(dbLatest);
        });
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
        db.Workout.find({}).then(dbWorkout => {
          res.json(dbWorkout);
        });
      });
      
      //create a new workout
      app.post("/api/workouts", (req, res) => {
        db.Workout.create(req.body).then(function (data){
          db.Workout.findOneAndUpdate({ _id: data._id},{$push:{exercises:req.body}}, function(error, success){

            res.json(result)
          })
        })
      });
      

      // app.put("/api/workouts/:id", (req, res) => {
      //   let id = req.params.id;
      //   let { body } = req;
      //   let increaseDuration = body.duration;
      //   db.Workout.findByIdAndUpdate(
      //     {
      //       _id: id
      //     },
      //     {
      //       $push: {
      //         exercises: body
      //       },
      //       $inc: {
      //         totalDuration: increaseDuration
      //       }
      //     }
      //   ).then(result => res.json(result));
      // });

      app.get("/api/workouts/range", function (req, res){
        db.Workout.find({})
        .then (dbWorkout => {
            res.json(dbWorkout);
        })
    })



}

module.exports = apiRoutes;