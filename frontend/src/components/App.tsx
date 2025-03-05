import React, { useEffect } from "react";
import { Router, Route, Switch } from "react-router-dom";
import history from "./history";

import {
  ABOUT_URL,
  BRIDGE_DEMO_URL,
  BRIDGE_URL,
  DOWNLOADER_URL,
  GROCIFY_PAGE_NAME,
  GROCIFY_URL,
  LIVE_BRIDGE_URL,
  LIVE_REPLAYS_URL,
  MAIL_TO_STRING,
  PERSONALITY_URL,
  PLAYLIST_SYNCER_URL,
  REPLAY_VIEWER_URL,
  RESUME_URL,
  SSK_NAME,
  SSK_URL,
  THUMBNAIL_CAROUSEL_NAME,
  THUMBNAIL_CAROUSEL_URL,
} from "./constants";

import bridgeImage from "../imgs/site-nav/bridge.jpg";
import contactImage from "../imgs/site-nav/contact.jpg";
import downloaderImage from "../imgs/site-nav/downloader.jpg";
import syncerImage from "../imgs/site-nav/syncer.jpg";
import replayImage from "../imgs/site-nav/replay.jpg";

import resumeOverviewPic from "../imgs/site-nav/overview.jpg";
import skillsPic from "../imgs/site-nav/skills.jpg";
import sskPic from "../imgs/site-nav/ssk.jpg";
import grocifyPic from "../imgs/site-nav/grocify.png";
import experiencePic from "../imgs/site-nav/work-history.jpg";
import educationPic from "../imgs/site-nav/education.jpg";
import referencesPic from "../imgs/site-nav/references.jpg";

import aboutOverviewPic from "../imgs/site-nav/overview-2.jpg";
import interestsPic from "../imgs/site-nav/interests.jpg";
import musicPic from "../imgs/site-nav/music.jpg";
import personalityPic from "../imgs/site-nav/personality.jpg";
import carouselPic from "../imgs/site-nav/carousel.jpg";

import { SiteNav } from "./navbar/sitenav/SiteNav";
import "../css/style.css";
import { SCROLL_BAR_WIDTH_IN_REM } from "../styles/constants";
import { PlaylistSyncerPage } from "../pages/styled-pages/concrete-pages/PlaylistSyncerPage";
import { AudioPlayer } from "./AudioPlayer/AudioPlayer";
import {
  ABOUT_SECTION_NAMES,
  AboutPage,
} from "../pages/styled-pages/concrete-pages/AboutPage";
import { ReplayViewerPage } from "../pages/styled-pages/concrete-pages/ReplayViewerPage";
import { BigFivePage } from "../pages/styled-pages/concrete-pages/BigFivePage";
import {
  RESUME_PAGE_HEADER_NAME,
  RESUME_SECTION_TITLES,
  ResumePage,
} from "../pages/styled-pages/concrete-pages/ResumePage";
import { DownloaderPage } from "../pages/styled-pages/concrete-pages/DownloaderPage";
import { BridgePage } from "../pages/styled-pages/concrete-pages/BridgePage";
import { BridgeDemoPage } from "../pages/styled-pages/concrete-pages/BridgeDemoPage";
import { ThumbnailCarouselPage } from "../pages/styled-pages/concrete-pages/ThumbnailCarouselPage";
import { SSKPage } from "../pages/styled-pages/concrete-pages/SSKPage";
import { GrocifyPage } from "../pages/styled-pages/concrete-pages/GrocifyPage";
import { useAwakenSleepingContainers } from "../hooks/useAwakenSleepingContainers";

type AppProps = {};

