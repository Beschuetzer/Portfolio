import React from "react";
import CSharpCardSection from "../CSharpCardSection";

export interface BigFiveItemProps {
	children: any;
	benefits: string[];
	pitfalls: string[];
}

const BigFiveItem: React.FC<BigFiveItemProps> = ({
	children,
	benefits,
	pitfalls,
}) => {
	function getListItems(items: string[]) {
		return items.map((item, index) => {
			return <li key={index}>{item}</li>;
		});
	}

	function getOrderedListFromArray(items: string[]) {
		return <ol>{getListItems(items)}</ol>;
	}

	return (
		<React.Fragment>
			<CSharpCardSection title="">{children}</CSharpCardSection>
			<CSharpCardSection title="Potential Benefits">
				{getOrderedListFromArray(benefits)}
      </CSharpCardSection>
			<CSharpCardSection title="Potential Pitfalls">
				{getOrderedListFromArray(pitfalls)}
			</CSharpCardSection>
		</React.Fragment>
	);
};

export default BigFiveItem;
