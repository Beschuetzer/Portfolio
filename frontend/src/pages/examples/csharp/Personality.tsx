import React from "react";
import {
	CSharpSection,
	PERSONALITY_PAGE_NAME,
} from "../../../components/constants";
import CSharpCardSection from "./CSharpCardSection";
import CSharpLayout from "./CSharpLayout";
import { C_SHARP_CLASSNAME } from "./utils";


const sectionNames = [
	"Overview",
	"Conscientiousness", //percent: 85,
	"Agreeableness", //percent: 75,
	"Openness", //percent: 70,
	"Emotional Stability", //percent: 65
	"Extraversion", //percent: 35,
	"Take Away"
];

const sections: CSharpSection[] = [
	{
		name: sectionNames[0],
		pageName: C_SHARP_CLASSNAME,
		children: [
			<React.Fragment>
				<CSharpCardSection title="The Project">
				
				</CSharpCardSection>
			</React.Fragment>,
		],
	},
	{
		name: sectionNames[1],
		pageName: C_SHARP_CLASSNAME,
		children: [
			<React.Fragment>
				<CSharpCardSection title="">
				
				</CSharpCardSection>
			</React.Fragment>,
		],
	},
	{
		name: sectionNames[2],
		pageName: C_SHARP_CLASSNAME,
		children: [
			<React.Fragment>
				<CSharpCardSection title="">
				
				</CSharpCardSection>
			</React.Fragment>,
		],
	},
	{
		name: sectionNames[3],
		pageName: C_SHARP_CLASSNAME,
		children: [
			<React.Fragment>
				<CSharpCardSection title="">
				
				</CSharpCardSection>
			</React.Fragment>,
		],
	},
	{
		name: sectionNames[4],
		pageName: C_SHARP_CLASSNAME,
		children: [
			<React.Fragment>
				<CSharpCardSection title="">
				
				</CSharpCardSection>
			</React.Fragment>,
		],
	},
	{
		name: sectionNames[5],
		pageName: C_SHARP_CLASSNAME,
		children: [
			<React.Fragment>
				<CSharpCardSection title="">
				
				</CSharpCardSection>
			</React.Fragment>,
		],
	},
	{
		name: sectionNames[6],
		pageName: C_SHARP_CLASSNAME,
		children: [
			<React.Fragment>
				<CSharpCardSection title="">
				
				</CSharpCardSection>
			</React.Fragment>,
		],
	},
];

interface PersonalityProps {}

const Personality: React.FC<PersonalityProps> = () => {
	return (
		<CSharpLayout sections={sections} pageName={PERSONALITY_PAGE_NAME}>
			{" "}
		</CSharpLayout>
	);
};

export default Personality;
