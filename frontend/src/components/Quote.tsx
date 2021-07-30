import React from "react";

export const QUOTE_CLASSNAME = "quote";

export interface QuoteProps {
	children: string;
	author: string;
}

const Quote: React.FC<QuoteProps> = ({ children, author }) => {
  const punctuationMarks = [".", "?", "!"];


	const getSentences = (split: string[], splitByPunctuationMark: string) => {
    const toReturn = [];

    for (let i = 0; i < split.length; i++) {
      const splitItem = split[i];
      
      let containsPunctuation = false;
      for (let i = 0; i < punctuationMarks.length; i++) {
        const punctuationMark = punctuationMarks[i];
        if (splitItem.includes(punctuationMark)) {
          containsPunctuation = true;
          break;
        }
      }

      if (splitItem !== "" && !containsPunctuation) toReturn.push(`${splitItem.trim()}${splitByPunctuationMark}`);
    }

    return toReturn;
  };

	const getMessage = () => {
		const splitByPeriod = children.split(".");
		const splitByQuestionMark = children.split("?");
		const splitByExclamationPoint = children.split("!");
		const splitsToIterateThrough = [
			splitByPeriod,
			splitByQuestionMark,
			splitByExclamationPoint,
		];

		const sentences = [];
		let shouldReturnOriginal = true;
		for (let i = 0; i < splitsToIterateThrough.length; i++) {
			const splitToIterateThrough = splitsToIterateThrough[i];
			if (splitToIterateThrough.length > 1) {
				sentences.push(...getSentences(splitToIterateThrough, punctuationMarks[i]));
				shouldReturnOriginal = false;
			}
		}

debugger;
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
