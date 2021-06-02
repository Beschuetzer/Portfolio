import React from 'react';

import img1 from '../../../../imgs/bridge-section-1.jpg';
import img2 from '../../../../imgs/bridge-section-2.jpg';
import img3 from '../../../../imgs/bridge-section-3.jpg';
import img4 from '../../../../imgs/bridge-section-4.jpg';
import img5 from '../../../../imgs/bridge-section-5.jpg';
import img6 from '../../../../imgs/bridge-section-6.jpg';
import Carousel from '../../../Carousel';

const Downloader = () => {
  return (
    <section className="csharp">
      <div className="csharp__title">Downloader</div>
      <div className="csharp__carousel">
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
          numberOfImagesToScrollOnClick="2"
        />
      </div>
    </section>
  );
}

export default Downloader;