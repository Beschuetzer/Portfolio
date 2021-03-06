import React, { useEffect } from "react";
import { connect, RootStateOrAny } from "react-redux";
import { getRepositories } from "../../actions";
import { getRandomQuote, Quote } from "../../apis/quotes";
import {
	ABOUT_URL,
	BRIDGE_URL,
	REPLAY_VIEWER_URL,
	RESUME_URL,
} from "../../components/constants";
import EmbeddedLink from "../../components/EmbeddedLink";
import useClasslistAdder, { ClasslistAdder } from "./useClasslistAdder";
import useSky from "./useSky";

let quoteResult: Quote;
getRandomQuote().then((response) => {
	quoteResult = response;
});

const classListsToSet: ClasslistAdder[] = [
	{
		classnames: ["home__name"],
		classesToAdd: ["visible"],
	},
	{
		classnames: ["home__name-first", "home__name-last", "home__third-word"],
		classesToAdd: ["home__animation-ease-in-out-back"],
	},
	{
		classnames: [
			"home__main-left",
			"home__main-right",
			"home__main-bottom",
			"home__quote",
		],
		classesToAdd: ["home__animation-ease"],
	},
];

interface HomeProps {
	repos: [];
	getRepositories: () => void;
}

const Home: React.FC<HomeProps> = ({ repos, getRepositories }) => {
	//Getting Repos
	useEffect(() => {
		if (!repos || repos.length === 0) getRepositories();
	}, [repos, getRepositories]);

	useClasslistAdder(classListsToSet);
	useSky();

	function getQuoteJSX() {
		const content = quoteResult ? quoteResult.content : null;
		const author = quoteResult ? `${quoteResult.author} ` : null;

		return (
			<article className="home__quote">
				<span className="home__quote-content">
					&lsquo;{content}&rsquo; &nbsp; 
					<div className="home__quote-author">&#8212; &nbsp; {author} </div>
				</span>
			</article>
		);
	}

	return (
		<React.Fragment>
			<section className="home">
				<article className="home__name">
					<h3 className="home__name-first">&nbsp;Adam&nbsp;</h3>
					<h3 className="home__name-last">&nbsp;Major&nbsp;</h3>
					<h5 className="home__third-word">embodies</h5>
				</article>
				<div className="home__main">
					<article className="home__main-bottom">
						This site was created with React, Redux, Express, ThreeJS, and
						custom SASS/CSS.
					</article>

					<article className="home__main-left">
						<div className="home__main-left-content">
							<span className="home__content-header">Explore: </span>
							<br></br>
							<EmbeddedLink
								addSpaces={false}
								className="home__main-link"
								href={BRIDGE_URL}
								openInNewTab={false}
								isLocal={true}>
								Multiplayer Bridge
							</EmbeddedLink>
							<br></br>
							<EmbeddedLink
								addSpaces={false}
								className="home__main-link"
								href={REPLAY_VIEWER_URL}
								openInNewTab={false}
								isLocal={true}>
								Replay Viewer
							</EmbeddedLink>
						</div>
					</article>

					<article className="home__main-right">
						<div className="home__main-right-content">
							<span className="home__content-header">Experience: </span>
							<br></br>
							<EmbeddedLink
								addSpaces={false}
								className="home__main-link"
								openInNewTab={false}
								isLocal={true}
								href={`${RESUME_URL}#work-history`}>
								Work History
							</EmbeddedLink>
							<br></br>
							<EmbeddedLink
								addSpaces={false}
								className="home__main-link"
								openInNewTab={false}
								isLocal={true}
								href={`${RESUME_URL}#skills`}>
								Skills
							</EmbeddedLink>
							<br></br>
							<EmbeddedLink
								addSpaces={false}
								className="home__main-link"
								openInNewTab={false}
								isLocal={true}
								href={`${RESUME_URL}#education`}>
								Education
							</EmbeddedLink>
							<br></br>
							<EmbeddedLink
								addSpaces={false}
								className="home__main-link"
								openInNewTab={false}
								isLocal={true}
								href={`${RESUME_URL}#references`}>
								References
							</EmbeddedLink>
							<br></br>
							<EmbeddedLink
								addSpaces={false}
								className="home__main-link"
								openInNewTab={false}
								isLocal={true}
								href={ABOUT_URL}>
								The Person
							</EmbeddedLink>
						</div>
					</article>

					{getQuoteJSX()}

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
};

const mapStateToProps = (state: RootStateOrAny) => {
	return {
		repos: state.general.repos,
	};
};

export default connect(mapStateToProps, {
	getRepositories,
})(Home);
