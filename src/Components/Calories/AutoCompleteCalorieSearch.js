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
import ReactApexChart from "react-apexcharts";

const AutoCompleteCalorieSearch = (props) => {
	// food state
	const [outState, setOutState] = useState("");
	const [options, setOptions] = useState(["Test"]);
	const [open, setOpen] = React.useState(false);
	const loading = open && options.length === 0;
	const [foodState, setFoodState] = useState("");
	const userZip = 11733;

	const [series, setSeries] = useState([44, 55, 67, 83]);

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

	// Date State

	const formSubmitHandler = (event) => {
		event.preventDefault();
		getNutritionInfoByFoodAPIMethod(foodState, (response) => {
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
		setFoodState(event.target.value);
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
		if (foodState !== "") {
			debouncedAutoCompleteSearch(foodState);
		}
	}, [foodState]);
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
							<div>Food: {foodState}</div>
							<div>
								Calories: {outState ? outState.food.nutrients.ENERC_KCAL : ""}
								Carbs: {outState ? outState.food.nutrients.CHOCDF : ""}
								Protein: {outState ? outState.food.nutrients.PROCNT : ""}
								Fat: {outState ? outState.food.nutrients.FAT : ""}
								Fiber: {outState ? outState.food.nutrients.FIBTG : ""}
							</div>
						</div>
					</form>
				</CardContent>
			</Card>
		</div>
	);
};

export default AutoCompleteCalorieSearch;
