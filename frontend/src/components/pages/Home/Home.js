import React, { useEffect } from "react";
import { connect } from "react-redux";
import { getRepositories } from "../../../actions";

import { animate } from './BackgroundThreeJS';

const Home = ({repos, getRepositories}) => {
	const HOME_CANVAS_CLASSNAME = 'home__canvas';
	//Getting Repos
	useEffect(() => {
		if (!repos || repos.length === 0) getRepositories();
	}, [repos, getRepositories]);

	//Starting ThreeJS animation
	useEffect(() => {
		animate(HOME_CANVAS_CLASSNAME);
	}, [])

	return (
		<section className="home">
			<canvas className={HOME_CANVAS_CLASSNAME}></canvas>
		</section>
	);
}

const mapStateToProps = (state, ownProps) => {
	return {
		repos: state.general.repos,
	};
};

export default connect(mapStateToProps, {
	getRepositories,
})(Home);
