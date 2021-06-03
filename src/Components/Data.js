import React, { useEffect, useState } from "react";
import Nav from "./Nav/Nav";
import { getResponsesAPIMethod } from "../api/client.js";

const Data = async (props) => {
	let [responseState, setResponseState] = useState([]);
	useEffect(() => {
		getResponsesAPIMethod((response) => {
			setResponseState(response);
		});
	}, []);

	const findQuestion = (id) => {
		for (let i = 0; i < props.questionState.length; i++) {
			if (props.questionState[i]._id === id) {
				return props.questionState[i].text;
			}
		}
	};

	const getDate = (dateStr) => {
		const date = new Date(dateStr);
		return (
			date.getMonth() + 1 + "/" + date.getDate() + "/" + date.getFullYear()
		);
	};

	return (
		<div>
			<Nav userState={props.userState} />
			<div id="temp-page">
				{responseState.map((response, index) => {
					return (
						<div key={index} className="inside-items">
							<div>Question: {findQuestion(response.question)}</div>
							<div>Response: {response.response}</div>
							<div>Created on: {getDate(response.date)}</div>
						</div>
					);
				})}
			</div>
		</div>
	);
};

export default Data;
