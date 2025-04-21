import { MaxCharCount, MaxCharCounts } from "../types";

//#region note: Add page names here
export const ABOUT_PAGE_NAME = "about";
export const ACCOMPLISHMENT_STORIES_NAME = "accomplishment-stories";
export const AUTO_BID_PAGE_NAME = "autobid";
export const BIG_FIVE_PAGE_NAME = "the-big-five";
export const BRIDGE_DEMO_PAGE_NAME = "bridge-demo";
export const BRIDGE_PAGE_NAME = "bridge";
export const DOWNLOADER_PAGE_NAME = "downloader";
export const GROCIFY_PAGE_NAME = "grocify";
export const PLAYLIST_SYNCER_PAGE_NAME = "playlist-syncer";
export const REPLAY_PAGE_NAME = "replay";
export const RESUME_PAGE_NAME = "resume";
export const SSK_NAME = "solution-sidekick";
export const THUMBNAIL_CAROUSEL_NAME = "thumbnail-carousel";

//note: and here
export const PAGE_NAMES = [
  ``,
  `/${ABOUT_PAGE_NAME}`,
  `/${AUTO_BID_PAGE_NAME}`,
  `/${BRIDGE_PAGE_NAME}`,
  `/${BRIDGE_DEMO_PAGE_NAME}`,
  `/${DOWNLOADER_PAGE_NAME}`,
  `/${PLAYLIST_SYNCER_PAGE_NAME}`,
  `/${REPLAY_PAGE_NAME}`,
  `/${RESUME_PAGE_NAME}`,
  `/${BIG_FIVE_PAGE_NAME}`,
];
//#endregion

//#region Internal URLs
export const ABOUT_URL = `/${ABOUT_PAGE_NAME}`;
export const ACCOMPLISHMENT_STORIES_URL = `/${ACCOMPLISHMENT_STORIES_NAME}`;
export const AUTO_BID_URL = `/examples/${AUTO_BID_PAGE_NAME}`;
export const BRIDGE_DEMO_URL = `/${BRIDGE_DEMO_PAGE_NAME}`;
export const BRIDGE_URL = `/examples/${BRIDGE_PAGE_NAME}`;
export const BRIDGE_LIVE_URL = `/${BRIDGE_PAGE_NAME}`;
export const DOWNLOADER_URL = `/examples/${DOWNLOADER_PAGE_NAME}`;
export const GROCIFY_URL = `/examples/${GROCIFY_PAGE_NAME}`;
export const PERSONALITY_URL = `/${BIG_FIVE_PAGE_NAME}`;
export const PLAYLIST_SYNCER_URL = `/examples/${PLAYLIST_SYNCER_PAGE_NAME}`;
export const REPLAY_VIEWER_URL = `/examples/${REPLAY_PAGE_NAME}`;
export const REPLAY_LIVE_URL = `/${REPLAY_PAGE_NAME}`;
export const RESUME_URL = `/${RESUME_PAGE_NAME}`;
export const SSK_URL = `/examples/${SSK_NAME}`;
export const THUMBNAIL_CAROUSEL_URL = `/examples/${THUMBNAIL_CAROUSEL_NAME}`;
//#endregion

//#region External URLs
export const BEST_BUY_URL = "http://www.bestbuy.com";
export const BEST_BUY_SSK_INFO_ONE_URL =
  "https://www.customerexperiencedive.com/news/best-buy-associates-training-sidekick-q3-nps/700909/";
export const BOOK_TRUST_URL = "https://www.booktrust.org";
export const GERMANY_APP_URL = "/germany-application-letter.pdf";
export const GITHUB_URL = "http://github.com/beschuetzer";
export const GOOGLE_IT_SPECIALIST_URL =
  "https://www.coursera.org/account/accomplishments/specialization/SFUHXP7E2PYQ";
export const HARMONY_URL = "https://www.isd622.org/harmony";
export const HERMAN_LIETZ_SCHULE_URL =
  "https://www.lietz-schulen.de/hermann-lietz-schule/unsere-internatsschulen/internatsdorf-haubinda";
export const HUBB_CENTER_URL = "https://www.spps.org/hubbs";
export const ISD_622_URL = "https://communityeducation.isd622.org/adult/harmony";
export const KH_INSIDER_URL = "https://downloads.khinsider.com";
export const KUALAPUU_URL = "https://www.kualapuucharterschool.org/";
export const LIVE_BRIDGE_URL =
  "https://adammajorbridge-9715f4d2160d.herokuapp.com/";
export const LIVE_REPLAYS_URL = "https://amajreplays.herokuapp.com";
export const LINKED_IN_URL = "https://www.linkedin.com/in/adam-jeffrey-major/";
export const OC_REMIX_URL = "https://www.ocremix.org";
export const ODIN_PROJECT_URL = "https://www.theodinproject.com/";
export const OS_10_ISSUE_TRACKER_URL =
  "https://issuetracker.google.com/issues/150054563";
export const POWERSHELL_URL = `${GITHUB_URL}/powerShell`;
export const RICOH_URL = "https://www.ricoh-usa.com/en";
export const TOYS_R_US_RUL = "https://www.toysrus.com/";
export const THUMBNAIL_CAROUSEL_PACKAGE_URL =
  "https://www.npmjs.com/package/react-thumbnail-carousel";
export const UDEMY_BOOTCAMP_URL =
  "https://www.udemy.com/course/the-web-developer-bootcamp/";
export const WIKIPEDIA_BRIDGE_URL =
  "https://en.wikipedia.org/wiki/Contract_bridge";
export const WIKIPEDIA_DRM_URL =
  "https://en.wikipedia.org/wiki/Windows_Media_DRM";
export const WIKIPEDIA_MTP_URL =
  "https://en.wikipedia.org/wiki/Media_Transfer_Protocol";
export const YORK_B2E_URL = "https://yorksolutions.net/talent/emerging-talent/";
//#endregion

//#region CSS classnames

export const HIDDEN_CLASSNAME = "hidden";
export const HOME_CANVAS_CLASSNAME = "home__canvas";
export const TRANSFORM_NONE_CLASSNAME = "transform-none";
//#endregion

//#region CSS Property Names
export const AUDIO_PLAYER_TOGGLER_ROTATION_CLOSED_CUSTOM_PROPERTY_NAME =
  "--audio-player-toggler-rotation-closed";
export const AUDIO_PLAYER_TOGGLER_ROTATION_OPEN_CUSTOM_PROPERTY_NAME =
  "--audio-player-toggler-rotation-open";
//#endregion

//#region Email Contact
export const EMAIL = "adam.j.major@gmail.com";
const SUBJECT = "I want to connect";
const BODY = "";
export const MAIL_TO_STRING =
  "mailto:" + EMAIL + "&subject=" + SUBJECT + "&body=" + BODY;
//#endregion

//#region Misc
export const MAX_CHAR_COUNTS: MaxCharCounts = {
  [MaxCharCount.song]: () => {
    const windowWidth = window.innerWidth;
    switch (true) {
      case windowWidth < 410:
        return 27;
      case windowWidth < 600:
        return 80;
      default:
        return 1000;
    }
  },
};
//#endregion
