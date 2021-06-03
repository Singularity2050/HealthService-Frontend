import "./App.css";
import Log from "./Components/LogDay/Log";
import React, { useState, useEffect } from "react";
import Questions from "./Components/EditQuestions/Questions";
import { Route, Switch } from "react-router-dom";
import { getQuestionsAPIMethod, getUserByAPIMethod } from "./api/client.js";
import Data from "./Components/Data";
import Profile from "./Components/Profile/Profile";

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
	const [userState, setUserState] = useState(defaultUser);

	// useEffect(async () => {
	// 	await getQuestionsAPIMethod((questions) => {
	// 		setQuestionState(questions);
	// 	});
	// 	await getUserByAPIMethod((user) => {
	// 		setUserState(user);
	// 	});
	// }, [isDataState]);

	return (
		<div className="App">
			<Switch>
				<Route
					path="/"
					exact
					render={(props) => (
						<Log
							{...props}
							questionState={questionState}
							userState={userState}
							setUserState={setUserState}
						/>
					)}
				/>
				<Route
					path="/questions"
					exact
					render={(props) => (
						<Questions
							{...props}
							questionState={questionState}
							setQuestionState={setQuestionState}
							isDataState={isDataState}
							setIsDataStale={setIsDataStale}
							userState={userState}
							setUserState={setUserState}
						/>
					)}
				/>
				<Route
					path="/log"
					exact
					render={(props) => (
						<Data
							{...props}
							questionState={questionState}
							userState={userState}
							setUserState={setUserState}
						/>
					)}
				/>
				<Route
					path="/profile"
					exact
					render={(props) => (
						<Profile
							{...props}
							userState={userState}
							setUserState={setUserState}
							isDataState={isDataState}
							setIsDataStale={setIsDataStale}
						/>
					)}
				/>
			</Switch>
		</div>
	);
}

export default App;
