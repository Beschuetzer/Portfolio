import React from 'react';

import img1 from '../../../../imgs/downloader/img1.png';
import img2 from '../../../../imgs/downloader/img2.png';
import img3 from '../../../../imgs/downloader/img3.png';
import img4 from '../../../../imgs/downloader/img4.png';
import img5 from '../../../../imgs/downloader/img5.png';
import img6 from '../../../../imgs/downloader/img6.png';
import video1 from '../../../../imgs/downloader/video1.mp4';
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
            title="Purpose"
          >
            Websites like <EmbeddedLink href="https://www.ocremix.org">OCRemix</EmbeddedLink> and <EmbeddedLink href="https://downloads.khinsider.com">Kingdom Hearts Insider</EmbeddedLink> offer mp3 files for downloading.&nbsp;&nbsp;It can be tedious downloading each file by hand, so I decided to create a c# app that takes in a Regular Expression and recursively downloads files that match the expression given.
          </CSharpCardSection>
          <CSharpCardSection
            title="How"
          >
          The app finds any links that are on the url provided and recursively crawls any sub-links until it runs out of links. &nbsp;On each page, it looks for download links that match the Regular Expression and adds them to a download queue.  &nbsp;It works best on sites like <EmbeddedLink href="https://www.ocremix.org">Kingdom Hearts Insider</EmbeddedLink> where each album page only has links to that specific album.  
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
                "The User interface",
                "Options available",
                "Full-screen user interface when downloading",
                "Integrated file-renaming tool used to standardize file names of downloads",
                "A list of songs from OCRemix.org",
                "Songs downloaded from OCRemix.org (including sub-linked songs)",
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