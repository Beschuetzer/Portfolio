import { Dispatch } from 'react';
import github from '../apis/github';
import { AudioItem } from '../components/AudioPlayer/AudioList';
import {
  GET_REPOSITORIES,
  CLICK_SKILL,
  ADD_REPO,
  SET_IS_ANIMATING,
  SET_IS_MOBILE,
  SET_SECTIONS_TO_SKIP_ANIMATION,
  SET_PREVIOUS_URL,
  SET_SCROLL_PERCENT,
  SET_VIEW_PORT_WIDTH,
  SET_SOUNDS,
  SET_CLICKED_BRIDGE_INFO_BUTTON_COUNT,
  SET_CURRENT_BRIDGE_SECTION,
  SET_BRIDGE_SECTIONS,
  SET_HEADER_HEIGHT,
  SET_LAST_SECOND_ROW_CARD_NUMBER,
  SET_BRIDGE_CARDS,
  SET_HAS_CLICKED_A_LINK,
  SET_IS_CARD_VIDEO_OPEN,
  SET_CURRENTLY_PLAYING_SOUND,
  SET_IS_LOADING_SOUND,
} from './types';
    
//Github Graph QL Repository 
// 0: {name: "assignableUsers"}
// 1: {name: "branchProtectionRules"}
// 2: {name: "codeOfConduct"}
// 3: {name: "collaborators"}
// 4: {name: "commitComments"}
// 5: {name: "contactLinks"}
// 6: {name: "createdAt"}
// 7: {name: "databaseId"}
// 8: {name: "defaultBranchRef"}
// 9: {name: "deleteBranchOnMerge"}
// 10: {name: "deployKeys"}
// 11: {name: "deployments"}
// 12: {name: "description"}
// 13: {name: "descriptionHTML"}
// 14: {name: "diskUsage"}
// 15: {name: "forkCount"}
// 16: {name: "forks"}
// 17: {name: "fundingLinks"}
// 18: {name: "hasIssuesEnabled"}
// 19: {name: "hasProjectsEnabled"}
// 20: {name: "hasWikiEnabled"}
// 21: {name: "homepageUrl"}
// 22: {name: "id"}
// 23: {name: "interactionAbility"}
// 24: {name: "isArchived"}
// 25: {name: "isBlankIssuesEnabled"}
// 26: {name: "isDisabled"}
// 27: {name: "isEmpty"}
// 28: {name: "isFork"}
// 29: {name: "isInOrganization"}
// 30: {name: "isLocked"}
// 31: {name: "isMirror"}
// 32: {name: "isPrivate"}
// 33: {name: "isSecurityPolicyEnabled"}
// 34: {name: "isTemplate"}
// 35: {name: "isUserConfigurationRepository"}
// 36: {name: "issue"}
// 37: {name: "issueOrPullRequest"}
// 38: {name: "issueTemplates"}
// 39: {name: "issues"}
// 40: {name: "label"}
// 41: {name: "labels"}
// 42: {name: "languages"}
// 43: {name: "latestRelease"}
// 44: {name: "licenseInfo"}
// 45: {name: "lockReason"}
// 46: {name: "mentionableUsers"}
// 47: {name: "mergeCommitAllowed"}
// 48: {name: "milestone"}
// 49: {name: "milestones"}
// 50: {name: "mirrorUrl"}
// 51: {name: "name"}
// 52: {name: "nameWithOwner"}
// 53: {name: "object"}
// 54: {name: "openGraphImageUrl"}
// 55: {name: "owner"}
// 56: {name: "packages"}
// 57: {name: "parent"}
// 58: {name: "pinnedIssues"}
// 59: {name: "primaryLanguage"}
// 60: {name: "project"}
// 61: {name: "projects"}
// 62: {name: "projectsResourcePath"}
// 63: {name: "projectsUrl"}
// 64: {name: "pullRequest"}
// 65: {name: "pullRequests"}
// 66: {name: "pushedAt"}
// 67: {name: "rebaseMergeAllowed"}
// 68: {name: "ref"}
// 69: {name: "refs"}
// 70: {name: "release"}
// 71: {name: "releases"}
// 72: {name: "repositoryTopics"}
// 73: {name: "resourcePath"}
// 74: {name: "securityPolicyUrl"}
// 75: {name: "shortDescriptionHTML"}
// 76: {name: "squashMergeAllowed"}
// 77: {name: "sshUrl"}
// 78: {name: "stargazerCount"}
// 79: {name: "stargazers"}
// 80: {name: "submodules"}
// 81: {name: "tempCloneToken"}
// 82: {name: "templateRepository"}
// 83: {name: "updatedAt"}
// 84: {name: "url"}
// 85: {name: "usesCustomOpenGraphImage"}
// 86: {name: "viewerCanAdminister"}
// 87: {name: "viewerCanCreateProjects"}
// 88: {name: "viewerCanSubscribe"}
// 89: {name: "viewerCanUpdateTopics"}
// 90: {name: "viewerDefaultCommitEmail"}
// 91: {name: "viewerDefaultMergeMethod"}
// 92: {name: "viewerHasStarred"}
// 93: {name: "viewerPermission"}
// 94: {name: "viewerPossibleCommitEmails"}
// 95: {name: "viewerSubscription"}
// 96: {name: "vulnerabilityAlerts"}
// 97: {name: "watchers"}
export const addRepoToReposToDisplay = (repo: any) => {
  return {
    type: ADD_REPO,
    payload: repo,
  }
}
export const clickSkill = (target: HTMLElement) => {
  interface SkillsToReplaceMap {
    [key: string]: string,
  }

  const skillsToReplace: SkillsToReplaceMap = {
    'c#': 'csharp',
    'socket.io': 'socketio',
    'dsa': 'data-structures-and-algorithms',
  };
  let skill = null;
  if (target) {
    skill = (target as any).textContent.replace(':', '').toLowerCase();
    if (skillsToReplace[skill]) skill = skillsToReplace[skill];
  }
  return {
    type: CLICK_SKILL,
    payload: skill,
  }
}
export const getRepositories = () => async (dispatch: Dispatch<any>) => {
  // const schema = `
  //   query {
  //     __schema {
  //       types {
  //         name
  //         kind
  //         description
  //         fields {
  //           name
  //         }
  //       }
  //     }
  //   }
  // `;

  // const individualObjIntrospection = `
  //   query {
  //     __type(name: "Repository") {
  //       name
  //       kind
  //       description
  //       fields {
  //         name
  //       }
  //     }
  //   }
  // `;

  const query = 
  `query {
    viewer {
      repositories(first:100) {
        nodes {
          createdAt
          description
          name
          updatedAt
          repositoryTopics(first:100) {
            nodes {
              topic {
                name
              }
            }
          }
          homepageUrl
          url
        }
      }
    }
  }`;

  const response = await github(query);
  dispatch({
    type: GET_REPOSITORIES,
    payload: response?.data.viewer.repositories.nodes,
  });
}
export const setBridgeCards = (value: []) => {
  return {
    type: SET_BRIDGE_CARDS,
    payload: value,
  }
}
export const setBridgeSections = (value: []) => {
  return {
    type: SET_BRIDGE_SECTIONS,
    payload: value,
  }
}
export const setClickedBridgeInfoButtonCount = (value: number) => {
  return {
    type: SET_CLICKED_BRIDGE_INFO_BUTTON_COUNT,
    payload: value,
  }
} 
export const setCurrentBridgeSection = (value: number) => {
  return {
    type: SET_CURRENT_BRIDGE_SECTION,
    payload: value,
  }
}
export const setCurrentlyPlayingSound = (sound: AudioItem) => {
  return {
    type: SET_CURRENTLY_PLAYING_SOUND,
    payload: sound,
  }
}
export const setHasClickedALink = (value: boolean) => {
  return {
    type: SET_HAS_CLICKED_A_LINK,
    payload: value,
  }
}
export const setHeaderHeight = (value: number) => {
  return {
    type: SET_HEADER_HEIGHT,
    payload: value,
  }
}
export const setIsAnimating = (value: boolean) => {
  return {
    type: SET_IS_ANIMATING,
    payload: value,
  }
}
export const setIsCardVideoOpen = (value: boolean) => {
  return {
    type: SET_IS_CARD_VIDEO_OPEN,
    payload: value,
  }
}
export const setIsLoadingSound = (value: boolean) => {
  return {
    type: SET_IS_LOADING_SOUND,
    payload: value,
  }
}
export const setIsMobile = (isMobile: boolean, viewPortWidth: number) => {
  return {
    type: SET_IS_MOBILE,
    payload: {isMobile, viewPortWidth},
  }
}
export const setLastSecondRowCardNumber = (value: number) => {
  return {
    type: SET_LAST_SECOND_ROW_CARD_NUMBER,
    payload: value,
  }
}
export const setPreviousUrl = (url: string) =>{
  return {
    type: SET_PREVIOUS_URL,
    payload: url,
  }
}
export const setScrollPercent = (percent: string) => {
  return {
    type: SET_SCROLL_PERCENT,
    payload: percent,
  }
}
export const setSectionsToSkipAnimation = (value: []) => {
  return {
    type: SET_SECTIONS_TO_SKIP_ANIMATION,
    payload: value,
  }
}
export const setSounds = (sounds: []) => {
  return {
    type: SET_SOUNDS,
    payload: sounds,
  }
}
export const setViewPortWidth = (value: boolean) => {
  return {
    type: SET_VIEW_PORT_WIDTH,
    payload: value,
  }
}

