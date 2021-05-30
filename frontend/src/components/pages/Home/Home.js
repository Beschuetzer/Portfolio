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
				<div className="home__name">
					<div className="home__name-first">Adam &nbsp;</div>
					<div className="home__name-last">&nbsp; Major</div>
					<h5 className="home__third-word">embodies</h5>
				</div>
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
