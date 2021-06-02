import React from 'react';

import img1 from '../../../../imgs/bridge-section-1.jpg';
import img2 from '../../../../imgs/bridge-section-2.jpg';
import img3 from '../../../../imgs/bridge-section-3.jpg';
import img4 from '../../../../imgs/bridge-section-4.jpg';
import img5 from '../../../../imgs/bridge-section-5.jpg';
import img6 from '../../../../imgs/bridge-section-6.jpg';
import Carousel from '../../../Carousel';
import SectionContainer from '../../../SectionContainer';

const Downloader = () => {
  const sections = [
    {
      name: "Why",
      pageName: "downloader",
      children: [
        <p>Test1</p>,
        <p>Test2</p>,
      ]
    },
  ]

  function renderSections () {
    return sections.map((section, index) => {
      return (
        <SectionContainer
          name={section.name}
          pageName={section.pageName}
        >
          {section.children.map(child => child)}
        </SectionContainer>
      )
    })
  }

  return (
    <div className="csharp">
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
      {renderSections()}
    </div>
  );
}

export default Downloader;