import SectionContainer from '../../components/SectionContainer';

const sectionNames = [
	'Introduction',
	'Likes',
	'Music',
	'Philosophy',
]

const About = ({

}) => {
  //This page should have the following:
  //   I grew up in Minnesota. Visited England, Ireland, and Whales when I was 16 through People to People (started by Dwight D. Eisenhower), Graduated HS, Moved to Germany when I was 19 to teach/tutor English at a boarding school.  Studied Linguistics (regrettably not something with a B.S. in front of it), Helped adults meet their educational goals for 10 years, while pursuing the idea of starting a recording studio, moved to Hawaii for 1 year (avoided serious sun burn), moved to Oregon to fix MFDs, PANDEMIC!, Web Devloper...
  
	//   details on what the design philosophy for the portfolio page is (e.g. using React and all custom CSS to illustrate what I have learned)
	//interests: playing drums/guitar, riding bike, exercising, Astronomy(almost majored in it)
	//Add a music section
	//add these songs in the form of an AudioPlayer component:
		// steve's sweet song original,
		// luminiscent ether mastered up,
		// eerie correspondence,
		// reunited ozone master,
		// adam and linda's song,
		// honeydew in june b 3rd version,
		// 4 starlite five songs (sweet jam too,
		// blues is stalking more reverb),
		// mario remix,
		// ein paar ganz schnelle,
		// relentless shame remastered 2,
		// hopeful uncertainty mastered,
		// old band practice songs
	// talk about self and coding philosophy a bit
	return (
		<SectionContainer
			name='summary'
			pageName='bridge'
		>
				<h3>Making the Most of a Tough Situation</h3>
				<p>
					The outbreak of the COVID-19 Pandemic provided me with a lot of time to reflect on my career choices and where I want to be in 10 years time.  
				</p>
				<p>
					By means of said careful reflection, I realized that I would not be able to live a self-realized life, if I did not give it my best shot at professional coder. 
				</p>
				<h3>A Long Time Coming</h3>
				<p>
					I have always been enamored with the idea of becoming a computer programmer.  If my dad had not had a heart attack, I am sure I would have chosen to study Computer Science at University instead of Linguistics.  
				</p>
				<p>
					The constant 
					The thing is, my dad was a programmer for a company called Deluxe for 1 years.    However, I saw how much my dad’s new position as a project manager caused him a lot of stress, which eventually to a heart attack.  I naively attributed his heart attack to coding in my mind and decided to pursue other things, even though I had a thing for programming.), and I finally realized that this may be my last chance to become a programmer.  
				</p>
		</SectionContainer>
	)
}

export default About;