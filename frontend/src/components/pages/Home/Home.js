import React, { useEffect } from "react";
import { connect } from "react-redux";
import { getRepositories } from "../../../actions";

import { animate as animateBackground } from './BackgroundThreeJS';
import { animate as animateSky } from './OceanSky';

const Home = ({repos, getRepositories}) => {
	const HOME_CANVAS_CLASSNAME = 'home__canvas';
	//Getting Repos
	useEffect(() => {
		if (!repos || repos.length === 0) getRepositories();
	}, [repos, getRepositories]);

	//Starting ThreeJS animation
	useEffect(() => {
		// animateBackground(HOME_CANVAS_CLASSNAME);
		animateSky();
	}, [])

	return (
		<React.Fragment>
			<section className="home">
			</section>
		</React.Fragment>
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
