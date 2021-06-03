import React from "react";

const FormRow = (props) => {
	const formInputHandler = (e) => {
		let currFormState = { ...props.formDataState };
		currFormState[e.target.name] = e.target.value;
		props.setFormDataState(currFormState);
	};

	// Returns JSX with appropriate input options according to type
	const getInputFormat = (qid) => {
		if (props.question.answerType === "text") {
			return <input type="text" name={qid} onChange={formInputHandler}></input>;
		} else if (props.question.answerType === "boolean") {
			return (
				<div className="boolean-selectors">
					<div>
						<input
							type="radio"
							value="True"
							name={qid}
							onChange={formInputHandler}
						/>
						True
					</div>
					<div>
						<input
							type="radio"
							value="False"
							name={qid}
							onChange={formInputHandler}
						/>
						False
					</div>
				</div>
			);
		} else if (props.question.answerType === "number") {
			return (
				<input type="number" name={qid} onChange={formInputHandler}></input>
			);
		} else {
			return (
				<div className="multiple-selectors">
					{props.question.multipleChoiceResponses.map((option, index) => {
						return (
							<div key={index}>
								<input
									type="radio"
									value={option}
									name={qid}
									onChange={formInputHandler}
								/>
								{option}
							</div>
						);
					})}
				</div>
			);
		}
	};
	return (
		<div className="form-row">
			<div>{props.question.text}</div>
			<div>{getInputFormat(props.question._id)}</div>
		</div>
	);
};

export default FormRow;
