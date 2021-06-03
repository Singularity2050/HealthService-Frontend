/*eslint-disable*/
import React, { useState } from "react";
import DeleteIcon from "@material-ui/icons/Delete";
import IconButton from "@material-ui/core/IconButton";
// react components for routing our app without refresh
import { Link, NavLink } from "react-router-dom";
import { GoogleLogin, useGoogleLogout } from "react-google-login";
import { responseFailGoogle, logout } from "../../util/googleLogin";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import Tooltip from "@material-ui/core/Tooltip";

// @material-ui/icons
import { Apps, CloudDownload } from "@material-ui/icons";
import logo from "../../images/logo-2.jpg";
// core components
import CustomDropdown from "./CustomDropdown.js";
import Button from "./Button.js";

import styles from "../../util/headerLinkStyle";
import headerStyle from "../../util/headerStyle";

const useStyles = makeStyles(styles);

export default function HeaderLinks(props) {
	const defaultImage =
		"https://res.cloudinary.com/roshanpoudel/image/upload/v1620734424/userProfileImages/defaultImage.svg";

	///////////////////////////////////////Google Login Function////////////////////////////////////////////////
	const [image, setImage] = useState();
	//sign out hook
	const { signOut, signOutLoaded } = useGoogleLogout({
		clientId:
			"547391741830-p8ru0i3urt5bhnt5nqief36ns3n20gqv.apps.googleusercontent.com",
		buttonText: "Logout",
		Style: "display:none",
		className: "logout",
		onLogoutSuccess: { logout },
	});
	//signIn response
	const responseGoogle = (response) => {
		document.getElementById("googleLogin").style = "display:none";
		document.getElementById("googleHide").style = "display:block";
		setImage(response.profileObj.imageUrl);
		//Timing to renew access token
		let expired_at = 24 * 60 * 1000; //One Day
		//add expiration information
		response.profileObj.expired_at = expired_at;
		//store in session Storage
		sessionStorage.setItem("userData", JSON.stringify(response.profileObj));
		const timeOut = async () => {
			const sessionClear = () => sessionStorage.removeItem("userData");
			await setTimeout(sessionClear, expired_at);
			await setTimeout(signOut, expired_at);
		};
		//start Counting
		timeOut().then((r) => {
			console.log("session started");
		});
	};
	/////////////////////////////////////////////////////////////////////////////////////////////////////////
	const classes = useStyles();

	const style = {
		height: "50px",
		borderRadius: "10px",
	};
	return (
		<>
			<List className={classes.list}>
				<ListItem className={classes.listItem}>
					{/* <NavLink
							to="/main"
							activeClassName="active-link"
							className="logo alink"
						>
							<img id="logo" style={style} src={logo} />
						</NavLink> */}
					<NavLink to="/" activeClassName="active-link" className="logo alink">
						<h2 className="logo-text">Fitness++</h2>
					</NavLink>
				</ListItem>
				<ListItem className={classes.listItem}>
					<Button
						href="/calories"
						color="transparent"
						className={classes.navLink}
					>
						Log Calories
					</Button>
				</ListItem>
				<ListItem className={classes.listItem}>
					<Button
						href="./questions"
						color="transparent"
						className={classes.navLink}
					>
						Edit Questions
					</Button>
				</ListItem>
				<ListItem className={classes.listItem}>
					<Button color="transparent" href="/view" className={classes.navLink}>
						View Data
					</Button>
				</ListItem>
			</List>
			<div id="googleLogin">
				<GoogleLogin
					clientId="547391741830-p8ru0i3urt5bhnt5nqief36ns3n20gqv.apps.googleusercontent.com"
					buttonText="Login"
					onSuccess={responseGoogle}
					onFailure={responseFailGoogle}
					cookiePolicy={"single_host_origin"}
					className="login"
					isSignedIn={true}
				/>
				<p id="failure"></p>
			</div>
			<div id="googleHide">
				{image === undefined ? (
					<a href="./profile">
						<img src={defaultImage} id="image" alt="User" />
					</a>
				) : (
					<a href="./profile">
						<img src={image} id="image" alt="User" />
					</a>
				)}
			</div>
		</>
	);
}
