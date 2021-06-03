const express = require("express"),
	mongoose = require("mongoose"),
	bodyParser = require("body-parser"),
	app = express(),
	uri =
		"mongodb+srv://jack:sparrow@cluster0.grizy.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";

// Database setup
mongoose
	.connect(uri, {
		useNewUrlParser: true,
		useUnifiedTopology: true,
	})
	.then(() => console.log("Connected to MongoDB!"))
	.catch((error) => console.log(error.message));
mongoose.set("useNewUrlParser", true);
mongoose.set("useFindAndModify", false);
mongoose.set("useCreateIndex", true);
mongoose.set("useUnifiedTopology", true);

// App settings
app.set("port", process.env.PORT || 7777);
app.use(bodyParser.json());

// setting up Routes
const foodRoute = require("./routes/food"),
	workoutRoute = require("./routes/workout"),
	userRoute = require("./routes/user");

// Adding Routes
app.get("/", (req, res) => {
	res.send(
		"<center><h1>The Express API for Fitness App is up and running!!</h1><center>"
	);
});

// Using routes
app.use(foodRoute);
app.use(workoutRoute);
app.use(userRoute);

app.listen(app.get("port"), () => {
	console.log(
		`Fitness App Backend Server has started at http://localhost:${app.get(
			"port"
		)}`
	);
});
