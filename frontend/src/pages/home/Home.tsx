import React, { useEffect } from "react";
import { connect, RootStateOrAny } from "react-redux";
import { getRepositories } from "../../actions";
import EmbeddedLink from "../../components/EmbeddedLink";
import useClasslistAdder from "./useClasslistAdder";
import useSky from './useSky';

interface HomeProps {
	repos: [];
	getRepositories: () => void;
}

const Home: React.FC<HomeProps> = ({repos, getRepositories}) => {
	//Getting Repos
	useEffect(() => {
		if (!repos || repos.length === 0) getRepositories();
	}, [repos, getRepositories]);

	useClasslistAdder();
	useSky();

	return (
		<React.Fragment>
			<section className="home">
				<div className="home__name">
					<h3 className="home__name-first">&nbsp;Adam&nbsp;</h3>
					<h3 className="home__name-last">&nbsp;Major&nbsp;</h3>
					<h5 className="home__third-word">embodies</h5>
				</div>
				<div className="home__main">

					<div className="home__main-bottom">
						This site was created with React, Redux, Express, ThreeJS, and custom SASS/CSS.
					</div>

					<div className="home__main-left">
						Not sure where to start?&nbsp; Check out the <EmbeddedLink className="home__main-link" href="/examples/bridge" isLocal={true}>multiplayer app </EmbeddedLink>I created.
					</div>

					<div className="home__main-right">
						Click, hover, and<EmbeddedLink className="home__main-link" isLocal={true} href="contact">get in touch</EmbeddedLink>when you're ready.
					</div>

					{/* <div className="home__main-description">
						This site was created with React, Redux, and custom CSS
					</div>
					<div className="home__main-cta">
						Click, hover, and get in touch when you're ready.
					</div> */}
				</div>
				
			</section>
		</React.Fragment>
	);
}

const mapStateToProps = (state: RootStateOrAny) => {
	return {
		repos: state.general.repos,
	};
};

export default connect(mapStateToProps, {
	getRepositories,
})(Home);
