import React, { useState, useRef, useEffect } from "react";
import {
	getNutritionInfoByFoodAPIMethod,
	getAutoCompleteByFoodAPIMethod,
	getRestaurantMenuByAPIMethod,
} from "../../api/client.js";
import CircularProgress from "@material-ui/core/CircularProgress";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import _ from "lodash";
import TextField from "@material-ui/core/TextField";
import Autocomplete from "@material-ui/lab/Autocomplete";
import ReactApexChart from "react-apexcharts";

const AutoCompleteCalorieSearch = (props) => {
	// Gets nutrition info from the db and returns the list
	const getNutritionInfo = () => {
		let nutritionList = [0, 0, 0, 0]; // ["Fat", "Fiber", "Protein", "Carbohydrates"]
		if (JSON.stringify(props.foodStateByDate) !== "{}") {
			props.foodStateByDate.foodIntake.map((food) => {
				nutritionList[0] += food.nutrients.FAT;
				nutritionList[1] += food.nutrients.FIBR;
				nutritionList[2] += food.nutrients.PRTN;
				nutritionList[3] += food.nutrients.CARBS;
			});
		}

		return nutritionList;
	};
	// food state
	const [outState, setOutState] = useState("");
	const [options, setOptions] = useState(["Test"]);
	const [open, setOpen] = React.useState(false);
	const loading = open && options.length === 0;
	const [foodToAdd, setFoodToAdd] = useState("");
	const userZip = 11733;

	const [series, setSeries] = useState(getNutritionInfo());

	const [chartOptions, setChartOptions] = useState({
		chart: {
			height: 350,
			type: "radialBar",
		},
		plotOptions: {
			radialBar: {
				dataLabels: {
					name: {
						fontSize: "42px",
					},
					value: {
						fontSize: "16px",
					},
					total: {
						show: true,
						label: "Requirements",
						formatter: function (w) {
							// By default this function returns the average of all series. The below is just an example to show the use of custom formatter function
							return "incomplete";
						},
					},
				},
			},
		},
		labels: ["Fat", "Fiber", "Protein", "Carbohydrates"],
	});

	const formSubmitHandler = (event) => {
		event.preventDefault();
		getNutritionInfoByFoodAPIMethod(foodToAdd, (response) => {
			if (response.parsed[0]) {
				console.log(response.parsed[0]);
				setOutState(response.parsed[0]);
			} else {
				setOutState(response.hints[0]);
				console.log(response.hints[0]);
			}
		});
	};

	const foodTypingHandler = (event) => {
		event.preventDefault();
		setFoodToAdd(event.target.value);
	};
	const fiterFoodNames = (responseObj) => {
		const foodList = [];
		responseObj.hints.forEach((foodObj) => foodList.push(foodObj.food.label));
		return foodList;
	};

	const removeDuplicatesInList = (list) => {
		let s = new Set(list);
		let it = s.values();
		return Array.from(it);
	};

	const findAutoCompleteSearches = (searchText) => {
		// calling autocomplete api
		console.log("Searching for: " + searchText);
		let autocompleteArr = [];
		getAutoCompleteByFoodAPIMethod(searchText, (response) => {
			autocompleteArr = response;
			// getting autocomplete suggestions from restaurants nearby user location (zip)
			getRestaurantMenuByAPIMethod(searchText, userZip, (response) => {
				let restaurantMenus = fiterFoodNames({ ...response });
				let newList = removeDuplicatesInList(
					autocompleteArr.concat(restaurantMenus)
				);
				setOptions(newList);
			});
		});
	};
	// Debounce the calls to a max of 1 per second
	const debouncedAutoCompleteSearch = useRef(
		_.debounce((searchTerm) => findAutoCompleteSearches(searchTerm), 1000)
	).current;

	React.useEffect(() => {
		if (!open) {
			setOptions([]);
		}
	}, [open]);

	useEffect(() => {
		if (foodToAdd !== "") {
			debouncedAutoCompleteSearch(foodToAdd);
		}
	}, [foodToAdd]);

	useEffect(() => {
		setSeries(getNutritionInfo());
	}, [props.foodStateByDate]);
	return (
		<div>
			<Card style={{ backgroundColor: "#fffff", width: "60vw" }}>
				<CardContent>
					<div id="chart">
						<ReactApexChart
							options={chartOptions}
							series={series}
							type="radialBar"
							height={350}
						/>
					</div>
					{options ? options : []}
					<form onSubmit={formSubmitHandler}>
						<div id="form-section">
							<div>
								Food Items in Database for current date: <br />
								{JSON.stringify(props.foodStateByDate) !== "{}"
									? props.foodStateByDate.foodIntake.map((food, index) => {
											return (
												<div key={index}>
													food: {food.foodName} calories: {food.calories} <br />
													CARBS: {food.nutrients.CARBS}
													PRTN: {food.nutrients.PRTN}
													FIBR: {food.nutrients.FIBR}
													FAT: {food.nutrients.FAT}
												</div>
											);
									  })
									: "Nothing availalbe"}
							</div>
							<br />
							<div>Food to add: {foodToAdd}</div>
						</div>
						<div>
							<Autocomplete
								id="asynchronous-demo"
								style={{ width: 300 }}
								open={open}
								onOpen={() => {
									setOpen(true);
								}}
								onClose={() => {
									setOpen(false);
								}}
								// getOptionSelected={(option, value) => option === value}
								getOptionSelected={(option) => option}
								getOptionLabel={(option) => option}
								options={options}
								loading={loading}
								onChange={(event, newValue) => {
									console.log("changing food state");
									setFoodToAdd(newValue);
									formSubmitHandler(event);
								}}
								renderInput={(params) => (
									<TextField
										{...params}
										id="standard-full-width"
										label="Food name"
										style={{ margin: 8 }}
										placeholder="What did you eat today?"
										helperText=""
										fullWidth
										margin="normal"
										value={foodToAdd}
										onChange={foodTypingHandler}
										InputProps={{
											...params.InputProps,
											endAdornment: (
												<React.Fragment>
													{loading ? (
														<CircularProgress color="inherit" size={20} />
													) : null}
													{params.InputendAdornment}
												</React.Fragment>
											),
										}}
									/>
								)}
							/>
						</div>
					</form>
				</CardContent>
			</Card>
		</div>
	);
};

export default AutoCompleteCalorieSearch;
