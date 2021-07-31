import React from "react";
import { useRef } from "react";
import { getSentencesFromString } from "./utils";

export const QUOTE_CLASSNAME = "quote";

export interface QuoteProps {
	children: string;
	author: string;
  shouldBreakLines?: boolean;
}

const Quote: React.FC<QuoteProps> = ({ children, author, shouldBreakLines = false}) => {
	const messageRef = useRef(null);
	const authorRef = useRef(null);
  const punctuationMarks = [".", "?", "!"];

	const copyToClipboard = () => {
		const message = `"${(messageRef.current as any)?.textContent}" ${(authorRef.current as any)?.textContent}`

		console.log('message =', message);

		const el = document.createElement('textarea') as HTMLTextAreaElement;
		el.value = message;
		document.body.appendChild(el);
		el.select();
		document.execCommand('copy');
		document.body.removeChild(el);
	}

	const getMessage = () => {
		const splitByPeriod = children.split(".");
		const splitByQuestionMark = children.split("?");
		const splitByExclamationPoint = children.split("!");
		const splitsToIterateThrough = [
			splitByPeriod,
			splitByQuestionMark,
			splitByExclamationPoint,
		];

    let sentences = [children];
    if (shouldBreakLines) sentences = getSentencesFromString(children, punctuationMarks);

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

	return (
		<div onClick={(e: any) => copyToClipboard()} className={`${QUOTE_CLASSNAME}`}>
			<div ref={messageRef as any} className={`${QUOTE_CLASSNAME}__message`}>
				{getMessage()}
			</div>
			<div ref={authorRef as any} className={`${QUOTE_CLASSNAME}__author`}>&#8212;{author}</div>
		</div>
	);
};

export default Quote;
