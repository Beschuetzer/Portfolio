import React from 'react';

import img1 from '../../../../imgs/playlist-syncer/img1.png';
import img2 from '../../../../imgs/playlist-syncer/img2.png';
import img3 from '../../../../imgs/playlist-syncer/img3.png';
import img4 from '../../../../imgs/playlist-syncer/img4.png';
import img5 from '../../../../imgs/playlist-syncer/img5.png';
import video1 from '../../../../imgs/playlist-syncer/video1.mp4';
import Carousel from '../../../Carousel';
import { C_SHARP_LAYOUT_CSS_NAME } from '../../../constants';
import CSharpLayout from '../../../CSharpLayout';
import EmbeddedLink from '../../../EmbeddedLink';
import CSharpCardSection from './CSharpCardSection';

const PlaylistSyncer = () => {

  const sections = [
    {
      name: "Description",
      pageName: C_SHARP_LAYOUT_CSS_NAME,
      children: [
        <React.Fragment>
          <CSharpCardSection
            title="Purpose"
          >
            Websites like<EmbeddedLink href="https://www.ocremix.org">OCRemix</EmbeddedLink> and <EmbeddedLink href="https://downloads.khinsider.com">Kingdom Hearts Insider</EmbeddedLink>offer mp3 files for downloading.&nbsp;&nbsp;It can be tedious downloading each file by hand, so I decided to create a c# app that takes in a Regular Expression and recursively downloads files that match the expression given.
          </CSharpCardSection>
          <CSharpCardSection
            title="How"
          >
          The app finds any links that are on the url provided and recursively crawls any sub-links until it runs out of links. &nbsp;On each page, it looks for download links that match the Regular Expression and adds them to a download queue.  &nbsp;It works best on sites like<EmbeddedLink href="https://downloads.khinsider.com">Kingdom Hearts Insider</EmbeddedLink>where each album page only has links to that specific album.  
          </CSharpCardSection>
        </React.Fragment>
      ]
    },
    {
      name: "Notes",
      pageName: C_SHARP_LAYOUT_CSS_NAME,
      children: [
        <React.Fragment>
          <CSharpCardSection
            title="Multi-threading"
          >
            PlaylistSyncer uses three threads.&nbsp; One thread analyzes the html looking for sub-links and urls matching the Regular Expression.  If it finds a link to download it adds it to the download queue, which is handled by the second thread.&nbsp; The last thread handles the GUI updates.
          </CSharpCardSection>
          <CSharpCardSection
            title="Challenging Concept"
          >
          At this point in time (March-April 2020), I had never written an app/script that used multiple threads.&nbsp; It took a few days to firmly grasp the concept, but once I had it, I was able to do everything I wanted to do, namely analyze html, download files, and update the GUI all at the same time.  I took this understanding and applied it to<EmbeddedLink isLocal={true} href="/examples/playlist-syncer">another problem</EmbeddedLink>I was facing at the time. 
          </CSharpCardSection>
        </React.Fragment>
      ]
    },
  ]

  return (
    <CSharpLayout
      sections={sections}
      pageName="PlaylistSyncer"
      sourceCodeLink="https://github.com/Beschuetzer/Playlist-syncer"
    >
      <section className="csharp__carousel">
        <Carousel
          images={[img1,img2,img3,img4,img5]}
          alts={
            [
              "The complete user interface",
              "Left-side of UI",
              "Playlists available section of UI",
              "Transfer section of UI after transfer",
              "Transfer section of UI during transfer",
            ]
          }
          numberOfImagesInCarouselAtOneTime="3"
          numberOfImagesToScrollOnClick="3"
        />
      </section>
    </CSharpLayout>
  );
}

export default PlaylistSyncer;