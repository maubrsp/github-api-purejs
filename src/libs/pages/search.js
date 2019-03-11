export function createSearchPage(routerData) {
  return new Promise((resolve, reject) => {
    window.app.main.innerHTML = `<div class="search-content">
    <input class="search-input" type="text" />
    <button class="search-button">search github profiles</button>
    </div>`;
    setTimeout(() => {
      const elements = getSearchDomElement();
      elements.button.addEventListener('click', event => {
        window.location.hash = `#/profile/${elements.input.value}`;
      });
      resolve();
    }, 250);
  });
}

export function destroySearchPage() {
  return new Promise((resolve, reject) => {
    // TODO verify performance and remove listeners
    window.app.main.innerHTML = '';
    setTimeout(() => {
      resolve();
    }, 250);
  });
}

const getSearchDomElement = () => {
  return {
    button: document.getElementsByClassName('search-button')[0],
    input: document.getElementsByClassName('search-input')[0]
  };
};
