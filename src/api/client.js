const defaultHeaders = {
	headers: {
		"Content-Type": "application/json; charset=UTF-8",
	},
};

export const getQuestionsAPIMethod = (success) => {
	return fetch(`/api/v1/question`, {
		...defaultHeaders,
	})
		.then(checkStatus)
		.then(parseJSON)
		.then(success);
};

export const createQuestionAPIMethod = (question, success) => {
	return fetch(`/api/v1/question`, {
		...defaultHeaders,
		method: "POST",
		body: JSON.stringify(question),
	})
		.then(checkStatus)
		.then(parseJSON)
		.then(success);
};

export const updateQuestionByIdAPIMethod = (question, success) => {
	return fetch(`/api/v1/question/${question._id}`, {
		...defaultHeaders,
		method: "PUT", // The method defaults to GET
		body: JSON.stringify(question),
	})
		.then(checkStatus)
		.then(parseJSON)
		.then(success);
};

export const deleteQuestionByIdAPIMethod = (questionId, success) => {
	return fetch(`/api/v1/question/${questionId}`, {
		...defaultHeaders,
		method: "DELETE",
	})
		.then(checkStatus)
		.then(parseJSON)
		.then(success);
};

export const getResponsesAPIMethod = (success) => {
	return fetch(`/api/v1/response`, {
		...defaultHeaders,
	})
		.then(checkStatus)
		.then(parseJSON)
		.then(success);
};
export const getResponseByIdAPIMethod = (questionId, success) => {
	return fetch(`/api/v1/response/${questionId}`, {
		...defaultHeaders,
	})
		.then(checkStatus)
		.then(parseJSON)
		.then(success);
};

export const createResponseByIdAPIMethod = (response, success) => {
	return fetch(`/api/v1/response/${response.question}`, {
		...defaultHeaders,
		method: "POST", // The method defaults to GET
		body: JSON.stringify(response),
	})
		.then(checkStatus)
		.then(parseJSON)
		.then(success);
};

export const uploadImageToCloudinaryAPIMethod = (formData, success) => {
	const cloudName = "roshanpoudel"; // TODO: Write in your own Cloudinary account
	return fetch(`https://api.cloudinary.com/v1_1/${cloudName}/upload`, {
		// We do NOT want to set the default headers – the formData will automatically set the
		// headers to tell the server of the data type (which is different than the JSON
		// standard all the other API calls have been sending
		method: "POST",
		body: formData,
	})
		.then(checkStatus)
		.then(parseJSON)
		.then(success);
};

export const getUserByAPIMethod = (success) => {
	return fetch(`/api/v1/user`, {
		...defaultHeaders,
	})
		.then(checkStatus)
		.then(parseJSON)
		.then(success);
};
export const updateUserByAPIMethod = (user, success) => {
	return fetch(`/api/v1/user`, {
		...defaultHeaders,
		method: "PUT", // The method defaults to GET
		body: JSON.stringify(user),
	})
		.then(checkStatus)
		.then(parseJSON)
		.then(success);
};

function checkStatus(response) {
	if (response.status >= 200 && response.status < 300) {
		return response;
	} else {
		const error = new Error(`HTTP Error: ${response.statusText}`);
		error.status = response.statusText;
		error.response = response;
		console.log(error);
		throw error;
	}
}

function parseJSON(response) {
	return response.json();
}
