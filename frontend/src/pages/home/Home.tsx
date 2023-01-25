import React, { useEffect, useRef, useState } from "react";
import { connect, RootStateOrAny } from "react-redux";
import { getRepositories } from "../../actions";
import { getRandomQuote, Quote, QuoteableAuthors, QuoteTags } from "../../apis/quotes";
import {
	ABOUT_URL,
	BRIDGE_URL,
	REPLAY_VIEWER_URL,
	RESUME_URL,
} from "../../components/constants";
import EmbeddedLink from "../../components/EmbeddedLink";
import useClasslistAdder, { ClasslistAdder } from "./useClasslistAdder";
import useSky from "./OceanSky";
import OceanSky from "./OceanSky";

const EMBODIMENT_STRING =
	"integrity, determination, learning, hard work, motivation, and communication";

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
	const [quoteResult, setQuoteResult] = useState<Quote | undefined>(undefined);
	const hasFetchedQuoteRef = useRef(false);

	//Getting Repos
	useEffect(() => {
		if (!repos || repos.length === 0) getRepositories();
	}, [repos, getRepositories]);

	useClasslistAdder(classListsToSet);

	useEffect(() => {
		async function fetchQuote() {
			const quote = await getRandomQuote({
				authors: [
					QuoteableAuthors.abrahamLincoln,
					QuoteableAuthors.albertEinstein,
					QuoteableAuthors.anatoleFrance,
					QuoteableAuthors.ericHoffer,
				], 
				tags: [
					QuoteTags.education,
					QuoteTags.inspirational,
				]
			});
			hasFetchedQuoteRef.current = true;
			setQuoteResult(quote || {} as Quote);
		}

		if (!hasFetchedQuoteRef.current) {
			fetchQuote();
		}
	}, [])

	function getQuoteJSX() {
		const content = quoteResult ? quoteResult.content : null;
		const author = quoteResult ? `${quoteResult.author} ` : null;

		return (
			<blockquote className="home__quote">
				<q className="home__quote-content">
					{/* &lsquo;{content}&rsquo; &nbsp;  */}
					{content}
				</q>
				<cite className="home__quote-author">
					&#8212;{author}{" "}
				</cite>
			</blockquote>
		);
	}

	return (
		<section className="home">
			<header
				aria-label={`adam major embodies ${EMBODIMENT_STRING}`}
				className="home__name">
				<span aria-hidden="true" className="home__name-first">
					&nbsp;Adam&nbsp;
				</span>
				<span aria-hidden="true" className="home__name-last">
					&nbsp;Major&nbsp;
				</span>
				<span aria-hidden="true" className="home__third-word">
					embodies
				</span>
			</header>
			<div aria-hidden="true" className="home__main">
				<section className="home__main-bottom">
					This site was created with React, Redux, Express, ThreeJS, and custom
					SASS/CSS.
				</section>

				<section className="home__main-left">
					<div className="home__main-left-content">
						<span className="home__content-header">Projects: </span>
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
				</section>

				<section className="home__main-right">
					<div className="home__main-right-content">
						<span className="home__content-header">About: </span>
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
				</section>
				{getQuoteJSX()}
			</div>
			<OceanSky/>
		</section>
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
