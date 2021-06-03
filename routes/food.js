const express = require("express"),
	moment = require("moment"),
	router = express.Router(),
	calorieIntake = require("../models/calorieIntake");

// gets the food intake for user with given id for the given date from the database
router.get("/api/food/:user/:date", (req, res) => {
	const userid = req.params.user;
	const date = req.params.date;

	const query = calorieIntake.where({
		user: userid,
		date: moment(new Date(date).toISOString()).format("YYYY-MM-DD"),
	});
	calorieIntake
		.findOne(query)
		.then((data) => {
			if (!data) {
				res.status(400).send({
					message: `Food Intake info for User with id ${userid} and date ${date} was not found.`,
				});
			} else res.json(data);
		})
		.catch((err) => {
			res.status(500).send({
				message: "Error finding Food Intake data info for User " + userid,
			});
		});
});

// adds a food intake log for the user with given id in the database
// updates food when a modified object is sent
router.post("/api/food", (req, res) => {
	const date = new Date(req.body.date).toISOString();
	const newResponse = {
		user: req.body.user,
		foodIntake: req.body.foodIntake,
		date: moment(new Date(date)).format("YYYY-MM-DD"),
	};
	const filter = { user: req.body.user, date: req.body.date };
	const options = {
		new: true,
		upsert: true, // If not in db, create new one, else update
	};

	calorieIntake
		.findOneAndUpdate(filter, newResponse, options)
		.then((data) => {
			res.send(data);
		})
		.catch((err) => {
			res.status(500).send({
				message:
					err.message ||
					"Some error occurred while adding the food intake to the database.",
			});
		});
});

// Deletes food intake with given id from db
// deleting one record will delete info for a whole day for a corresponding user
router.delete("/api/food/:id", (req, res) => {
	const id = req.params.id;
	calorieIntake
		.findByIdAndRemove(id)
		.then((data) => {
			if (!data) {
				res.status(400).send({
					message: `Cannot delete Food Intake with id ${id}. Given id was not found!`,
				});
			} else {
				res.send({
					message: `Food intake with id ${id} was deleted successfully!`,
				});
			}
		})
		.catch((err) => {
			res.status(500).send({
				message: "Could not delete Food intake with id " + id,
			});
		});
});

module.exports = router;
