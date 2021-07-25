import React, { useEffect } from "react";
import { connect, RootStateOrAny } from "react-redux";
import { getRepositories } from "../../actions";
import { getRandomQuote, Quote } from "../../apis/quotes";
import EmbeddedLink from "../../components/EmbeddedLink";
import useClasslistAdder, { ClasslistAdder } from "./useClasslistAdder";
import useSky from "./useSky";

let quoteResult: Quote;
getRandomQuote().then((response) => {
	quoteResult = response;
});

const classListsToSet: ClasslistAdder[] = [
	{
		classnames: [
			"home__name"
		],
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
								href="/examples/bridge"
								openInNewTab={false}
								isLocal={true}>
								Multiplayer Bridge
							</EmbeddedLink>
							<br></br>
							<EmbeddedLink
								addSpaces={false}
								className="home__main-link"
								href="/examples/replay"
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
								href="/resume#work-history">
								Work History
							</EmbeddedLink>
							<br></br>
							<EmbeddedLink
								addSpaces={false}
								className="home__main-link"
								openInNewTab={false}
								isLocal={true}
								href="/resume#skills">
								Skills
							</EmbeddedLink>
							<br></br>
							<EmbeddedLink
								addSpaces={false}
								className="home__main-link"
								openInNewTab={false}
								isLocal={true}
								href="/resume#education">
								Education
							</EmbeddedLink>
							<br></br>
							<EmbeddedLink
								addSpaces={false}
								className="home__main-link"
								openInNewTab={false}
								isLocal={true}
								href="/resume#references">
								References
							</EmbeddedLink>
							<br></br>
							<EmbeddedLink
								addSpaces={false}
								className="home__main-link"
								openInNewTab={false}
								isLocal={true}
								href="/about">
								The Person
							</EmbeddedLink>
						</div>
					</article>

					<article className="home__quote">
						<span className="home__quote-content">
							&lsquo;{quoteResult ? quoteResult.content : null}&rsquo; &nbsp;
							&#8212; &nbsp;
							<span className="home__quote-author">
								{quoteResult ? quoteResult.author : null}
								{/* <br></br> */}
								{/* {quoteResult && quoteResult.tags ? quoteResult.tags : null} */}
								{/* {quoteResult && (quoteResult as any).results ? (quoteResult as any).results : null} */}
							</span>
						</span>
					</article>

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
