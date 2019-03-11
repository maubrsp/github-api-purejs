import { getRepoDetail } from '../core/services';

export function createRepoPage(routerData) {
  return new Promise((resolve, reject) => {
    // const loader = window.app.getElement('loader');
    // /'maubrsp/behaviorProjectPatern'
    let repoUrl = '';
    getRepoDetail(routerData.repo)
      .then(res => {
        console.log('init page Repo', res);

        const repoItens = [];
        //(nome, descrição, ,número de estrelas, linguagem e um link externo para a página do repositório no GitHub)
        repoItens.push(getRepoIten('nome', res.name));
        repoItens.push(getRepoIten('descrição', res.description));
        repoItens.push(getRepoIten('estrelas', res.stargazers_count));
        repoItens.push(getRepoIten('linguagem', res.language));
        repoItens.push(getRepoIten('link', res.html_url));
        repoUrl = res.html_url;
        return createHtml(repoItens);
      })
      .then(res => {
        window.app.main.innerHTML = res;
        return addListeners(repoUrl);
      })
      .then(res => {
        resolve();
      });
  });
}

export function destroyRepoPage() {
  return new Promise((resolve, reject) => {
    window.app.main.innerHTML = '';
    resolve();
  });
}

const getRepoIten = (label, content) => {
  return {
    label: label,
    content: content
  };
};

const createHtml = infos => {
  return new Promise((resolve, reject) => {
    let itens = '';
    infos.forEach(element => {
      if (element.label === 'link') {
        itens += `<li><div>
        <label>${element.label}</label>
        <button class="repo-button">see</button>
        </div></li>`;
      } else {
        itens += `<li><div>
        <label>${element.label}</label>
        <p>${element.content}</p>
        </div></li>`;
      }
    });
    let result = `<div class="Repo-content">
    <ul class="Repo-itens">
    ${itens}
    </ul>
    </div>`;
    setTimeout(() => {
      resolve(result);
    }, 250);
  });
};

const addListeners = repoUrl => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const elements = getRepoDomElement();
      console.log('repo url', repoUrl);

      elements.button.addEventListener('click', event => {
        console.log('repo url', repoUrl);
        window.open(repoUrl, '_blank');
      });
      resolve();
    }, 250);
  });
};

const getRepoDomElement = () => {
  return {
    button: document.getElementsByClassName('repo-button')[0]
  };
};
