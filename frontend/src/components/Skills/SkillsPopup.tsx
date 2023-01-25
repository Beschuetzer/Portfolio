import React from "react";
import { useEffect } from "react";
import ReactDOM from "react-dom";
import { connect, RootStateOrAny } from "react-redux";
import { checkForParentOfType } from "../../helpers";
import {
	clickSkill,
	addRepoToReposToDisplay,
} from "../../actions";
import SkillsPopupName from "./SkillsPopupName";
import { capitalize } from "../../helpers";
import { addSpaceAfterPunctuationMarks } from "../utils";
import { Repository, SKILLS_CLASSNAME } from "./utils";

interface SkillsPopupProps {
	reposToDisplay: Repository[],
	repos: Repository[],
	clickedSkill: string,
	isMobile: boolean,
	clickSkill: (value: string | null) => void,
	addRepoToReposToDisplay: (value: Repository) => void,
}

const SkillsPopup: React.FC<SkillsPopupProps> = ({
	reposToDisplay,
	repos,
	clickedSkill,
	addRepoToReposToDisplay,
	clickSkill,
	isMobile,
}) => {
	const skillsPopupDiv = document.querySelector("#skillsPopup") as HTMLElement;
	const resetReposDelay = 500;

	//on initial load
	useEffect(() => {
		const handleClickBody = (e: MouseEvent) => {
			e.stopPropagation();
			const isBodyClick = !checkForParentOfType(
				e.target as HTMLElement,
				"div",
				`${SKILLS_CLASSNAME}-popup`,
			);
			if (isBodyClick) {
				skillsPopupDiv?.classList?.remove(`${SKILLS_CLASSNAME}-popup--active`);
				setTimeout(() => {
					clickSkill(null);
					addRepoToReposToDisplay([]);
				}, resetReposDelay);
			}
		};
		skillsPopupDiv.addEventListener("click", handleClickBody);
	}, [clickSkill, skillsPopupDiv, addRepoToReposToDisplay]);

	//when clickedSkillUpdate
	useEffect(() => {
		for (let i = 0; i < repos?.length; i++) {
			const repo = repos[i];
			for (let j = 0; j < repo.repositoryTopics.nodes?.length; j++) {
				const node = repo.repositoryTopics.nodes[j];
				if (clickedSkill && node?.topic?.name === clickedSkill?.trim().replace(' ', '-')) {
					addRepoToReposToDisplay(repos[i]);
					break;
				}
			}
		}
	}, [clickedSkill, repos, addRepoToReposToDisplay]);

	// const getIndexOfItem = (target, items) => {
	// 	for (let i = 0; i < items.length; i++) {
	// 		const item = items[i];
	// 		if (target.localName === "a" && item.localName === "a") {
	// 			if (target.href === item.href) return i;
	// 		} else if (target.innerText === item.innerText) return i;
	// 	}
	// };

	// const onTableItemMouseEvent = (e) => {
		// return;
		// if (isMobile) return;
		// const table = document.querySelector(`.${SKILLS_CLASSNAME}-popup__table`);
		// const skillsPopupItems = document.querySelectorAll(
		// 	`.${SKILLS_CLASSNAME}-popup__table-item`,
		// );
		// const indexOfTarget = getIndexOfItem(e.target, skillsPopupItems);
		// const classNameToAddToItems = `${SKILLS_CLASSNAME}-popup__item-js--hover`;
		// const classNameToAddToLinks = `${SKILLS_CLASSNAME}-popup__link-js--hover`;
		// const headerCount = document.querySelectorAll(`.${SKILLS_CLASSNAME}-popup__table-header`)
		// 	.length;
		// const classList = e.target.classList;

		// let rowsNameElement = null;
		// let min = -1;
		// let max = -1;
		// let isRowsNameElementALink = false;
		// let indexOffset = 0;

		// if (
		// 	classList?.contains(`${SKILLS_CLASSNAME}-popup__link-text`) ||
		// 	classList?.contains(`${SKILLS_CLASSNAME}-popup__name`)
		// ) {
		// 	min = headerCount + indexOfTarget + 0;
		// 	max = headerCount + indexOfTarget + 4;
		// } else if (classList?.contains(`${SKILLS_CLASSNAME}-popup__description`)) {
		// 	min = headerCount + indexOfTarget + -1;
		// 	max = headerCount + indexOfTarget + 3;
		// 	indexOffset = 1;
		// } else if (classList?.contains(`${SKILLS_CLASSNAME}-popup__createdAt`)) {
		// 	min = headerCount + indexOfTarget + -2;
		// 	max = headerCount + indexOfTarget + 2;
		// 	indexOffset = 2;
		// } else if (classList?.contains(`${SKILLS_CLASSNAME}-popup__updatedAt`)) {
		// 	min = headerCount + indexOfTarget + -3;
		// 	max = headerCount + indexOfTarget + 1;
		// 	indexOffset = 3;
		// } else if (classList?.contains(`${SKILLS_CLASSNAME}-popup__url`)) {
		// 	min = headerCount + indexOfTarget + -4;
		// 	max = headerCount + indexOfTarget + 0;
		// 	indexOffset = 4;
		// }

		// //Removing or Adding css class to get border-bottom and box-shadow
		// for (let i = min; i <= max; i++) {
		// 	if (e.type === "mouseleave") {
		// 		table.children[i]?.classList.remove(classNameToAddToItems);
		// 	} else {
		// 		table.children[i]?.classList.add(classNameToAddToItems);
		// 	}
		// }

		// //Adding or Removing class to trigger link animation when hovering over a row with a link name element
		// rowsNameElement = skillsPopupItems[indexOfTarget - indexOffset];
		// isRowsNameElementALink = rowsNameElement?.classList?.contains(
		// 	`${SKILLS_CLASSNAME}-popup__link`,
		// )
		// 	? true
		// 	: false;

		// if (isRowsNameElementALink) {
		// 	if (e.type === "mouseenter")
		// 		rowsNameElement.classList?.add(classNameToAddToLinks);
		// 	else rowsNameElement.classList?.remove(classNameToAddToLinks);
		// }
	// };

	const onCloseClick = (e: MouseEvent) => {
		skillsPopupDiv?.classList?.remove(`${SKILLS_CLASSNAME}-popup--active`);
		setTimeout(() => {
			clickSkill(null);
			addRepoToReposToDisplay([]);
		}, resetReposDelay);
	};

	const returnDate = (key: string, repo: any, title: string, onlySpans = false) => {
		const date = new Date(repo[key]).toLocaleString();
		const index = date.lastIndexOf(":");
		const dateToShow = date.slice(0, index) + " " + date.slice(index + 4);
		if (onlySpans) {
			if (isMobile) {
				return (
					<React.Fragment>
						<span className={`skills-popup__${key}-title`}>{title}:</span>
						<span>{dateToShow}</span>
					</React.Fragment>
				);
			}
			<span>{dateToShow}</span>;
		}

		return (
			<div
				key={key}
				className={`skills-popup__table-item skills-popup__${key}`}
			>
				{isMobile ? (
					<span className={`skills-popup__${key}-title`}>{title}:</span>
				) : null}
				<span>{dateToShow}</span>
			</div>
		);
	};

	const getProjectContent = (repo: any, key: string, index: number) => {
		switch (key) {
			case "name":
				if (
					repo["name"].search(/playlist.*sync/i) !== -1 ||
					repo["name"].search(/downloader/i) !== -1
				) {
					return (
						<SkillsPopupName
							key={key}
							href={`/examples/csharp#${repo["name"].replace("-", "")}`}
							repo={repo}
						/>
					);
				}

				else if (
					repo["name"].search(/autobid/i) !== -1
				) {
					return (
						<SkillsPopupName
							key={key}
							href={`/examples/autobid`}
							repo={repo}
						/>
					);
				}

				else if (repo["homepageUrl"]) {
					return (
						<SkillsPopupName
							key={key}
							href={repo["homepageUrl"]}
							repo={repo}
						/>
					);
				}

				return (
					<div
						key={key}
						className={`skills-popup__table-item skills-popup__${key}`}>
						{isMobile ? (
							<span className={`skills-popup__${key}-title`}>
								{capitalize(key)}:
							</span>
						) : null}
						<span>{repo[key]}</span>
					</div>
				);
			case "url":
				return (
					<a
						key={key}
						rel="noreferrer"
						target="_blank"
						href={repo[key]}
						className={`skills-popup__table-item skills-popup__${key}`}
					>
						<svg>
							<use xlinkHref="/sprite.svg#icon-chain"></use>
						</svg>
					</a>
				);
			case "createdAt":
				if (isMobile) {
					return (
						<div
							key={key}
							className={`skills-popup__table-item skills-popup__dates`}
						>
							{returnDate(key, repo, "Created", true)}
							{returnDate("updatedAt", repo, "Updated", true)}
						</div>
					);
				}
				return returnDate(key, repo, "Created");
			case "updatedAt":
				if (isMobile) return null;
				return returnDate(key, repo, "Updated");
			case "description":
				return (
					<div
						key={key}
						className={`skills-popup__table-item skills-popup__${key}`}
						dangerouslySetInnerHTML={{ __html: addSpaceAfterPunctuationMarks(repo[key]) }}></div>
				);
			default:
				return null;
		}
	};

	const renderProjects = () => {
		const keys = ["name", "description", "createdAt", "updatedAt", "url"];
		if (!reposToDisplay) {
			return (
				<div className={`${SKILLS_CLASSNAME}-popup__error`}>
					Unable to load repositories from Github.  Try refreshing...
				</div>
			);
		} else if (reposToDisplay.length === 0) {
			return (
				<div className={`${SKILLS_CLASSNAME}-popup__error`}>
					There are currently no repos with the tag '{capitalize(clickedSkill)}'
				</div>
			);
		}
		return reposToDisplay.sort((a, b) => {
			const firstItemsDate = a?.[keys?.[2]];
			const secondItemsDate = b?.[keys?.[2]];
			console.log({a, b, firstItemsDate, secondItemsDate, valueReturned: firstItemsDate > secondItemsDate ? -1 : firstItemsDate < secondItemsDate ? 1 : 0});
			return firstItemsDate > secondItemsDate ? -1 : firstItemsDate < secondItemsDate ? 1 : 0;
		}).map((repo) => {
			if (isMobile) {
				return (
					<article key={repo.name} className={`${SKILLS_CLASSNAME}-popup__table-repo`}>
						{keys.map((key, index) => {
							return getProjectContent(repo, key, index);
						})}
					</article>
				);
			} else {
				return keys.map((key, index) => {
					return getProjectContent(repo, key, index);
				});
			}
		});
	};

	const renderTableHeaders = () => {
		const headers = ["Name", "Description", "Created", "Updated", "Repo Url"];
		return isMobile
			? // <div className={`${SKILLS_CLASSNAME}-popup__table-headers`}>
			  //   {
			  //     headers.map(header => {
			  //       return (
			  //         <div key={header} className={`${SKILLS_CLASSNAME}-popup__table-header`}>{header}</div>
			  //       );
			  //     })
			  //   }
			  // </div>
			  null
			: headers.map((header) => {
					return (
						<div key={header} className={`${SKILLS_CLASSNAME}-popup__table-header`}>
							{header}
						</div>
					);
			  });
	};
	return ReactDOM.createPortal(
		<div className={`${SKILLS_CLASSNAME}-popup__content`}>
			<div className={`${SKILLS_CLASSNAME}-popup__header`}>
				<span className={`${SKILLS_CLASSNAME}-popup__header-text`}>
					Projects with tag '
					<span className={`${SKILLS_CLASSNAME}-popup__header-skill`}>{clickedSkill}</span>
					':
				</span>
				<svg onClick={(e: any) => onCloseClick(e)} className={`${SKILLS_CLASSNAME}-popup__close`}>
					<use xlinkHref="/sprite.svg#icon-close"></use>
				</svg>
				<h5 className={`${SKILLS_CLASSNAME}-popup__hint`}>* click the project name to view a working demo (when possible)</h5>
			</div>
			<div className={`${SKILLS_CLASSNAME}-popup__table`}>
				{renderTableHeaders()}
				{renderProjects()}
			</div>
		</div>,
		document.querySelector("#skillsPopup")!,
	);
};

const mapStateToProps = (state: RootStateOrAny) => {
	return {
		repos: state.general.repos,
		reposToDisplay: state.resume.reposToDisplay,
		clickedSkill: state.resume.clickedSkill,
		isMobile: state.general.isMobile,
	};
};

export default connect(mapStateToProps, {
	clickSkill,
	addRepoToReposToDisplay,
})(SkillsPopup as any);
