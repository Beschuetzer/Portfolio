import { C_SHARP_CARD_SECTION_CLASSNAME, C_SHARP_CARD_SECTION_TITLE_CLASSNAME, C_SHARP_CARD_SECTION_CONTENT_CLASSNAME } from "../../../components/constants";

interface CSharpCardSectionProps {
	title?: string;
	children: any;
	headerSideContent?: any;
}

export const CSharpCardSection: React.FC<CSharpCardSectionProps> = ({
	title = "",
	children,
	headerSideContent,
}) => {
	return (
		<section className={C_SHARP_CARD_SECTION_CLASSNAME}>
			<h4 className={C_SHARP_CARD_SECTION_TITLE_CLASSNAME}>{title}</h4>
			<div className={C_SHARP_CARD_SECTION_CONTENT_CLASSNAME}>{children}</div>
		</section>
	);
};