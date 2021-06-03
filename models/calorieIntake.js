const mongoose = require("mongoose");

const foodSchema = new mongoose.Schema({
	foodName: String, // Apple
	calories: Number, // Calories (Kcal)
	nutrients: {
		CARBS: Number, // Carbohydrates (gm)
		PRTN: Number, // Protein (gm)
		FIBR: Number, // Fiber (gm)
		FAT: Number, // Fat (gm)
	},
});

const calorieIntakeSchema = new mongoose.Schema({
	user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
	date: Date, // date of food intake
	foodIntake: [foodSchema],
});

module.exports = mongoose.model("calorieIntake", calorieIntakeSchema);
