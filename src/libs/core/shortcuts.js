import anime from 'animejs';

import { showloader, hideloader } from './dom';
import { destroyProfilePage, createProfilePage } from '../pages/profile';
import {
  destroyProfileReposPage,
  createProfileReposPage
} from '../pages/profileRepos';
import { destroySearchPage, createSearchPage } from '../pages/search';
import { destroyRepoPage, createRepoPage } from '../pages/repo';

window.app.lastRoute = null;
window.app.currentPage = null;
window.app.changePage = false;

export class CONSTANTS {
  static get SEARCH() {
    return 'search';
  }

  static get PROFILE() {
    return 'profile';
  }

  static get PROFILE_REPOS() {
    return 'profilerepos';
  }

  static get PROFILE_REPO() {
    return 'profilerepo';
  }
}

export function activateRoutes() {
  window.addEventListener('hashchange', locationHashChanged);
  locationHashChanged(null);
}

const routeManager = routerData => {
  console.log(' >> ', routerData);
  if (window.app.currentPage) {
    showloader()
      .then(res => {
        if (window.app.currentPage.page === CONSTANTS.SEARCH) {
          return destroySearchPage();
        } else if (window.app.currentPage.page === CONSTANTS.PROFILE) {
          return destroyProfilePage();
        } else if (window.app.currentPage.page === CONSTANTS.PROFILE_REPO) {
          return destroyRepoPage();
        } else if (window.app.currentPage.page === CONSTANTS.PROFILE_REPOS) {
          return destroyProfileReposPage();
        }
      })
      .then(res => {
        window.app.currentPage = null;
        routeManager(routerData);
      });
  } else {
    let pageCreationPromise = null;
    if (routerData.page === CONSTANTS.SEARCH) {
      pageCreationPromise = createSearchPage;
    } else if (routerData.page === CONSTANTS.PROFILE) {
      pageCreationPromise = createProfilePage;
    } else if (routerData.page === CONSTANTS.PROFILE_REPO) {
      pageCreationPromise = createRepoPage;
    } else if (routerData.page === CONSTANTS.PROFILE_REPOS) {
      pageCreationPromise = createProfileReposPage;
    }
    pageCreationPromise(routerData)
      .then(res => {
        return hideloader();
      })
      .then(res => {
        window.app.currentPage = routerData;
        window.app.changePage = false;
      });
  }
};

const locationHashChanged = event => {
  if (
    window.app.lastRoute === location.hash ||
    window.app.changePage === true
  ) {
    return;
  }

  window.app.lastRoute = location.hash;
  window.app.changePage = true;

  const nextRouterData = {};
  let profile = location.hash.split('rofile/')[1];
  if (
    location.hash.indexOf('#/profile/') !== -1 &&
    location.hash.indexOf('/repos') !== -1
  ) {
    profile = profile.split('/repos')[0];
    nextRouterData.page = CONSTANTS.PROFILE_REPOS;
    nextRouterData.profile = profile;
  } else if (location.hash.indexOf('#/profile/') != -1) {
    profile = profile.split('/')[0];
    nextRouterData.page = CONSTANTS.PROFILE;
    nextRouterData.profile = profile;
  } else if (location.hash.indexOf('#/repo') !== -1) {
    let repo = location.hash.replace('#/repo/', '');
    repo = repo.replace('#/repo', '');
    nextRouterData.page = CONSTANTS.PROFILE_REPO;
    nextRouterData.repo = repo;
  } else {
    nextRouterData.page = CONSTANTS.SEARCH;
    if (location.hash !== '#/search') {
      location.hash = '#/search';
      window.app.lastRoute = '#/search';
    } else {
    }
  }
  routeManager(nextRouterData);
};

window.onhashchange = locationHashChanged;

export function polyfill() {
  if (typeof Object.assign !== 'function') {
    Object.defineProperty(Object, 'assign', {
      value: function assign(target) {
        if (target == null) {
          throw new TypeError('Cannot convert undefined or null to object');
        }
        const to = Object(target);
        for (let index = 1; index < arguments.length; index++) {
          const nextSource = arguments[index];
          if (nextSource != null) {
            for (const nextKey in nextSource) {
              if (Object.prototype.hasOwnProperty.call(nextSource, nextKey)) {
                to[nextKey] = nextSource[nextKey];
              }
            }
          }
        }
        return to;
      },
      writable: true,
      configurable: true
    });
  }
}
