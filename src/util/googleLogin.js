export const responseFailGoogle = (r) => {
	loginStatus("Login Failed");
};
export const loginStatus = () => {
	const failureText = document.getElementById("failure");
	failureText.innerText = "Login Failure";
	const removeText = failureText.childNodes[0];
	setTimeout(function () {
		removeText.remove();
	}, 2000);
};
export const logout = () => {
	sessionStorage.removeItem("userData");
	window.location.href = "/";
};
export const isLoggedIn = () => {
	if (sessionStorage.getItem("userData") === null) {
		return false;
	} else {
		return true;
	}
};
export const loginAlert = () => {
	window.location.href = "/";
	alert("Please Login");
};
