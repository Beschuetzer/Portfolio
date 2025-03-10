import React, { useCallback } from "react";
import { useEffect } from "react";
import ReactDOM from "react-dom";
import { SkillsPopupName } from "./SkillsPopupName";
import { clickSkill, addRepoToReposToDisplay, clickedSkillSelector, reposToDisplaySelector } from "../../slices/resumeSlice";
import { checkForParentOfType, capitalize, addSpaceAfterPunctuationMarks, toggleScrollability, replaceCharacters } from "../../helpers";
import { useAppDispatch, useAppSelector } from "../../hooks";
import { reposSelector, isMobileSelector } from "../../slices/generalSlice";
import { SKILLS_CLASSNAME } from "../constants";
import { SkillsPopupTableHeaders } from "./SkillsPopupTableHeaders";

interface SkillsPopupProps {}

export const SkillsPopup: React.FC<SkillsPopupProps> = () => {
	const dispatch = useAppDispatch();
	const repos = useAppSelector(reposSelector);
	const reposToDisplay = useAppSelector(reposToDisplaySelector);
	const clickedSkill = useAppSelector(clickedSkillSelector);
	const isMobile = useAppSelector(isMobileSelector);
	const skillsPopupDiv = document.querySelector("#skillsPopup") as HTMLElement;
	const resetReposDelay = 500;

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

	const onCloseClick = useCallback(() => {
		skillsPopupDiv?.classList?.remove(`${SKILLS_CLASSNAME}-popup--active`);
		toggleScrollability();
		setTimeout(() => {
			dispatch(clickSkill(""));
			dispatch(addRepoToReposToDisplay([]));
		}, resetReposDelay);
	}, [dispatch, skillsPopupDiv?.classList]);

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
				onCloseClick()
			}
		};
		skillsPopupDiv.addEventListener("click", handleClickBody);
	}, [dispatch, onCloseClick, skillsPopupDiv]);

	//when clickedSkillUpdate
	useEffect(() => {
		for (let i = 0; i < repos?.length; i++) {
			const repo = repos[i];
			for (let j = 0; j < repo.repositoryTopics.nodes?.length; j++) {
				const node = repo.repositoryTopics.nodes[j];
				if (clickedSkill && node?.topic?.name === replaceCharacters(clickedSkill?.trim(), [[' ', '-']])) {
					dispatch(addRepoToReposToDisplay(repos[i]));
					break;
				}
			}
		}
	}, [dispatch, clickedSkill, repos]);

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
							href={`/examples/${repo["name"]}`}
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
					No {capitalize(clickedSkill)} projects found.
				</div>
			);
		}
		return [...reposToDisplay]
		.sort((a: any, b: any) => {
			const firstItemsDate = a?.[keys?.[2]] || a?.[keys?.[3]];
			const secondItemsDate = b?.[keys?.[2]] || b?.[keys?.[3]];
			return firstItemsDate > secondItemsDate ? -1 : firstItemsDate < secondItemsDate ? 1 : 0;
		}).map((repo: any) => {
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

	return ReactDOM.createPortal(
		<div className={`${SKILLS_CLASSNAME}-popup__content`}>
			<div className={`${SKILLS_CLASSNAME}-popup__header`}>
				<span className={`${SKILLS_CLASSNAME}-popup__header-text`}>
					<span className={`${SKILLS_CLASSNAME}-popup__header-skill`}>{capitalize(clickedSkill)}</span> Projects:
				</span>
				<svg onClick={(e: any) => onCloseClick()} className={`${SKILLS_CLASSNAME}-popup__close`}>
					<use xlinkHref="/sprite.svg#icon-close"></use>
				</svg>
				<h5 className={`${SKILLS_CLASSNAME}-popup__hint`}>* click the project name to view a working demo (when possible)</h5>
				<SkillsPopupTableHeaders />
			</div>
			<div className={`${SKILLS_CLASSNAME}-popup__table`}>
				{renderProjects()}
			</div>
		</div>,
		document.querySelector("#skillsPopup")!,
	);
};
