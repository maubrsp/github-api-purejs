/**
 * GET user profile by github id
 * @async
 * @param {string} username
 * @return {Promise<object>} The data from the URL.
 */
export function getUserProfile(username) {
  return new Promise((resolve, reject) => {
    httpGet(`https://api.github.com/users/${username}`)
      .then(result => {
        resolve(result);
      })
      .catch(error => {
        reject(error);
      });
  });
}

/**
 * GET user repos list by github id
 * @async
 * @param {string} username
 * @return {Promise<object>} The data from the URL.
 */
export function getUserRepositories(username) {
  return new Promise((resolve, reject) => {
    let resultBreeds = null;
    httpGet(`https://api.github.com/users/${username}/repos`)
      .then(result => {
        resolve(result);
      })
      .catch(error => {
        reject(error);
      });
  });
}

/**
 * GET repos details
 * @async
 * @param {string} reponame
 * @return {Promise<object>} The data from the URL.
 */
export function getRepoDetail(reponame) {
  return new Promise((resolve, reject) => {
    httpGet(`https://api.github.com/repos/${reponame}`)
      .then(result => {
        resolve(result);
      })
      .catch(error => {
        reject(error);
      });
  });
}

/**
 * Base function for GET fetch
 * @async
 * @param {string} url
 * @return {Promise<object>} The data from the URL.
 */
const httpGet = url => {
  return new Promise((resolve, reject) => {
    fetch(url)
      .then(response => {
        return response.json();
      })
      .then(data => {
        resolve(data);
      })
      .catch(error => {
        reject(error);
      });
  });
};
