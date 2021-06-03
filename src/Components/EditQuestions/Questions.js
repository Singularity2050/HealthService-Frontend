import React from "react";
import Nav from "../Nav/Nav";
import FormRowEdit from "./FormRowEdit";
import AddCircleOutlineIcon from "@material-ui/icons/AddCircleOutline";
import { createQuestionAPIMethod } from "../../api/client.js";

const Questions = (props) => {
	console.log(props);
	// Adds a question to the form
	const addBtnHandler = async () => {
		let currentState = [...props.questionState];
		let newQuestion = {
			answerType: "multiple-choice",
			text: "Add your question here",
			multipleChoiceResponses: ["Option 1", "Option 2", "Option 3"],
		};
		currentState.push(newQuestion);
		createQuestionAPIMethod(newQuestion, (response) => {
			console.log();
		});
		// change state after 50 ms to account for delay in db communication
		setTimeout(() => {
			props.setIsDataStale(!props.isDataState);
		}, 50);
	};

	return (
		<div>
			<Nav userState={props.userState} />
			<div id="body-items">
				<div id="questions-title">
					<h2>{props.userState.name}'s Questions</h2>
					<AddCircleOutlineIcon id="add-btn" onClick={addBtnHandler} />
				</div>

				<form action="#" method="">
					<div id="form-section">
						{props.questionState.map((question, index) => {
							return (
								<FormRowEdit
									question={question}
									questionState={props.questionState}
									setQuestionState={props.setQuestionState}
									key={index}
									index={index}
								/>
							);
						})}
					</div>
				</form>
			</div>
		</div>
	);
};

export default Questions;
