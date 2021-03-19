import React from 'react';

class Resume extends React.Component {
  constructor() {
    super();
    this.state = {
      //initializing props to keep track of here
    };
    //you have to create a ref for each element you are planning to interact with in the DOM for each component
    this.imageRef = React.createRef();
  }
  render() {
    return (
      <section className="resume">
        <div className="resume__section resume__section-summary">
          <div className="resume__card">
            <div className="resume__content">
              <h3 className="heading--two resume__header-summary">Summary</h3>
              <p className="paragraph paragraph--four">
                Zombie ipsum reversus ab viral inferno, nam rick grimes malum cerebro. De carne lumbering animata corpora quaeritis. Summus brains sit​​, morbo vel maleficia? De apocalypsi gorger omero undead survivor dictum mauris. Hi mindless mortuis soulless creaturas, imo evil stalking monstra adventus resi dentevil vultus comedat cerebella viventium. Qui animated corpse, cricket bat max brucks terribilem incessu zomby. The voodoo sacerdos flesh eater, suscitat mortuos comedere carnem virus. Zonbi tattered for solum oculi eorum defunctis go lum cerebro. Nescio brains an Undead zombies. Sicut malus putrid voodoo horror. Nigh tofth eliv ingdead.
              </p>
            </div>
          </div>
        </div>




        <div className="resume__section resume__section-skills">
          <h3 className="heading--two resume__header-skills">Skills</h3>

        </div>
        <div className="resume__section resume__section-work-history">
          <h3 className="heading--two resume__header-work">Work History</h3>

        </div>
        <div className="resume__section resume__section-education">
          <h3 className="heading--two resume__header-education">Education</h3>

        </div>
      </section>
    );
  }
}

export default Resume;