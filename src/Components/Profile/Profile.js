import React from "react";
import Nav from "../Nav/Nav";
import {
	uploadImageToCloudinaryAPIMethod,
	updateUserByAPIMethod,
} from "../../api/client";
import {GoogleLogout} from "react-google-login";

const Profile = (props) => {
	const defaultImage =
		"https://res.cloudinary.com/roshanpoudel/image/upload/v1620734424/userProfileImages/defaultImage.svg";

	const onSubmitHandler = (e) => {
		e.preventDefault();
		updateUserByAPIMethod(props.userState, (response) => {
			console.log();
		});
	};
	const userData = JSON.parse(sessionStorage.getItem('userData'));
	const logout = (res) =>{
		sessionStorage.clear();
		window.location.href = '/';
	}
	const imageChangeHandler = (e) => {
		e.preventDefault();
		if (e.target.files && e.target.files[0]) {
			const selectedFile = e.target.files[0];
			const formData = new FormData();

			const unsignedUploadPreset = "jackSparrow";
			formData.append("file", selectedFile);
			formData.append("upload_preset", unsignedUploadPreset);

			uploadImageToCloudinaryAPIMethod(formData, (response) => {
				console.log("Upload success");

				// Now the URL gets saved to the author
				const updatedUser = {
					...props.userState,
					profileImageURL: response.url,
				};
				props.setUserState(updatedUser);
				console.log(updatedUser);
				// Now we want to make sure this is updated on the server – either the
				// user needs to click the submit button, or we could trigger the server call here
			});
		}
	};

	const removeImageHandler = (e) => {
		e.preventDefault();
		const updatedUser = {
			...props.userState,
			profileImageURL: defaultImage,
		};
		props.setUserState(updatedUser);
	};

	const nameChangeHandler = (e) => {
		const updatedUser = {
			...props.userState,
			name: e.target.value,
		};
		props.setUserState(updatedUser);
	};

	const emailChangeHandler = (e) => {
		const updatedUser = {
			...props.userState,
			email: e.target.value,
		};
		props.setUserState(updatedUser);
	};

	const streetAddressChangeHandler = (e) => {
		const updatedUser = {
			...props.userState,
		};
		updatedUser.address[0].streetAddress = e.target.value;
		props.setUserState(updatedUser);
	};

	const fullAddressChangeHandler = (e) => {
		const updatedUser = {
			...props.userState,
		};
		updatedUser.address[0].fullAddress = e.target.value;
		props.setUserState(updatedUser);
	};

	return (
		<div>
			<Nav userState={props.userState} />
			<div id="body-items">
				<div id="questions-title">
					<h2>Edit Profile</h2>
				</div>
				<div id="form-section">
					<form onSubmit={onSubmitHandler}>
						<div className="form-row">
							<div>
								<h3>Profile Photo</h3>
							</div>
							<div id="edit-image">
								<img
									src={ userData.imageUrl || defaultImage}
									id="image"
									alt="User"
								/>
								<label htmlFor="file">Choose new image</label>
								<input
									type="file"
									name="file"
									accept="image/*"
									onChange={imageChangeHandler}
									id="file"
								/>

								<div className="underlined" onClick={removeImageHandler}>
									Remove Image
								</div>
							</div>
						</div>
						<div className="form-row">
							<h3>Name</h3>
							<input
								type="text"
								name="user-name"
								value={userData.name || ""}
								placeholder="Your Name"
								onChange={nameChangeHandler}
								required
							></input>
						</div>
						<div className="form-row">
							<h3>Email</h3>
							<input
								type="email"
								name="user-email"
								className="input"
								value={ userData.email || ""}
								placeholder="Your Email Address"
								onChange={emailChangeHandler}
								required
							></input>
						</div>
						<div className="form-row">
							<div>
								<h3>Address</h3>
							</div>
							<div>
								<input
									type="text"
									name="street-addr"
									placeholder="Street Address"
									value={props.userState.address[0].streetAddress || ""}
									onChange={streetAddressChangeHandler}
									required
								></input>
							</div>

							<div className="form-row-second">
								<input
									type="text"
									name="street-addr"
									placeholder="Full Address"
									value={props.userState.address[0].fullAddress || ""}
									onChange={fullAddressChangeHandler}
									required
								></input>
							</div>
						</div>
						<div id="profile-logout">
							<input type="submit" value="Save" className="save-button" />
								<GoogleLogout
									clientId="547391741830-p8ru0i3urt5bhnt5nqief36ns3n20gqv.apps.googleusercontent.com"
									buttonText="Logout"
									style="display:none"
									className="logout"
									onLogoutSuccess={logout}
								>
								</GoogleLogout>
						</div>
					</form>
				</div>
			</div>
		</div>
	);
};

export default Profile;
