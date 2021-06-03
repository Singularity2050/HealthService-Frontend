const express = require("express"),
	router = express.Router(),
	calorieExpend = require("../models/calorieExpend");

// gets the workout info  for user with given id from the database
router.get("/api/workout/:uid", (req, res) => {
	const userid = req.params.uid;
	const query = calorieExpend.where({ user: userid });
	calorieExpend
		.find(query)
		.then((data) => {
			if (!data) {
				res.status(400).send({
					message: `Workout Data for User with id ${id} was not found.`,
				});
			} else res.json(data.response);
		})
		.catch((err) => {
			res.status(500).send({
				message: "Server Error finding workout Data for User with id " + id,
			});
		});
});

// adds a workout log for the user with given id in the database
router.post("/api/workout/:uid", (req, res) => {
	const userid = req.params.uid;
	const newResponse = new calorieExpend({
		user: userid,
		workouts: req.body.workouts,
		date: req.body.date,
	});

	calorieExpend
		.create(newResponse)
		.then((data) => {
			res.send(data);
		})
		.catch((err) => {
			res.status(500).send({
				message:
					err.message ||
					"Some error occurred while adding the workout log to the database.",
			});
		});
});

// Deletes workout log with given id from db
router.delete("/api/workout/:id", (req, res) => {
	const id = req.params.id;
	calorieExpend
		.findByIdAndRemove(id)
		.then((data) => {
			if (!data) {
				res.status(400).send({
					message: `Cannot delete workout with id ${id}. Given id was not found!`,
				});
			} else {
				res.send({
					message: `Workout data with id ${id} was deleted successfully!`,
				});
			}
		})
		.catch((err) => {
			res.status(500).send({
				message: "Could not delete workout data with id " + id,
			});
		});
});

module.exports = router;
