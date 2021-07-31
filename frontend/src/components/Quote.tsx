import React from "react";
import { useRef } from "react";
import { HIDDEN_CLASSNAME } from "./constants";
import { getSentencesFromString } from "./utils";

export const QUOTE_CLASSNAME = "quote";

export interface QuoteProps {
	children: string;
	author: string;
	shouldBreakLines?: boolean;
}

const Quote: React.FC<QuoteProps> = ({
	children,
	author,
	shouldBreakLines = false,
}) => {
	const POPUP_SHOW_DURATION = 2500;
	const POPUP_MESSAGE = 'Quote Copied to Clipboard';
	const messageRef = useRef<HTMLElement>(null);
	const authorRef = useRef<HTMLElement>(null);
	const popUpRef = useRef<HTMLElement>(null);
	const punctuationMarks = [".", "?", "!"];

	let popUpTimeout: any;

	function copyToClipboard() {
		const message = `"${(messageRef.current as any)?.textContent}" ${
			(authorRef.current as any)?.textContent
		}`;

		console.log("message =", message);

		const el = document.createElement("textarea") as HTMLTextAreaElement;
		el.value = message;
		document.body.appendChild(el);
		el.select();
		document.execCommand("copy");
		document.body.removeChild(el);
		showPopup();
	};

	function getMessage() {
		const splitByPeriod = children.split(".");
		const splitByQuestionMark = children.split("?");
		const splitByExclamationPoint = children.split("!");
		const splitsToIterateThrough = [
			splitByPeriod,
			splitByQuestionMark,
			splitByExclamationPoint,
		];

		let sentences = [children];
		if (shouldBreakLines)
			sentences = getSentencesFromString(children, punctuationMarks);

		let shouldReturnOriginal = true;
		for (let i = 0; i < splitsToIterateThrough.length; i++) {
			const splitToIterateThrough = splitsToIterateThrough[i];
			if (splitToIterateThrough.length > 1) {
				shouldReturnOriginal = false;
			}
		}

		return sentences.map((sentence, index) => {
			if (index === 0 || index === sentences.length - 1)
				return (
					<span key={index}>{shouldReturnOriginal ? children : sentence}</span>
				);

			return (
				<div key={index}>{shouldReturnOriginal ? children : sentence}</div>
			);
		});
	};

	function showPopup() {
		const popUp = popUpRef.current as HTMLElement;
		if (!popUp) return;
		clearTimeout(popUpTimeout);

		popUp.classList.remove(HIDDEN_CLASSNAME);
		popUp.style.transform = `translate(-0%, -100%)`;

		popUpTimeout = setTimeout(() => {
			popUp.style.transform = `translate(-0%, -200%)`;
			popUp.classList.add(HIDDEN_CLASSNAME);
		}, POPUP_SHOW_DURATION)
	}

	return (
		<div
			onClick={(e: any) => copyToClipboard()}
			className={`${QUOTE_CLASSNAME}`}>
			<div ref={messageRef as any} className={`${QUOTE_CLASSNAME}__message`}>
				{getMessage()}
			</div>
			<div ref={authorRef as any} className={`${QUOTE_CLASSNAME}__author`}>
				&#8212;{author}
			</div>
			<div ref={popUpRef as any} className={`${QUOTE_CLASSNAME}__popup hidden`}>
				{POPUP_MESSAGE}
				<div className={`arrow-down arrow-down--left`}></div>
				<div className={`arrow-down arrow-down--center`}></div>
				<div className={`arrow-down arrow-down--right`}></div>
			</div>
		</div>
	);
};

export default Quote;
