import React, { useEffect } from "react";
import { connect } from "react-redux";
import { getRepositories } from "../../../actions";

import useSky from './useSky.ts';

const Home = ({repos, getRepositories}) => {
	//Getting Repos
	useEffect(() => {
		if (!repos || repos.length === 0) getRepositories();
	}, [repos, getRepositories]);

	useSky();

	return (
		<React.Fragment>
			<section className="home">
				<div className="home__first-name">Adam</div>
				<div className="home__last-name">Major</div>
				<div className="home__third-word">values</div>
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
