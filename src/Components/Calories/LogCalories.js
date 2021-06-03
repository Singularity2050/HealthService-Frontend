import React, { useState, useEffect } from "react";
import Calendar from "../LogDay/Calendar";
import Nav from "../Nav/Nav";
import AutoCompleteCalorieSearch from "./AutoCompleteCalorieSearch";
import ReactCardFlip from "react-card-flip";
import { makeStyles } from "@material-ui/core/styles";
import CircularProgress from "@material-ui/core/CircularProgress";
import LoadingCard from "../Loading/LoadingCard";

const LogCalories = (props) => {
	// Returns current date as string
	const addDate = () => {
		let date = new Date();
		date =
			date.getMonth() + 1 + "/" + date.getDate() + "/" + date.getFullYear();
		return date;
	};

	const flipHandler = (e) => {
		e.preventDefault();
		setIsFlipped(!isFlipped);
	};
	const [dateState, setDateState] = useState(addDate());
	const [isFlipped, setIsFlipped] = useState(false); //card flip state
	const [foodStateByDate, setFoodStateByDate] = useState(""); // daily food intake state
	const [isFoodStateLoading, setIsFoodStateLoading] = useState(true); // is daily food info fetched from db?

	useEffect(() => {
		if (foodStateByDate !== "") {
			setIsFoodStateLoading(false);
		}
	}, [isFoodStateLoading]);

	return (
		<div>
			<Nav userState={props.userState} />
			<div id="body-items">
				<Calendar
					dateState={dateState}
					setDateState={setDateState}
					flipHandler={flipHandler}
					foodStateByDate={foodStateByDate}
					setFoodStateByDate={setFoodStateByDate}
					userState={props.userState}
					setUserState={props.setUserState}
					isUserLoading={props.isUserLoading}
					setIsUserLoading={props.setIsUserLoading}
					setIsFoodStateLoading={setIsFoodStateLoading}
				/>
				{props.isUserLoading || isFoodStateLoading ? (
					<LoadingCard />
				) : (
					<AutoCompleteCalorieSearch
						flipHandler={flipHandler}
						dateState={dateState}
						foodStateByDate={foodStateByDate}
						setFoodStateByDate={setFoodStateByDate}
					/>
					// <ReactCardFlip
					// 	isFlipped={isFlipped}
					// 	flipDirection="vertical"
					// 	infinite={true}
					// >
					// 	<AutoCompleteCalorieSearch
					// 		flipHandler={flipHandler}
					// 		dateState={dateState}
					// 		foodStateByDate={foodStateByDate}
					// 		setFoodStateByDate={setFoodStateByDate}
					// 	/>
					// 	<AutoCompleteCalorieSearch
					// 		flipHandler={flipHandler}
					// 		dateState={dateState}
					// 		foodStateByDate={foodStateByDate}
					// 		setFoodStateByDate={setFoodStateByDate}
					// 	/>
					// </ReactCardFlip>
				)}
			</div>
		</div>
	);
};

export default LogCalories;
