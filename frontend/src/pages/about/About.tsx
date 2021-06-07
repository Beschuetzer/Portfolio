import SectionContainer from '../../components/SectionContainer';
import BridgeCard from '../examples/bridge/BridgeCard';

const About = ({

}) => {
  //This page should have the following:
  //   details on what the design philosophy for the portfolio page is (e.g. using React and all custom CSS to illustrate what I have learned)
  //   details of me as an individual (hobbies, upbringing, stuff you'd share in more casual conversations)
	return (
		<SectionContainer
			name='summary'
			pageName='bridge'
		>
			<BridgeCard
				titleSize='two'
				titleContent='Form and Vision'
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
			</BridgeCard>
		</SectionContainer>
	)
}

export default About;