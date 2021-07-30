import React from "react";
import { getSentencesFromString } from "./utils";

export const QUOTE_CLASSNAME = "quote";

export interface QuoteProps {
	children: string;
	author: string;
  shouldBreakLines?: boolean;
}

const Quote: React.FC<QuoteProps> = ({ children, author, shouldBreakLines = false}) => {
  const punctuationMarks = [".", "?", "!"];

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
					<span key={index}>&nbsp;{shouldReturnOriginal ? children : sentence}&nbsp;</span>
				);

			return (
				<div key={index}>{shouldReturnOriginal ? children : sentence}</div>
			);
		});
	};

	return (
		<div className={`${QUOTE_CLASSNAME}`}>
			<div className={`${QUOTE_CLASSNAME}__message`}>
				&ldquo; {getMessage()}&rdquo;
			</div>
			<div className={`${QUOTE_CLASSNAME}__author`}>&#8212;{author}</div>
		</div>
	);
};

export default Quote;
