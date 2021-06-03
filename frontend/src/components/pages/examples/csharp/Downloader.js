import React from 'react';

import img1 from '../../../../imgs/bridge-section-1.jpg';
import img2 from '../../../../imgs/bridge-section-2.jpg';
import img3 from '../../../../imgs/bridge-section-3.jpg';
import img4 from '../../../../imgs/bridge-section-4.jpg';
import img5 from '../../../../imgs/bridge-section-5.jpg';
import img6 from '../../../../imgs/bridge-section-6.jpg';
import Carousel from '../../../Carousel';
import EmbeddedLink from '../../../EmbeddedLink';
import Section from '../../../Section';
import SectionContainer from '../../../SectionContainer';
import CSharpCardSection from './CSharpCardSection';

const Downloader = () => {
  const PAGE_NAME = "csharp";

  const sections = [
    {
      name: "Description",
      pageName: PAGE_NAME,
      children: [
        <React.Fragment>
          <CSharpCardSection
            title="Why"
          >
            Websites like <EmbeddedLink href="https://www.ocremix.org">OCRemix</EmbeddedLink> and <EmbeddedLink href="https://www.ocremix.org">Kingdom Hearts Insider</EmbeddedLink> offer mp3 files for downloading.&nbsp;&nbsp;It can be tedious downloading each file by hand, so I decided to create a c# app that takes in a Regular Expression and recursively downloads files that match the expression given.
          </CSharpCardSection>
          <CSharpCardSection
            title="How"
          >
          &nbsp; The app finds any links that are on the url provided and recursively crawls any sub-links until it runs out of links. &nbsp;On each page, it looks for download links that match the Regular Expression and adds them to a cue.  &nbsp;It works best on sites like <EmbeddedLink href="https://www.ocremix.org">Kingdom Hearts Insider</EmbeddedLink> where each album page only has links to that specific album.  
          </CSharpCardSection>
        </React.Fragment>
      ]
    },
    {
      name: "Features",
      pageName: PAGE_NAME,
      children: [
        <p>Features1</p>,
        <p>Features2</p>,
      ]
    },
  ]

  function renderSections () {
    return sections.map((section, index) => {
      return (
        <Section
          name={section.name}
          pageName={section.pageName}
        >
          {section.children.map(child => child)}
        </Section>
      )
    })
  }

  return (
    <div className="csharp">
      <SectionContainer
        name="Images"
        pageName={PAGE_NAME}
      >
        <div className="csharp__title">Downloader</div>
        <section className="csharp__carousel">
          <Carousel
            images={[img1,img2,img3,img4,img5,img6]}
            alts={
              [
                "Image 1 Alt",
                "Image 2 Alt",
                "Image 3 Alt",
                "Image 4 Alt",
                "Image 5 Alt",
                "Image 6 Alt",
              ]
            }
            numberOfImagesInCarouselAtOneTime="3"
            numberOfImagesToScrollOnClick="3"
          />
        </section>
      </SectionContainer>
      {renderSections()}
    </div>
  );
}

export default Downloader;