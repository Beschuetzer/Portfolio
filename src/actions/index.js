import github from '../apis/github';
import {
  GET_REPOSITORIES,
  CLICK_SKILL,
} from './types';
//Example Action Creator
//export const selectSong = (song) => {
//    return {
//        type: "SONG_SELECTED",
//        payload: song,
//    }
//}
    
export const getRepositories = () => async (dispatch, getStore) => {
  const schema = `
    query {
      __schema {
        types {
          name
          kind
          description
          fields {
            name
          }
        }
      }
    }
  `;

  const individualObjIntrospection = `
    query {
      __type(name: "Repository") {
        name
        kind
        description
        fields {
          name
        }
      }
    }
  `;

  const query = 
  `query {
    viewer {
      repositories(first:50) {
        nodes {
          createdAt
          description
          name
          updatedAt
          repositoryTopics(first:50) {
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

  }`

  const response = await github(query);
  console.log('response =', response);

  dispatch({
    type: GET_REPOSITORIES,
    payload: response.viewer.repositories.nodes,
  });
}


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

export const clickSkill = (target) => {
  const skillsToReplace = {
    'c#': 'csharp',
    'socket.io': 'socketio'
  };
  let skill = null;

  if (target) {
    skill = target.textContent.replace(':', '').toLowerCase();
    if (skillsToReplace[skill]) skill = skillsToReplace[skill];
  }
  return {
    type: CLICK_SKILL,
    payload: skill,
  }
}