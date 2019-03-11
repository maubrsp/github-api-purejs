import { getUserRepositories } from '../core/services';

window.applicationCache.profileReposData = null;

export function createProfileReposPage(routerData) {
  return new Promise((resolve, reject) => {
    getUserRepositories(routerData.profile)
      .then(res => {
        //Eu, como usuário, desejo ver a listagem dos repositórios desse usuário que foi buscado, ordenados pelo número decrescente de estrelas;
        // Eu, como usuário, desejo poder alterar a ordem da listagem de repositórios;
        window.applicationCache.profileReposData = res;
        sortItens(window.applicationCache.profileReposData, 'stargazers_count');
        window.applicationCache.profileReposData.reverse();
        return createHtml(window.applicationCache.profileReposData);
      })
      .then(res => {
        window.app.main.innerHTML = res;
        return addListeners();
      })
      .then(res => {
        resolve();
      });
  });
}

export function destroyProfileReposPage() {
  return new Promise((resolve, reject) => {
    window.app.main.innerHTML = '';
    resolve();
  });
}

const createHtml = repos => {
  return new Promise((resolve, reject) => {
    let itens = '';
    repos.forEach(element => {
      if (element.content !== null) {
        itens += `<li><div>
        <label>${element.stargazers_count}</label>
        <p>${element.name}</p>
        <button class="profilerepos-button">see</button>
        </div></li>`;
      }
    });
    let result = `<div class="profilerepos-content">
    <button class="profilerepos-buttonascending">ascending/descending</button>
    <ul class="profile-itens">
    ${itens}
    </ul>
    </div>`;
    setTimeout(() => {
      resolve(result);
    }, 250);
  });
};

const addListeners = () => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const elements = getProfileReposDomElement();
      elements.buttonascending.addEventListener('click', event => {
        // TODO reordenar
      });

      for (let i = 0; i < elements.button.length; i++) {
        addButtonClick(
          elements.button[i],
          window.applicationCache.profileReposData[i]
        );
      }

      resolve();
    }, 250);
  });
};

const addButtonClick = (item, data) => {
  item.addEventListener('click', event => {
    window.location.hash = `#/repo/${data.full_name}`;
  });
};

const getProfileReposDomElement = () => {
  return {
    button: document.getElementsByClassName('profilerepos-button'),
    buttonascending: document.getElementsByClassName(
      'profilerepos-buttonascending'
    )[0]
  };
};

const sortItens = (array, key) => {
  return array.sort(function(a, b) {
    var x = a[key];
    var y = b[key];
    return x < y ? -1 : x > y ? 1 : 0;
  });
};
