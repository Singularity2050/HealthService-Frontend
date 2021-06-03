const express = require("express"),
	router = express.Router(),
	User = require("../models/user");

// create a user object in database
router.post("/api/user", (req, res) => {
	User.create(req.body)
		.then((data) => {
			res.send(data);
		})
		.catch((err) => {
			res.status(500).send({
				message: err.message || "Some error occurred while creating the User.",
			});
		});
});

// gets the user object from database using email
router.get("/api/user/:email", async (req, res) => {
	const useremail = req.params.email;
	const user = await User.findOne({ email: useremail });
	res.json(user);
});

// gets all the user object from database
router.get("/api/user", async (req, res) => {
	const user = await User.findOne({});
	res.json(user);
});

// change the user object
router.put("/api/user", (req, res) => {
	const id = req.body._id;
	User.findByIdAndUpdate(id, req.body)
		.then((data) => {
			if (!data) {
				res.status(400).send({
					message: `Cannot update User with id ${id}. Given id was not found!`,
				});
			} else
				res.send({
					message: `User with id ${id} was updated successfully!`,
				});
		})
		.catch((err) => {
			res.status(500).send({
				message: "Error updating User with id " + id,
			});
		});
});

module.exports = router;
