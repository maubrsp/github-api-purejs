import { getUserProfile } from '../core/services';

export function createProfilePage(routerData) {
  return new Promise((resolve, reject) => {
    // const loader = window.app.getElement('loader');
    getUserProfile(routerData.profile)
      .then(res => {
        console.log('init page Profile', res);
        const profileItens = [];
        //número de seguidores, número de seguidos, imagem do avatar, e-mail e bio
        profileItens.push(getProfileIten('bio', res.bio));
        profileItens.push(getProfileIten('email', res.email));
        profileItens.push(getProfileIten('followers', res.followers));
        profileItens.push(getProfileIten('following', res.following));
        return createHtml(res.avatar_url, profileItens);
      })
      .then(res => {
        window.app.main.innerHTML = res;
        return addListeners(routerData.profile);
      })
      .then(res => {
        resolve();
      });
  });
}

export function destroyProfilePage() {
  return new Promise((resolve, reject) => {
    window.app.main.innerHTML = '';
    resolve();
  });
}

const getProfileIten = (label, content) => {
  return {
    label: label,
    content: content
  };
};

const createHtml = (image, infos) => {
  return new Promise((resolve, reject) => {
    let itens = '';
    infos.forEach(element => {
      if (element.content !== null) {
        itens += `<li><div>
        <label>${element.label}</label>
        <p>${element.content}</p>
        </div></li>`;
      }
    });
    let result = `<div class="profile-content">
    <img src="${image}"/>
    <button class="profile-button">repositórios</button>
    <ul class="profile-itens">
    ${itens}
    </ul>
    </div>`;
    setTimeout(() => {
      resolve(result);
    }, 250);
  });
};

const addListeners = profile => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const elements = getProfileDomElement();
      elements.button.addEventListener('click', event => {
        window.location.hash = `#/profile/${profile}/repos`;
      });
      resolve();
    }, 250);
  });
};

const getProfileDomElement = () => {
  return {
    button: document.getElementsByClassName('profile-button')[0]
  };
};
