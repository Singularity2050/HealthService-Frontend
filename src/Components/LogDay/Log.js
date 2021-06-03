import React, { useState } from "react";
import Nav from "../Nav/Nav";
import Calendar from "./Calendar";
import FormRow from "./FormRow";
import { createResponseByIdAPIMethod } from "../../api/client.js";
import CustomizedSnackbars from "../../util/Alert";


const Log = (props) => {
	// Returns current date as string
	const addDate = () => {
		let date = new Date();
		date =
			date.getMonth() + 1 + "/" + date.getDate() + "/" + date.getFullYear();
		return date;
	};
	// Date State
	const [dateState, setDateState] = useState(addDate());

	// Form state
	const [formDataState, setFormDataState] = useState({});

	const formSubmitHandler = (event) => {
		event.preventDefault();
		for (const qnId in formDataState) {
			const value = formDataState[qnId];
			if (value) {
				const responseObj = {
					response: value,
					question: qnId,
					date: dateState,
				};
				// console.log(responseObj);
				createResponseByIdAPIMethod(responseObj, (response) => {
					console.log();
				});
			}
		}
	};

	return (
		<div>
			<Nav userState={props.userState} />
			<div id="body-items">
				<Calendar dateState={dateState} setDateState={setDateState} />
				<form onSubmit={formSubmitHandler}>
					<div id="form-section">
						{props.questionState.map((question, index) => {
							return (
								<FormRow
									question={question}
									key={index}
									formDataState={formDataState}
									setFormDataState={setFormDataState}
								/>
							);
						})}

						<div>
							{/*<input type="submit" value="Save" className="save-button right" />*/}
							{CustomizedSnackbars()}
						</div>
					</div>
				</form>
			</div>
		</div>
	);
};

export default Log;
