import "./App.css";

import React, { useState, useEffect } from "react";
import Questions from "./Components/EditQuestions/Questions";
import { Route, Switch } from "react-router-dom";
import Data from "./Components/Data";
import Profile from "./Components/Profile/Profile";
import { isLoggedIn, loginAlert } from "./util/googleLogin";
import Main from "./Components/Main";
import LogCalories from "./Components/Calories/LogCalories";
import { getUserStateByEmailAPIMethod } from "./api/client.js";

function App() {
	const defaultUser = {
		name: "",
		email: "",
		address: [
			{
				streetAddress: "",
				fullAddress: "",
			},
		],
		profileImageURL: "",
	};
	const [questionState, setQuestionState] = useState([]);
	const [isDataState, setIsDataStale] = useState(false);
	const [userState, setUserState] = useState(
		isLoggedIn() ? JSON.parse(sessionStorage.getItem("userData")) : defaultUser
	);
	const [isUserLoading, setIsUserLoading] = useState(true);
	// const [userState, setUserState] = useState(
	// 	JSON.parse(sessionStorage.getItem("userData"))
	// );

	// useEffect(() => {
	// 	getQuestionsAPIMethod((questions) => {
	// 		setQuestionState(questions);
	// 	});
	// 	getUserByAPIMethod((user) => {
	// 		setUserState(user);
	// 	});
	// }, [isDataState]);

	useEffect(() => {
		if (isLoggedIn()) {
			getUserStateByEmailAPIMethod(
				JSON.parse(sessionStorage.getItem("userData")).email,
				(response) => {
					setUserState(response);
				}
			);
		}
	}, []);

	useEffect(() => {
		if (userState && userState._id) {
			console.log("userState updated from db");
			console.log(userState);
			setIsUserLoading(false);
		}
	}, [userState]);

	return (
		<div className="App">
			<Switch>
				<Route path="/" exact render={(props) => <Main {...props} />} />
				<Route
					path="/calories"
					exact
					render={(props) => (
						<LogCalories
							{...props}
							userState={userState}
							setUserState={setUserState}
							isUserLoading={isUserLoading}
							setIsUserLoading={setIsUserLoading}
						/>
					)}
				/>
				<Route
					path="/questions"
					exact
					render={(props) =>
						isLoggedIn() ? (
							<Questions
								{...props}
								questionState={questionState}
								setQuestionState={setQuestionState}
								isDataState={isDataState}
								setIsDataStale={setIsDataStale}
								userState={userState}
								setUserState={setUserState}
							/>
						) : (
							loginAlert()
						)
					}
				/>
				<Route
					path="/view"
					exact
					render={(props) =>
						isLoggedIn() ? (
							<Data
								{...props}
								questionState={questionState}
								userState={userState}
								setUserState={setUserState}
							/>
						) : (
							loginAlert()
						)
					}
				/>
				<Route
					path="/profile"
					exact
					render={(props) =>
						isLoggedIn() ? (
							<Profile
								{...props}
								userState={userState}
								setUserState={setUserState}
								isDataState={isDataState}
								setIsDataStale={setIsDataStale}
								isUserLoading={isUserLoading}
								setIsUserLoading={setIsUserLoading}
							/>
						) : (
							loginAlert()
						)
					}
				/>
			</Switch>
		</div>
	);
}

export default App;
