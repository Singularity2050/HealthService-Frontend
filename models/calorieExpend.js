const mongoose = require("mongoose");

const workoutTimeSchema = new mongoose.Schema({
	hours: Number,
	minutes: Number,
	seconds: Number,
});

const workoutSchema = new mongoose.Schema({
	workoutName: String, // pushups
	workoutTime: workoutTimeSchema, // {hours: 0, minutes: 15, seconds: 0}
	calories: Number, // 150 KCal
});

const calorieExpendSchema = new mongoose.Schema({
	user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
	Date: Date, // date of calorie expenditure
	workouts: [workoutSchema],
});

module.exports = mongoose.model("calorieExpend", calorieExpendSchema);
