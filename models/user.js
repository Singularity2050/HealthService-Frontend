const mongoose = require("mongoose");

const heightSchema = new mongoose.Schema({
	feet: Number, //height in feet
	inches: Number, // height in inches
});

const userPhysicalSchema = new mongoose.Schema({
	height: heightSchema, // {feet: 6, inches: 1}
	weight: Number, // Weight in KGs
	dob: Date, // Date of birth (To calculate age)
	gender: String, // gender of the user
});

const AddressSchema = new mongoose.Schema({
	streetAddress: String, // Ex: 119-7 Songdo Moonhwa Ro
	fullAddress: String, // Ex: Incheon, South Korea
	zip: Number,
});

const UserSchema = new mongoose.Schema({
	name: String, // User's Name
	email: String, // User's Email
	imageUrl: String, // URL for User's Profile Image
	physicals: userPhysicalSchema, // Physical info of the user
	isAdmin: Boolean,
	address: AddressSchema,
});

module.exports = mongoose.model("User", UserSchema);
