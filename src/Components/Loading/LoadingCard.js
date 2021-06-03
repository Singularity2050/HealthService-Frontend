import React, { useState, useRef, useEffect } from "react";
// import Card from "@material-ui/core/Card";
// import CardContent from "@material-ui/core/CardContent";
import { makeStyles } from "@material-ui/core/styles";
import CircularProgress from "@material-ui/core/CircularProgress";

const useStyles = makeStyles((theme) => ({
	root: {
		display: "flex",
		height: "100px",
		"& > * + *": {
			marginLeft: theme.spacing(2),
		},
	},
}));

const LoadingCard = (props) => {
	const classes = useStyles();

	return (
		<div className={classes.root}>
			<CircularProgress />
		</div>
	);
};

export default LoadingCard;
