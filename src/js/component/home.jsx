import React, { setState } from "react";
import { Todolist } from "./Todolist";

//include images into your bundle
//import rigoImage from "../../img/rigo-baby.jpg";

//create your first component
export const Home = () => {
	return (
		<div className="big-container">
			<div>
				<Todolist />
			</div>
		</div>
	);
};
