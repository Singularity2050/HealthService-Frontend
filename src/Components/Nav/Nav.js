import React,{ useState } from "react";
import Header from "./Header";
import headerStyle from "../../util/headerStyle";
import HeaderLinks from "./HeaderLinks";

const Nav = () => {

	return (
		<Header props={headerStyle.info}/>
	);
};

export default Nav;
