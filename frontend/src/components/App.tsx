import React from "react";
import { Router, Route, Switch } from "react-router-dom";
import history from "./history";

import {
  ABOUT_URL,
  AUTO_BID_URL,
  BRIDGE_DEMO_URL,
  BRIDGE_LIVE_URL,
  BRIDGE_URL,
  DOWNLOADER_URL,
  EMAIL,
  LIVE_BRIDGE_URL,
  LIVE_REPLAYS_URL,
  PERSONALITY_URL,
  PLAYLIST_SYNCER_URL,
  REPLAY_LIVE_URL,
  REPLAY_VIEWER_URL,
  RESUME_URL,
  THUMBNAIL_CAROUSEL_URL,
} from "./constants";

import bridgeImage from "../imgs/site-nav/bridge.jpg";
import contactImage from "../imgs/site-nav/contact.jpg";
import downloaderImage from "../imgs/site-nav/downloader.jpg";
import syncerImage from "../imgs/site-nav/syncer.jpg";
import replayImage from "../imgs/site-nav/replay.jpg";

import resume1 from "../imgs/site-nav/overview.jpg";
import resume2 from "../imgs/site-nav/skills.jpg";
import resume3 from "../imgs/site-nav/work-history.jpg";
import resume4 from "../imgs/site-nav/education.jpg";
import resume5 from "../imgs/site-nav/references.jpg";

import about1 from "../imgs/site-nav/overview-2.jpg";
import about2 from "../imgs/site-nav/interests.jpg";
import about3 from "../imgs/site-nav/music.jpg";
import about4 from "../imgs/site-nav/personality.jpg";

import { SiteNav } from "./navbar/sitenav/SiteNav";
import "../css/style.css";
import {
  BigFive,
  AutoBid,
  Bridge,
  About,
  BridgeDemo,
  Downloader,
  ReplayViewer,
  Home,
  Resume,
} from "../pages";
import { ThumbnailCarouselTests } from "../pages/examples/csharp/ThumbnailCarouselTests";
import { Redirect } from "../pages/Redirect";
import { SCROLL_BAR_WIDTH_IN_REM } from "../styles/constants";
import { PlaylistSyncer } from "../pages/styled-pages/concrete-pages/PlaylistSyncer";

type AppProps = {};

export const App: React.FC<AppProps> = (props) => {
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
              text: "Résumé",
              isDropdownItem: true,
              drownDownItems: [
                {
                  text: "Overview",
                  to: `${RESUME_URL}#overview`,
                  image: resume1,
                },
                {
                  text: "Skills",
                  to: `${RESUME_URL}#skills`,
                  image: resume2,
                },
                {
                  text: "Work History",
                  to: `${RESUME_URL}#work-history`,
                  image: resume3,
                },
                {
                  text: "Education",
                  to: `${RESUME_URL}#education`,
                  image: resume4,
                },
                {
                  text: "References",
                  to: `${RESUME_URL}#references`,
                  image: resume5,
                },
              ],
            },
            {
              text: "About",
              isDropdownItem: true,
              drownDownItems: [
                {
                  text: "Overview",
                  to: `${ABOUT_URL}#overview`,
                  image: about1,
                },
                {
                  text: "Interests",
                  to: `${ABOUT_URL}#interests`,
                  image: about2,
                },
                { text: "Music", to: `${ABOUT_URL}#music`, image: about3 },
                {
                  text: "Personality",
                  to: `${PERSONALITY_URL}`,
                  image: about4,
                },
              ],
            },
            {
              text: "Projects",
              isDropdownItem: true,
              drownDownItems: [
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
              href: `mailto:${EMAIL}`,
              isDropdownItem: false,
              image: contactImage,
            },
          ]}
        />
        <Switch>
          <Route path="/" exact component={Home} />
          <Route
            path={THUMBNAIL_CAROUSEL_URL}
            exact
            component={ThumbnailCarouselTests}
          />
          <Route
            path={BRIDGE_LIVE_URL}
            component={() => {
              return (
                <Redirect
                  texts={[`Waking the heroku container at`, LIVE_BRIDGE_URL]}
                  url={LIVE_BRIDGE_URL}
                />
              );
            }}
          />
          <Route
            path={REPLAY_LIVE_URL}
            component={() => {
              return (
                <Redirect
                  texts={[`Waking the heroku container at`, LIVE_REPLAYS_URL]}
                  url={LIVE_REPLAYS_URL}
                />
              );
            }}
          />
          <Route path={BRIDGE_URL} exact component={Bridge} />
          <Route path={BRIDGE_DEMO_URL} exact component={BridgeDemo} />
          <Route path={DOWNLOADER_URL} exact component={Downloader} />
          <Route
            path={PLAYLIST_SYNCER_URL}
            exact
            component={PlaylistSyncer}
          />
          <Route path={REPLAY_VIEWER_URL} exact component={ReplayViewer} />
          <Route path={AUTO_BID_URL} exact component={AutoBid} />
          <Route path={ABOUT_URL} exact component={About} />
          <Route path={RESUME_URL} exact component={Resume} />
          <Route path={PERSONALITY_URL} exact component={BigFive} />
          <Route path="*" exact component={Home} />
        </Switch>

        {/* <AudioPlayer /> */}
        {/* <Footer/> */}
      </Router>
  );
};