export const App: React.FC<AppProps> = (props) => {
  useAwakenSleepingContainers();

  // //Loading Sounds, etc
  // useEffect(() => {
  // 	const sounds = new Howl({
  // 		src: [soundsSpriteMp3, soundsSpriteOgg],
  // 		volume: 0.1,
  // 		sprite: {
  // 			doorFast: [0, 1500],
  // 			doorNormal: [1500, 1000],
  // 			sonicBoom: [2500, 1000],
  // 			siteNavOpen: [3500, 1000],
  // 			siteNavClose: [4500, 1000],
  // 		},
  // 	});
  // 	dispatch(setSounds(sounds as unknown as LoadedSounds));
  // }, [setSounds]);

  return (
    <Router history={history}>
      <SiteNav
        scrollBarWidth={`${SCROLL_BAR_WIDTH_IN_REM}rem`}
        items={[
          {
            text: RESUME_PAGE_HEADER_NAME,
            isDropdownItem: true,
            drownDownItems: [
              {
                text: RESUME_SECTION_TITLES[0],
                to: `${RESUME_URL}#${RESUME_SECTION_TITLES[0]}`,
                image: resumeOverviewPic,
              },
              {
                text: RESUME_SECTION_TITLES[1],
                to: `${RESUME_URL}#${RESUME_SECTION_TITLES[1]}`,
                image: experiencePic,
              },
              {
                text: RESUME_SECTION_TITLES[2],
                to: `${RESUME_URL}#${RESUME_SECTION_TITLES[2]}`,
                image: educationPic,
              },
              {
                text: RESUME_SECTION_TITLES[3],
                to: `${RESUME_URL}#${RESUME_SECTION_TITLES[3]}`,
                image: referencesPic,
              },
            ],
          },
          {
            text: "About",
            isDropdownItem: true,
            drownDownItems: [
              {
                text: ABOUT_SECTION_NAMES[0],
                to: `${ABOUT_URL}#${ABOUT_SECTION_NAMES[0]}`,
                image: aboutOverviewPic,
              },
              {
                text: ABOUT_SECTION_NAMES[1],
                to: `${ABOUT_URL}#${ABOUT_SECTION_NAMES[1]}`,
                image: interestsPic,
              },
              {
                text: ABOUT_SECTION_NAMES[2],
                to: `${ABOUT_URL}#${ABOUT_SECTION_NAMES[2]}`,
                image: musicPic,
              },
              // {
              //   text: "Personality",
              //   to: `${PERSONALITY_URL}`,
              //   image: personalityPic,
              // },
            ],
          },
          {
            text: "Projects",
            isDropdownItem: true,
            drownDownItems: [
              {
                text: GROCIFY_PAGE_NAME,
                to: GROCIFY_URL,
                image: grocifyPic,
              },
              {
                text: THUMBNAIL_CAROUSEL_NAME,
                to: THUMBNAIL_CAROUSEL_URL,
                image: carouselPic,
              },
              { text: "A# Maj Bridge", to: BRIDGE_URL, image: bridgeImage },
              {
                text: "Replay Viewer",
                to: REPLAY_VIEWER_URL,
                image: replayImage,
              },
              {
                text: "Downloader",
                to: DOWNLOADER_URL,
                image: downloaderImage,
              },
              {
                text: "Syncer",
                to: PLAYLIST_SYNCER_URL,
                image: syncerImage,
              },
            ],
          },
          {
            text: "Contact",
            href: `mailto:${MAIL_TO_STRING}`,
            isDropdownItem: false,
            image: contactImage,
          },
        ]}
      />
      <Switch>
        <Route path={BRIDGE_URL} exact component={BridgePage} />
        <Route path={BRIDGE_DEMO_URL} exact component={BridgeDemoPage} />
        <Route path={DOWNLOADER_URL} exact component={DownloaderPage} />
        <Route
          path={PLAYLIST_SYNCER_URL}
          exact
          component={PlaylistSyncerPage}
        />
        <Route path={REPLAY_VIEWER_URL} exact component={ReplayViewerPage} />
        {/* <Route path={SSK_URL} exact component={SSKPage} /> */}
        <Route path={GROCIFY_URL} exact component={GrocifyPage} />
        <Route path={ABOUT_URL} exact component={AboutPage} />
        <Route path={RESUME_URL} exact component={ResumePage} />
        <Route path={PERSONALITY_URL} exact component={BigFivePage} />
        <Route
          path={THUMBNAIL_CAROUSEL_URL}
          exact
          component={ThumbnailCarouselPage}
        />
        <Route path="*" exact component={ResumePage} />
      </Switch>

      <AudioPlayer />
      {/* <Footer/> */}
    </Router>
  );
};
